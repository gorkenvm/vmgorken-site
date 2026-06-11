# Altyapı & Deployment Rehberi

Bu doküman, [vmgorken.com](https://www.vmgorken.com) sitesinin nasıl barındırıldığını,
nasıl yayına alındığını ve VPS'in nasıl yönetildiğini anlatır. Hem referans, hem öğrenme
materyali olarak kullanılabilir.

---

## 1. Büyük resim — VPS'inde ne var?

VPS tek bir Ubuntu makinesi. Üstünde **Docker** çalışıyor; her servis "container" denen
izole bir kutuda duruyor. Dışarıya **hiç port açılmıyor** — tüm trafik Cloudflare Tunnel
üzerinden güvenli şekilde içeri giriyor.

```
                    İNTERNET (vmgorken.com)
                          │
                          ▼
                ┌────────────────────┐
                │  Cloudflare Tunnel  │   ← VPS'teki "cloudflared" container'ı
                │     (cloudflared)   │      Dışarı port AÇMADAN trafiği içeri sokar
                └────────────────────┘
                          │
        ┌─────────────────┼──────────────────┐
        ▼                 ▼                  ▼
  ┌──────────┐     ┌────────────┐     ┌──────────┐
  │  nginx   │     │   n8n      │     │ FastAPI  │
  │ (siten)  │     │            │     │          │
  └────┬─────┘     └─────┬──────┘     └────┬─────┘
       │                 │                 │
       ▼                 └────────┬────────┘
  dist/ dosyaların                ▼
  (HTML/CSS/JS)              ┌──────────┐
                            │ Postgres │
                            └──────────┘

  Hepsi aynı Docker ağında konuşur: n8n_n8n_net
```

**Kritik kavram:** Container'lar birbirini **isimleriyle** bulur (IP ile değil). Site
container'ı `vmgorken_site` adıyla çalışır; Cloudflare de ona `http://vmgorken_site:80`
diye bağlanır. Bu yüzden hepsinin **aynı Docker ağında** (`n8n_n8n_net`) olması şarttır.

---

## 2. Temel bilgiler (cheat sheet)

| Ne | Değer |
|---|---|
| VPS IP | `178.104.134.36` |
| SSH kullanıcısı | `vmg` |
| İşletim sistemi | Ubuntu 24.04 LTS |
| Site container adı | `vmgorken_site` (nginx:alpine) |
| Diğer container'lar | `cloudflared`, `n8n`, `n8n_postgres` |
| Docker ağı | `n8n_n8n_net` (external) |
| Site dosyaları (VPS) | `/home/vmg/www/vmgorken-site/dist/` |
| nginx compose klasörü | `~/docker/website/` |
| GitHub repo | https://github.com/gorkenvm/vmgorken-site |
| Domain | vmgorken.com (Cloudflare Tunnel) |

---

## 3. Deploy akışı — push'tan canlıya

```
LOCAL                    GITHUB                          VPS
─────                    ──────                          ───
npm run dev   →  (sadece sen görürsün — localhost:4321, push YOK)

  ↓ büyük değişiklik hazır

git push      →  GitHub Actions tetiklenir
                 ├─ npm install && npm run build   (dist/ üretir)
                 └─ dist/ klasörünü SCP ile VPS'e atar
                                                  →  /home/vmg/www/vmgorken-site/dist/
                                                     nginx bu klasörü canlı servis eder
                                                     → site güncellenir
```

**Önemli:** nginx, `dist/` klasörünü canlı okur. Deploy yeni dosyaları oraya kopyalar,
nginx **anında** servis eder — container'ı restart etmeye gerek yoktur. Sadece
`nginx.conf` değişirse restart gerekir (o da nadiren).

### Günlük iş akışı
- **Geliştirme:** `npm run dev` → localde gör, push yapma.
- **Yayına alma:** `git add` → `git commit` → `git push` → otomatik canlı.

Yani auto-deploy açık kalır; "ne zaman canlıya gideceğini" push'u kontrol ederek belirlersin.

---

## 4. VPS yönetimi — temel komutlar

```bash
# Bağlan
ssh vmg@178.104.134.36

# Çalışan container'ları gör
docker ps

# Site dosyaları yerinde mi?
ls /home/vmg/www/vmgorken-site/dist/      # index.html görüyorsan deploy gelmiş

# nginx'i yönet (compose klasöründe)
cd ~/docker/website
docker compose ps                          # durum
docker compose restart                     # yeniden başlat
docker compose logs --tail=50              # son 50 log satırı
docker compose up -d --force-recreate      # config değiştiyse temiz kur

# Bir container neden çökmüş? → loglara bak
docker logs vmgorken_site --tail=50
```

### `restart` vs `recreate` vs `down/up`
| Komut | Ne yapar | Ne zaman |
|---|---|---|
| `docker compose restart` | Aynı container'ı durdurup başlatır | Hızlı yeniden başlatma |
| `docker compose up -d --force-recreate` | Container'ı siler, yeniden yaratır | nginx.conf / compose değişince |
| `docker compose down` + `up -d` | Hepsini kaldırıp temiz kurar | Bozuk/hayalet durumu temizlemek için |

---

## 5. Sorun giderme kılavuzu (gerçek vakalar)

Bu sitenin kurulumu sırasında karşılaşılan gerçek sorunlar ve çözümleri.

### 🔴 502 Bad Gateway
**Belirti:** Cloudflare çalışıyor ama "Host Error" diyor.
**Sebep:** cloudflared, nginx container'ına ulaşamıyor (nginx çökmüş veya yeni IP almış).
**Çözüm:** nginx'i ayağa kaldır (`docker compose up -d`); gerekiyorsa VPS'i reboot et
(her şey aynı ağda taze IP'lerle kalkar).

### 🔴 Error 1033 — Cloudflare Tunnel error
**Belirti:** "Cloudflare is unable to resolve it".
**Sebep:** cloudflared container'ı çalışmıyor (örn. VPS reboot sırasında henüz açılmadı).
**Çözüm:** Birkaç dakika bekle; `docker ps` ile cloudflared'in `Up` olduğunu doğrula.

### 🔴 Container ismi başında hash var (örn. `955e06..._vmgorken_site`)
**Sebep:** Docker Compose container'ın izini kaybetmiş, "hayalet" bir kopya oluşmuş.
**Çözüm:** `docker compose down` + `docker compose up -d` ile temizle.

### 🔴 `stop`/`restart`/`down` → "permission denied" (KÖK SEBEP: snap Docker)
**Belirti:** Container hiçbir durdurma komutuna yanıt vermez, "permission denied" der.
Reboot bile kalıcı çözmez — bir süre sonra geri gelir.

**Teşhis:** `sudo dmesg | grep -i apparmor | tail` çalıştır. Şuna benzer satır görürsün:
```
apparmor="DENIED" operation="signal" profile="docker-default"
   signal=kill peer="snap.docker.dockerd"
```

**Kök sebep:** Docker **snap paketi** olarak kurulu (`snap.docker.dockerd`). Snap Docker
kendi AppArmor profili altında çalışır; container'ların `docker-default` profili,
`snap.docker.dockerd` peer'ından gelen kill/quit sinyallerini reddeder. Sonuç: dockerd
container'ı durduramaz. Bu, snap Docker + AppArmor'ın bilinen uyumsuzluğudur.

**Kalıcı çözüm (hedefli, güvenli):** İlgili container'ı AppArmor kilidinden muaf tut.
Compose dosyasına ekle:
```yaml
    security_opt:
      - apparmor=unconfined
```
Yeni profili uygulamak için (eski container hâlâ kilitli olduğundan tek seferlik):
```bash
docker update --restart=no vmgorken_site          # otomatik yeniden başlatmayı kapat
PID=$(docker inspect --format '{{.State.Pid}}' vmgorken_site)
sudo kill -9 $PID                                  # süreci öldür (geri gelmez)
docker rm vmgorken_site                            # ölü container'ı sil
docker compose up -d                               # yeni profille kur
docker compose restart                             # TEST: artık ✔ Restarted demeli
```
Bundan sonra container normal şekilde yönetilebilir; PID öldürmeye gerek kalmaz.

**Acil kurtarma (kalıcı çözümden önce site'ı geri getirmek için):**
```bash
docker inspect --format '{{.State.Pid}}' <container>
sudo kill -9 <PID>
docker compose up -d
```

**Asıl doğru çözüm (opsiyonel, büyük iş):** Snap Docker'ı kaldırıp resmi APT Docker'a
(`docker-ce`) geçmek sorunu kökten bitirir — ama n8n/postgres verilerini taşımak gerekir.

### 🔴 403 Forbidden (deploy başarılı ama site açılmıyor)
**Belirti:** GitHub Actions yeşil, dosyalar VPS'e gitti ama site `403 Forbidden` veriyor.
**Sebep:** Deploy adımı `rm: true` ile `dist` klasörünü **silip yeniden yaratıyordu**.
Klasör silinip yeniden yaratılınca **yeni bir inode** oluşur; nginx hâlâ eski (silinmiş)
inode'u bind-mount ile bağlı tuttuğu için yeni dosyaları göremez → boş dizin → 403.
**Çözüm:**
1. Kalıcı düzeltme: deploy.yml'den `rm: true`'yu kaldır (dosyalar yerinde güncellenir,
   inode korunur, mount kopmaz).
2. Tek seferlik kurtarma (mount'u tazele):
   ```bash
   cd ~/docker/website
   docker compose up -d --force-recreate
   docker exec vmgorken_site ls /usr/share/nginx/html   # index.html görmeli
   ```
**Ders:** Bir klasör bir container'a bind-mount edilmişse, o klasörü host'ta **silme** —
içindeki dosyaları üzerine yaz. Silmek mount'u koparır.

### 🔴 GitHub Actions build patlıyor: `npm ci can only install when ... in sync`
**Belirti:** Lokalde build çalışıyor ama Actions'ta `npm ci` "lock dosyası senkron değil" der.
**Sebep:** Lokal ve Actions farklı Node/npm sürümleri kullanıyor; lock dosyası uyuşmuyor.
**Çözüm:** Lock'u tazele (`npm install`) ve workflow'da `npm ci` yerine `npm install` kullan.

### 💡 Genel ders
Bir container `stop/restart` komutlarına "permission denied" diyorsa sorun çoğu zaman
container'da değil, **daemon veya kernel** seviyesindedir. `sudo systemctl restart docker`
çoğu takılmayı, `sudo reboot` ise kernel/AppArmor kaynaklı takılmaları çözer.

---

## 6. Reboot güvenli mi? (kontrol)

Reboot öncesi container'ların otomatik geri geleceğini doğrula:
```bash
docker inspect -f '{{.Name}} -> {{.HostConfig.RestartPolicy.Name}}' $(docker ps -aq)
```
Çıktıda hepsi `unless-stopped` veya `always` ise → reboot sonrası dördü de otomatik kalkar,
reboot güvenlidir. `no` çıkan varsa, reboot sonrası elle başlatman gerekir.

---

## 7. Neden bu mimari?

- **Cloudflare Tunnel:** VPS'te dışa port açmadan (firewall'a delik açmadan) güvenli erişim.
- **Docker:** Her servis izole; biri çökse diğerleri etkilenmez. Taşıması/yeniden kurması kolay.
- **GitHub Actions (CI/CD):** Her deploy temiz ve tekrarlanabilir; VPS'te Node gerekmez;
  deploy geçmişi Actions sekmesinde kayıtlı. Ayrıca işverene gösterilebilen canlı bir
  CI/CD vitrini.
- **Statik site (Astro → nginx):** Çok hızlı, çok az kaynak, neredeyse sıfır bakım.
