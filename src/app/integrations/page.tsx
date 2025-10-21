'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useUmkm } from "@/context/UmkmContext";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function IntegrationsPage() {
    const { umkmData, handleOmzetChange, toggleConnection, addPlatform, isLoading } = useUmkm();
    const [newPlatformName, setNewPlatformName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddPlatform = () => {
        if(newPlatformName.trim()){
            addPlatform(newPlatformName.trim());
            setNewPlatformName("");
            setIsDialogOpen(false);
        }
    }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Kelola Integrasi</h1>
                <p className="text-muted-foreground">Hubungkan toko online Anda untuk sinkronisasi omzet otomatis.</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Tambah Koneksi
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-[425px] rounded-lg">
                    <DialogHeader>
                        <DialogTitle>Tambah Platform Baru</DialogTitle>
                        <DialogDescription>
                            Masukkan nama platform e-commerce yang ingin Anda hubungkan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="platform-name" className="text-right">
                                Nama
                            </Label>
                            <Input
                                id="platform-name"
                                value={newPlatformName}
                                onChange={(e) => setNewPlatformName(e.target.value)}
                                className="col-span-3"
                                placeholder="e.g. Bukalapak"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddPlatform}>Tambah Platform</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Status Koneksi</CardTitle>
                <CardDescription>Daftar platform e-commerce dan status sinkronisasinya.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 grid gap-4 md:grid-cols-2">
                {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                         <Card key={index} className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-5 w-24" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                         </Card>
                    ))
                ) : (
                    umkmData.platforms.map((p) => (
                        <Card key={p.name} className="p-4 flex flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="font-medium">{p.name}</p>
                                        {p.connected ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                            Terhubung
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                                            Putus
                                            </span>
                                        )}
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => toggleConnection(p.name)}>
                                        {p.connected ? 'Putuskan' : 'Hubungkan'}
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`omzet-${p.name}`} className="text-sm">Omzet Tersinkronisasi</Label>
                                    {p.connected ? (
                                        <Input
                                            id={`omzet-${p.name}`}
                                            type="text"
                                            inputMode="numeric"
                                            value={new Intl.NumberFormat('id-ID').format(p.omzet)}
                                            onChange={(e) => handleOmzetChange(p.name, e.target.value)}
                                            className="w-full text-right"
                                            placeholder="0"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-10 bg-muted/50 rounded-md">
                                          <p className="text-xs text-muted-foreground">Hubungkan untuk melihat omzet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {p.connected && p.lastSync && (
                                <div className="mt-4">
                                    <p className="text-xs text-muted-foreground">
                                        Sinkr. terakhir: {p.lastSync}
                                    </p>
                                </div>
                            )}
                        </Card>
                    ))
                )}
            </CardContent>
        </Card>
    </div>
  )
}
