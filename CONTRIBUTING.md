# Panduan Kontribusi untuk DigiPajak UMKM

Terima kasih atas minat Anda untuk berkontribusi pada proyek DigiPajak UMKM! Setiap kontribusi sangat kami hargai.

Dokumen ini adalah panduan bagi siapa saja yang ingin berkontribusi pada proyek ini. Dengan berpartisipasi, Anda setuju untuk mematuhi [Kode Etik](CODE_OF_CONDUCT.md) kami.

## Cara Berkontribusi

Ada banyak cara untuk berkontribusi, mulai dari melaporkan bug, menyarankan fitur baru, hingga menulis kode.

### Melaporkan Bug

Jika Anda menemukan bug, silakan buat *issue* baru di repositori GitHub kami. Pastikan untuk menyertakan:
- Deskripsi yang jelas tentang bug tersebut.
- Langkah-langkah untuk mereproduksi bug.
- Perilaku yang diharapkan dan apa yang sebenarnya terjadi.
- Screenshot atau video jika memungkinkan.

### Mengajukan Fitur atau Peningkatan

Jika Anda memiliki ide untuk fitur baru atau peningkatan, kami sangat senang mendengarnya! Silakan buat *issue* baru dan beri label "enhancement". Jelaskan ide Anda secara detail:
- Masalah apa yang coba dipecahkan oleh fitur ini?
- Bagaimana Anda membayangkan fitur ini bekerja?

### Proses Kontribusi Kode

Jika Anda ingin langsung berkontribusi dengan kode (misalnya, memperbaiki bug atau mengimplementasikan fitur), ikuti langkah-langkah berikut:

1.  **Fork Repositori**: Buat *fork* dari repositori utama ke akun GitHub Anda.

2.  **Clone Fork Anda**: Clone repositori yang sudah Anda *fork* ke mesin lokal Anda.
    ```bash
    git clone https://github.com/YOUR_USERNAME/digipajak-umkm.git
    cd digipajak-umkm
    ```

3.  **Buat Branch Baru**: Buat *branch* baru untuk menampung perubahan Anda. Gunakan nama yang deskriptif.
    ```bash
    git checkout -b fitur/nama-fitur-baru
    # atau
    git checkout -b perbaikan/deskripsi-bug-singkat
    ```

4.  **Lakukan Perubahan**: Buat perubahan kode yang diperlukan. Pastikan Anda mengikuti gaya penulisan kode yang sudah ada untuk menjaga konsistensi.

5.  **Commit Perubahan Anda**: Buat *commit* dengan pesan yang jelas dan informatif.
    ```bash
    git commit -m "Fitur: Menambahkan kalkulator PPh Pasal 21"
    ```

6.  **Push ke Branch Anda**: Push perubahan Anda ke repositori *fork* Anda di GitHub.
    ```bash
    git push origin fitur/nama-fitur-baru
    ```

7.  **Buat Pull Request (PR)**: Buka repositori utama di GitHub dan Anda akan melihat opsi untuk membuat *Pull Request* dari *branch* Anda.
    - Isi deskripsi PR dengan jelas, menjelaskan perubahan apa yang Anda buat dan mengapa.
    - Tautkan PR ke *issue* yang relevan jika ada (misalnya, "Closes #42").

Tim kami akan meninjau PR Anda sesegera mungkin. Terima kasih telah berkontribusi!
