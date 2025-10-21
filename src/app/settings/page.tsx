'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";


export default function SettingsPage() {
  const { toast } = useToast();

  const handleSaveChanges = () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Perubahan Anda telah disimpan (simulasi).",
    })
  }
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Pengaturan Akun</h1>
            <p className="text-muted-foreground">Kelola informasi profil dan preferensi aplikasi Anda.</p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Profil Usaha</CardTitle>
                <CardDescription>Informasi ini akan digunakan dalam laporan dan simulasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="business-name">Nama Usaha</Label>
                    <Input id="business-name" defaultValue="Toko Jaya Abadi" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="npwp">NPWP (Opsional)</Label>
                    <Input id="npwp" defaultValue="94.123.456.7-123.000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@tokojaya.com" />
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Notifikasi</CardTitle>
                <CardDescription>Pilih notifikasi yang ingin Anda terima.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="notif-omzet" className="cursor-pointer">Peringatan Batas Omzet</Label>
                        <p className="text-sm text-muted-foreground">
                            Kirim notifikasi saat omzet mendekati batas bebas pajak.
                        </p>
                    </div>
                    <Switch id="notif-omzet" defaultChecked />
                </div>
                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="notif-regulasi" className="cursor-pointer">Update Regulasi Pajak</Label>
                        <p className="text-sm text-muted-foreground">
                            Informasikan jika ada perubahan peraturan pajak UMKM.
                        </p>
                    </div>
                    <Switch id="notif-regulasi" defaultChecked />
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
        </div>
    </div>
  )
}
