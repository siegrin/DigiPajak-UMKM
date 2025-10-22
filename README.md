
# DigiPajak UMKM

**Simulasi dan Analisis Pajak PPh Final untuk Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia.**

Aplikasi ini dirancang sebagai alat bantu edukatif untuk membantu pemilik UMKM memahami, mensimulasikan, dan mengelola kewajiban Pajak Penghasilan (PPh) Final 0.5% mereka dengan lebih mudah.

---

### Tampilan Aplikasi

![Tampilan Dashboard DigiPajak UMKM](https://picsum.photos/seed/dashboard-ss/1200/600)

---

## ✨ Fitur Utama

- **Dashboard Interaktif**: Visualisasikan metrik pajak terpenting Anda secara real-time, termasuk total omzet, PPh final terutang, dan potensi penghematan pajak.
- **Pelacak Batas Omzet**: Pantau progres omzet tahunan Anda menuju batas `Rp 500 Juta` yang bebas pajak (sesuai PP 55/2022) dengan progress bar yang intuitif.
- **Kalkulator PPh Final Otomatis**: Secara otomatis menghitung estimasi PPh Final 0.5% yang harus dibayar setelah omzet melebihi batas bebas pajak.
- **Integrasi Multi-Platform**: Hubungkan dan sinkronisasikan data omzet dari berbagai platform e-commerce seperti Shopee, Tokopedia, dan lainnya.
- **Pusat Edukasi Pajak**: Akses rangkuman regulasi (PP 55/2022 & PP 23/2018), pertanyaan umum (FAQ), dan studi kasus perhitungan pajak dalam format yang mudah dipahami.
- **Simulasi Kode Billing**: Buat kode billing simulasi untuk pembayaran PPh Final Anda, lengkap dengan contoh QRIS untuk pembayaran.
- **Tema Terang & Gelap**: Tampilan yang nyaman di mata dengan dukungan penuh untuk mode terang (light mode) dan gelap (dark mode).
- **Desain Responsif**: Pengalaman pengguna yang mulus di berbagai perangkat, mulai dari desktop hingga mobile.

---

## 🛠️ Tumpukan Teknologi

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Komponen**: [React](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visualisasi Data**: [Recharts](https://recharts.org/)
- **Animasi**: [Framer Motion](https://www.framer.com/motion/) & [TailwindCSS Animate](https://tailwindcss.com/docs/animation)

---

## 🚀 Memulai

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di lingkungan lokal Anda.

### Prasyarat

- [Node.js](https://nodejs.org/en) (versi 18.x atau lebih tinggi)
- `npm` atau `yarn`

### Instalasi & Menjalankan

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/digipajak-umkm.git
    cd digipajak-umkm
    ```

2.  **Instal semua dependensi:**
    ```bash
    npm install
    ```
    Atau jika Anda menggunakan Yarn:
    ```bash
    yarn install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

4.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---

## 📂 Struktur Proyek

```
.
├── src
│   ├── app                 # Halaman utama aplikasi (App Router)
│   │   ├── (page-name)     # Folder untuk setiap halaman
│   │   ├── globals.css     # File CSS global & tema
│   │   ├── layout.tsx      # Layout utama aplikasi
│   │   └── page.tsx        # Halaman utama (Dashboard)
│   ├── components
│   │   ├── dashboard       # Komponen spesifik untuk halaman Dashboard
│   │   ├── layout          # Komponen layout (Sidebar, Header)
│   │   └── ui              # Komponen UI dari shadcn (Button, Card, dll.)
│   ├── context             # React Context untuk state management (UmkmContext)
│   ├── hooks               # Custom hooks (useToast, useMobile)
│   └── lib                 # Fungsi utilitas & data (utils.ts, placeholder-images.json)
├── public                  # Aset statis (gambar, ikon)
├── tailwind.config.ts      # Konfigurasi Tailwind CSS
└── next.config.ts          # Konfigurasi Next.js
```

---

## 📄 Lisensi

Proyek ini berada di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.
