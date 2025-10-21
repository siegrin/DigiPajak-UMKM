'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState, useEffect } from 'react';
import { useUmkm } from '@/context/UmkmContext';

const qrCodeImage = placeholderImages.find(p => p.id === "qr-code-1");

export default function IncentivesPage() {
    const { umkmData, taxFreeLimit } = useUmkm();
    const { toast } = useToast();
    const [billingCode, setBillingCode] = useState('');

    useEffect(() => {
        const year = new Date().getFullYear();
        const randomPart = Math.floor(Math.random() * 100000000000).toString().padStart(11, '0');
        setBillingCode(`8${year}${randomPart}`);
    }, []);

    const totalOmzet = useMemo(() =>
        umkmData.platforms.reduce((sum, p) => sum + (p.connected ? p.omzet : 0), 0),
        [umkmData.platforms]
    );

    const taxableOmzet = Math.max(0, totalOmzet - taxFreeLimit);
    const pphFinal = taxableOmzet * 0.005;

    const estimasiPenghematan = useMemo(() => {
        if (totalOmzet <= taxFreeLimit) {
            // Penghematan adalah 0.5% dari total omzet jika tidak ada batas 500jt
            return totalOmzet * 0.005;
        }
        // Penghematan adalah 0.5% dari batas 500jt
        return taxFreeLimit * 0.005;
    }, [totalOmzet, taxFreeLimit]);

    const handleCreateBilling = () => {
        toast({
            title: 'Kode Billing Dibuat (Simulasi)',
            description: `Kode billing ${billingCode} untuk ${formatCurrency(pphFinal)} telah dibuat.`,
        });
    };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Insentif & Pertumbuhan</h1>
            <p className="text-muted-foreground">Manfaatkan potensi insentif pajak dan fasilitas dari pemerintah.</p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Program Insentif Tersedia</CardTitle>
                    <CardDescription>Informasi mengenai program yang dapat mengoptimalkan kewajiban pajak Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <Badge variant="secondary" className="mb-2">Otomatis Aktif</Badge>
                        <h3 className="font-semibold mb-1">Pembebasan PPh Final untuk Omzet di Bawah Rp 500 Juta</h3>
                        <p className="text-sm text-muted-foreground">Sesuai PP 55/2022, Wajib Pajak Orang Pribadi dengan omzet tahunan tidak melebihi Rp 500 juta tidak dikenai PPh Final.</p>
                        <p className="text-sm font-bold mt-2">Estimasi Penghematan Anda: {formatCurrency(estimasiPenghematan)}.</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <Badge variant="outline" className="mb-2">Periodik</Badge>
                        <h3 className="font-semibold mb-1">Penghapusan Sanksi Administrasi (Sunset Policy)</h3>
                        <p className="text-sm text-muted-foreground">Program pemerintah yang secara berkala menawarkan penghapusan denda keterlambatan bayar atau lapor pajak. Pantau pengumuman resmi dari DJP.</p>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Simulasi Kode Billing</CardTitle>
                    <CardDescription>Buat kode billing simulasi untuk pembayaran PPh Final.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="pph">PPh Final Terutang</Label>
                        <Input id="pph" value={formatCurrency(pphFinal)} readOnly className="font-bold text-lg h-12" />
                    </div>
                    <Button className="w-full" onClick={handleCreateBilling} disabled={pphFinal <= 0}>Buat Kode Billing (Simulasi)</Button>
                    <Separator />
                    <div className="space-y-2 text-center">
                        <p className="text-sm text-muted-foreground">Kode Billing (Simulasi)</p>
                        <p className="font-mono text-lg font-bold tracking-widest break-all">{billingCode}</p>
                        <p className="text-sm text-muted-foreground">Gunakan QRIS untuk membayar</p>
                        {qrCodeImage && (
                            <div className="flex justify-center">
                                <div className="relative w-full max-w-[150px] aspect-square">
                                    <Image
                                        src={qrCodeImage.imageUrl}
                                        alt={qrCodeImage.description}
                                        data-ai-hint={qrCodeImage.imageHint}
                                        fill
                                        style={{objectFit: "contain"}}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
