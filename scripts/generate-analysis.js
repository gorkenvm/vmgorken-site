#!/usr/bin/env node
// ============================================================================
// generate-analysis.js — Şarkı sözleri için analysis.json otomatik üretici
//
// Kullanım:
//   node scripts/generate-analysis.js --slug 99-luftballons
//   node scripts/generate-analysis.js --all
//
// Gereksinimler:
//   - Node.js 18+
//   - .env dosyasında ANTHROPIC_API_KEY tanımlı
//   - /public/music/{slug}/lyrics.txt mevcut olmalı
//
// lyrics.txt formatı (LRC — bir satır = [MM:SS.xx] metin):
//   [00:11.50] Hast du etwas Zeit für mich
//   [00:14.80] Dann singe ich ein Lied für dich
// ============================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// .env dosyasını elle oku (dotenv bağımlılığı olmadan)
function loadEnv() {
  const envPath = path.join(ROOT, '.env');
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach(line => {
      const [key, ...vals] = line.split('=');
      if (key && !key.startsWith('#') && vals.length) {
        process.env[key.trim()] = vals.join('=').trim();
      }
    });
}

function parseLRC(content) {
  const lines = [];
  const re = /\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.+)/;
  content.split('\n').forEach(raw => {
    const m = raw.match(re);
    if (!m) return;
    const time = parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3]) / 1000;
    lines.push({ time: Math.round(time * 100) / 100, text: m[4].trim() });
  });
  return lines;
}

function buildPrompt(slug, lyricsLines) {
  const lyricsText = lyricsLines
    .map(l => `[${l.time.toFixed(2)}] ${l.text}`)
    .join('\n');

  return `Sen Almanca dil eğitimi konusunda uzman bir asistansın. Senden aşağıdaki şarkı sözlerini analiz etmeni istiyorum.

ŞARKI: ${slug.replace(/-/g, ' ')}

Her satır için EKSIKSIZ şu yapıyı üretmelisin:
- Her KELIME için: text, tr (Türkçe çevirisi), de_meaning (Almanca dilbilgisel açıklama), context (şarkıdaki bağlamsal anlamı)
- Her SATIR için: line_translation (doğal Türkçe çeviri), line_analysis (edebi/dilbilgisel/kültürel derin analiz, 2-4 cümle)

ÖNEMLI KURALLAR:
1. Yanıtı SADECE aşağıdaki JSON formatında ver. Başında/sonunda markdown kodu, açıklama veya yorum OLMAMALI.
2. context alanını şarkının genel temasıyla ilişkilendir.
3. de_meaning alanında dilbilgisi kategorisini (isim, fiil, sıfat, edat vb.) ve cinsiyeti (der/die/das) belirt.
4. line_analysis alanında metafor, kültürel bağlam ve Almanca dilbilgisi yapılarını açıkla.

ÇIKTI FORMATI (JSON, başka hiçbir şey):
{
  "meta": {
    "title": "${slug.replace(/-/g, ' ')}",
    "artist": "Bilinmiyor",
    "year": 0,
    "language": "de"
  },
  "lines": [
    {
      "time": 0.00,
      "words": [
        {
          "text": "kelime",
          "tr": "türkçe karşılık",
          "de_meaning": "dilbilgisi açıklaması",
          "context": "şarkı bağlamında anlamı"
        }
      ],
      "line_translation": "satırın doğal Türkçe çevirisi",
      "line_analysis": "derin analiz metni"
    }
  ]
}

ŞARKI SÖZLERİ:
${lyricsText}`;
}

async function callAnthropicAPI(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY tanımlı değil. .env dosyasını kontrol et.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API hatası ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

function extractJSON(text) {
  // Markdown code block içinden JSON'ı çıkar
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]+?)```/);
  if (codeBlock) return codeBlock[1].trim();
  // Direkt JSON ise ilk { ile son } arasını al
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1) return text.slice(start, end + 1);
  return text.trim();
}

async function generateForSlug(slug) {
  const dir = path.join(ROOT, 'public', 'music', slug);
  const lyricsPath = path.join(dir, 'lyrics.txt');
  const outPath = path.join(dir, 'analysis.json');

  if (!fs.existsSync(dir)) {
    console.error(`✗ Klasör bulunamadı: public/music/${slug}/`);
    process.exit(1);
  }

  if (fs.existsSync(outPath)) {
    console.log(`↷ Atlandı (zaten mevcut): ${slug}/analysis.json`);
    return;
  }

  if (!fs.existsSync(lyricsPath)) {
    console.error(`✗ lyrics.txt bulunamadı: public/music/${slug}/lyrics.txt`);
    console.error(`  Format: [MM:SS.xx] şarkı sözü`);
    process.exit(1);
  }

  console.log(`⏳ Analiz üretiliyor: ${slug}...`);

  const lyricsContent = fs.readFileSync(lyricsPath, 'utf8');
  const lines = parseLRC(lyricsContent);

  if (!lines.length) {
    console.error(`✗ lyrics.txt okunabilir format içermiyor. [MM:SS.xx] formatını kontrol et.`);
    process.exit(1);
  }

  console.log(`   ${lines.length} satır, model: claude-haiku-4-5-20251001`);

  const prompt = buildPrompt(slug, lines);
  const rawResponse = await callAnthropicAPI(prompt);

  let parsed;
  try {
    parsed = JSON.parse(extractJSON(rawResponse));
  } catch {
    const debugPath = path.join(dir, 'analysis_raw_response.txt');
    fs.writeFileSync(debugPath, rawResponse);
    console.error(`✗ JSON parse hatası. Ham yanıt: ${debugPath}`);
    process.exit(1);
  }

  // Zamanlamaları lyrics.txt'deki orijinal değerlerle dengele
  if (parsed.lines && lines.length === parsed.lines.length) {
    parsed.lines.forEach((l, i) => { l.time = lines[i].time; });
  }

  fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2), 'utf8');
  const lineCount = parsed.lines?.length ?? 0;
  const wordCount = parsed.lines?.reduce((sum, l) => sum + (l.words?.length ?? 0), 0) ?? 0;
  console.log(`✓ Tamamlandı: ${slug}/analysis.json (${lineCount} satır, ${wordCount} kelime)`);
}

async function main() {
  loadEnv();

  const args = process.argv.slice(2);
  const slugIdx = args.indexOf('--slug');
  const allMode = args.includes('--all');

  if (allMode) {
    const musicDir = path.join(ROOT, 'public', 'music');
    if (!fs.existsSync(musicDir)) {
      console.error('✗ public/music/ klasörü bulunamadı.');
      process.exit(1);
    }
    const slugs = fs.readdirSync(musicDir).filter(d =>
      fs.statSync(path.join(musicDir, d)).isDirectory()
    );
    if (!slugs.length) {
      console.log('Henüz şarkı klasörü yok.');
      return;
    }
    for (const slug of slugs) {
      await generateForSlug(slug);
    }
    return;
  }

  if (slugIdx === -1 || !args[slugIdx + 1]) {
    console.log(`
Kullanım:
  node scripts/generate-analysis.js --slug <şarkı-slug>
  node scripts/generate-analysis.js --all

Örnekler:
  node scripts/generate-analysis.js --slug 99-luftballons
  node scripts/generate-analysis.js --all
`);
    process.exit(0);
  }

  await generateForSlug(args[slugIdx + 1]);
}

main().catch(err => {
  console.error('Beklenmeyen hata:', err.message);
  process.exit(1);
});
