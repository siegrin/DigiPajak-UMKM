'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUmkm } from "@/context/UmkmContext";
import { ShieldCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function OnboardingPage() {
    const [npwp, setNpwp] = useState('');
    const [agreed, setAgreed] = useState(false);
    const { completeOnboarding } = useUmkm();

    const handleSubmit = () => {
        if (agreed) {
            completeOnboarding(npwp);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
             <div className="absolute top-8 flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">Selamat Datang di DigiPajak</h1>
            </div>
            <Card className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Satu Langkah Lagi</CardTitle>
                    <CardDescription>
                        Lengkapi profil usaha Anda untuk memulai simulasi pajak.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="npwp">Nomor Pokok Wajib Pajak (NPWP)</Label>
                        <Input
                            id="npwp"
                            type="text"
                            placeholder="00.000.000.0-000.000 (Opsional)"
                            value={npwp}
                            onChange={(e) => setNpwp(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-2 pt-4">
                        <Checkbox id="terms" checked={agreed} onCheckedChange={(checked) => setAgreed(!!checked)} />
                        <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Saya setuju dengan <a href="#" className="underline">Ketentuan Layanan</a> dan <a href="#" className="underline">Kebijakan Privasi</a>.
                        </Label>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit} className="w-full" disabled={!agreed}>
                        Lanjutkan ke Integrasi
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
