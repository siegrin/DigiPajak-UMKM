'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const faqs = [
    {
        question: "Apa itu PPh Final 0.5% untuk UMKM?",
        answer: "PPh Final 0.5% adalah tarif pajak penghasilan khusus yang dikenakan atas total omzet bruto (penjualan kotor) UMKM setiap bulan. Tarif ini bersifat final, artinya setelah pajak dibayar, penghasilan tersebut tidak perlu dihitung lagi dalam SPT Tahunan PPh di akhir tahun."
    },
    {
        question: "Siapa saja yang bisa menggunakan tarif 0.5% ini?",
        answer: "Wajib Pajak (WP) yang bisa menggunakan tarif ini adalah WP Orang Pribadi dan WP Badan (seperti CV, Firma, Koperasi, atau PT) yang memiliki peredaran bruto (omzet) tidak melebihi Rp 4,8 miliar dalam satu tahun pajak."
    },
    {
        question: "Berapa lama saya bisa menggunakan tarif PPh Final 0.5%?",
        answer: "Ada jangka waktu tertentu: 7 tahun untuk Wajib Pajak Orang Pribadi; 4 tahun untuk Wajib Pajak Badan berbentuk Koperasi, CV, atau Firma; dan 3 tahun untuk Wajib Pajak Badan berbentuk Perseroan Terbatas (PT). Jangka waktu dihitung sejak tahun pajak WP terdaftar atau sejak tahun 2018 jika sudah terdaftar sebelumnya."
    },
    {
        question: "Bagaimana cara menghitung omzet jika jualan di banyak platform?",
        answer: "Omzet adalah total penjualan dari SEMUA platform dan kanal penjualan (online maupun offline) sebelum dikurangi biaya apapun. Anda wajib menggabungkan seluruh omzet dari Tokopedia, Shopee, TikTok, toko fisik, dll. untuk menghitung PPh Final."
    },
    {
        question: "Apakah omzet di bawah Rp 500 juta benar-benar bebas pajak?",
        answer: "Ya, TAPI INI HANYA BERLAKU untuk Wajib Pajak Orang Pribadi. Omzet kumulatif hingga Rp 500 juta pertama dalam setahun tidak dikenai PPh Final. Pajak 0.5% hanya dikenakan pada omzet setelah melampaui Rp 500 juta. Aturan ini tidak berlaku untuk Wajib Pajak Badan (CV, PT, dll)."
    },
    {
        question: "Kapan saya harus membayar dan melaporkan PPh Final ini?",
        answer: "PPh Final 0.5% harus disetor (dibayar) paling lambat tanggal 15 bulan berikutnya. Setelah dibayar, Anda dianggap sudah melaporkannya (melalui proses validasi SSP). Anda tidak perlu membuat laporan bulanan terpisah jika sudah membayar."
    }
]

export default function EducationPage() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Pusat Edukasi & Regulasi</h1>
            <p className="text-muted-foreground">Pahami aturan main pajak untuk UMKM agar bisnis Anda tetap patuh dan berkembang.</p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Ringkasan Regulasi Terbaru</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-1">PP 55 Tahun 2022</h3>
                        <p className="text-sm text-muted-foreground mb-2">Peraturan Pemerintah ini menjadi landasan utama fasilitas pajak UMKM. Poin kuncinya adalah memberikan pembebasan PPh Final (omzet s/d 500 juta tidak kena pajak) khusus untuk Wajib Pajak Orang Pribadi.</p>
                        <a href="https://pajak.go.id/id/peraturan/peraturan-pemerintah-republik-indonesia-nomor-55-tahun-2022" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold flex items-center">
                            Baca Selengkapnya <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-1">PP 23 Tahun 2018</h3>
                        <p className="text-sm text-muted-foreground mb-2">Peraturan ini menetapkan tarif PPh Final sebesar 0,5% dari omzet untuk Wajib Pajak dengan peredaran bruto tertentu dan mengatur jangka waktu pemanfaatannya.</p>
                         <a href="https://pajak.go.id/id/peraturan/peraturan-pemerintah-republik-indonesia-nomor-23-tahun-2018" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-semibold flex items-center">
                            Baca Selengkapnya <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2" />
                        Pertanyaan Umum (FAQ)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="whitespace-pre-wrap">{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Studi Kasus & Simulasi Perhitungan</CardTitle>
                <CardDescription>Simulasi perhitungan untuk UMKM dengan berbagai skenario omzet dan bentuk usaha.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Kasus 1: Usaha Orang Pribadi (Toko Kue Ibu Rina)</h3>
                    <p className="text-sm text-muted-foreground mb-3">Ibu Rina memiliki toko kue online dan offline. Sebagai Wajib Pajak Orang Pribadi, ia berhak atas fasilitas bebas pajak untuk omzet s/d Rp 500 juta.</p>
                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li>
                            <span className="font-semibold text-foreground">Skenario A (Omzet Rp 450 Juta/tahun):</span> 
                            PPh Final terutang adalah <span className="font-bold text-green-600">Rp 0</span>, karena total omzet masih di bawah batas Rp 500 juta.
                        </li>
                        <li>
                            <span className="font-semibold text-foreground">Skenario B (Omzet Rp 700 Juta/tahun):</span> 
                            Omzet kena pajak adalah Rp 700 juta - Rp 500 juta = Rp 200 juta. 
                            PPh Final terutang adalah 0.5% x Rp 200 juta = <span className="font-bold">Rp 1.000.000</span> setahun.
                        </li>
                        <li>
                            <span className="font-semibold text-foreground">Simulasi Bulanan Skenario B (Januari):</span>
                             Jika omzet Januari adalah Rp 60 juta, maka PPh Final Januari = 0.5% x Rp 60 juta = <span className="font-bold">Rp 300.000</span>. (Asumsi omzet kumulatif sudah di atas 500jt).
                        </li>
                    </ul>
                </div>

                 <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Kasus 2: Usaha Berbentuk CV (CV Maju Jaya)</h3>
                    <p className="text-sm text-muted-foreground mb-3">CV Maju Jaya adalah sebuah agensi digital. Sebagai Wajib Pajak Badan, fasilitas bebas pajak Rp 500 juta <span className="font-bold">TIDAK BERLAKU</span>.</p>
                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li>
                            <span className="font-semibold text-foreground">Skenario (Omzet Rp 800 Juta/tahun):</span> 
                            Pajak dihitung dari rupiah pertama. PPh Final terutang adalah 0.5% x Rp 800 juta = <span className="font-bold">Rp 4.000.000</span> setahun.
                        </li>
                    </ul>
                </div>

                 <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Kasus 3: Omzet Melebihi Batas (Toko Elektronik Pak Budi)</h3>
                    <p className="text-sm text-muted-foreground mb-3">Usaha Pak Budi (Orang Pribadi) berkembang pesat. Omzet tahun {currentYear} mencapai Rp 5 Miliar, melebihi batas Rp 4.8 Miliar.</p>
                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li>
                            <span className="font-semibold text-foreground">Konsekuensi:</span> 
                            Mulai tahun pajak berikutnya ({currentYear + 1}), Pak Budi tidak bisa lagi menggunakan tarif PPh Final 0.5%. Ia harus beralih menggunakan tarif PPh umum (berdasarkan laba bersih) dan wajib menyelenggarakan pembukuan.
                        </li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
