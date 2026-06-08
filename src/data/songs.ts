// ============================================================================
// ŞARKI VERİSİ — Lernen Deutsch platformu
// Yeni şarkı eklemek için:
//   1. /public/music/{slug}/ klasörü oluştur
//   2. audio.mp3, cover.jpg, analysis.json dosyalarını ekle
//   3. Aşağıdaki songs dizisine metadata satırını ekle
//   4. analysis.json'u generate etmek için:
//      node scripts/generate-analysis.js --slug {slug}
// ============================================================================

export interface WordData {
  text: string;
  tr: string;
  de_meaning: string;
  context: string;
}

export interface LyricLine {
  time: number;
  words: WordData[];
  line_translation: string;
  line_analysis: string;
}

export interface AnalysisData {
  meta: {
    title: string;
    artist: string;
    year: number;
    language: string;
  };
  lines: LyricLine[];
}

export interface Song {
  slug: string;
  title: string;
  artist: string;
  year: number;
  duration: number;
  audioUrl: string;
  coverUrl: string;
  analysisUrl: string;
}

export const songs: Song[] = [
  {
    slug: "demo",
    title: "99 Luftballons",
    artist: "Nena",
    year: 1983,
    duration: 237,
    audioUrl: "/music/demo/audio.mp3",
    coverUrl: "/music/demo/cover.jpg",
    analysisUrl: "/music/demo/analysis.json",
  },
  // Buraya yeni şarkı ekle:
  // {
  //   slug: "an-tagen-wie-diesen",
  //   title: "An Tagen wie diesen",
  //   artist: "Die Toten Hosen",
  //   year: 1999,
  //   duration: 204,
  //   audioUrl: "/music/an-tagen-wie-diesen/audio.mp3",
  //   coverUrl: "/music/an-tagen-wie-diesen/cover.jpg",
  //   analysisUrl: "/music/an-tagen-wie-diesen/analysis.json",
  // },
];
