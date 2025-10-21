'use client';

import {
  AlertTriangle,
  FileText,
  HelpCircle,
  Mail,
  PieChart as PieChartIcon,
  Printer,
  TrendingUp,
  Wallet,
  DollarSign,
  Landmark,
  PiggyBank,
  Target,
  BookOpen,
  BadgePercent,
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from '@/lib/utils';
import OmzetPieChart from '@/components/dashboard/omzet-pie-chart';
import AnimatedCounter from '@/components/dashboard/animated-counter';
import Link from 'next/link';
import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { useUmkm } from '@/context/UmkmContext';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';

function getProgressColor(percentage: number) {
  if (percentage >= 100) return 'bg-red-500';
  if (percentage >= 80) return 'bg-yellow-500';
  return 'bg-primary';
}

export default function Dashboard() {
  const { umkmData, handleOmzetChange, taxFreeLimit, isLoading } = useUmkm();

  const totalOmzet = useMemo(() =>
    umkmData.platforms.reduce((sum, p) => sum + (p.connected ? p.omzet : 0), 0),
    [umkmData.platforms]
  );

  const taxableOmzet = Math.max(0, totalOmzet - taxFreeLimit);
  const pphFinal = taxableOmzet * 0.005;
  const progress = totalOmzet > 0 ? Math.min((totalOmzet / taxFreeLimit) * 100, 100) : 0;
  const remainingLimit = Math.max(0, taxFreeLimit - totalOmzet);
  
  const taxSavings = useMemo(() => {
    if (totalOmzet <= taxFreeLimit) {
        return totalOmzet * 0.005;
    }
    return taxFreeLimit * 0.005;
  }, [totalOmzet, taxFreeLimit]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card><CardHeader><Skeleton className="h-5 w-24" /></CardHeader><CardContent><Skeleton className="h-8 w-32" /><Skeleton className="h-4 w-40 mt-2" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-5 w-24" /></CardHeader><CardContent><Skeleton className="h-8 w-32" /><Skeleton className="h-4 w-40 mt-2" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-5 w-24" /></CardHeader><CardContent><Skeleton className="h-8 w-32" /><Skeleton className="h-4 w-40 mt-2" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-5 w-24" /></CardHeader><CardContent><Skeleton className="h-8 w-32" /><Skeleton className="h-4 w-40 mt-2" /></CardContent></Card>
        </div>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader>
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card><CardHeader><Skeleton className="h-6 w-32" /></CardHeader><CardContent className="flex justify-center items-center h-24"><Skeleton className="h-24 w-24 rounded-full" /></CardContent></Card>
              <Card><CardHeader><Skeleton className="h-6 w-40" /></CardHeader><CardContent><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full mt-2" /><Skeleton className="h-4 w-3/4 mt-2" /></CardContent></Card>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
      {/* Bagian KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Omzet</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={totalOmzet} />
            </div>
            <p className="text-xs text-muted-foreground">Total pendapatan dari semua platform.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PPh Final Terutang</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value={pphFinal} />
            </div>
            <p className="text-xs text-muted-foreground">Estimasi pajak 0.5% yang harus dibayar.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimasi Penghematan</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
                <AnimatedCounter value={taxSavings} />
            </div>
            <p className="text-xs text-muted-foreground">Berkat insentif bebas pajak Rp 500 jt.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sisa Batas Bebas Pajak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="text-2xl font-bold">
                <AnimatedCounter value={remainingLimit} />
             </div>
            <p className="text-xs text-muted-foreground">Menuju batas omzet Rp 500 Juta.</p>
          </CardContent>
        </Card>
      </div>

      {/* Bagian Utama: Pelacak & Input Omzet di Kiri, Info di Kanan */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
        
        {/* Kolom Kiri: Pelacak dan Input */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1.5">
              <CardTitle>Pelacak & Input Omzet</CardTitle>
              <CardDescription>
                Pantau batas bebas pajak Anda dan perbarui omzet bulanan dari platform Anda di sini.
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                      <HelpCircle className="h-5 w-5" />
                      <span className="sr-only">Bantuan</span>
                  </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Panduan Membaca Dashboard</DialogTitle>
                    <DialogDescription>
                        Berikut adalah penjelasan setiap bagian di dashboard Anda.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 text-sm text-muted-foreground">
                    <div className="space-y-2">
                        <h4 className="font-bold text-foreground">Kartu Metrik Utama</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li><span className="font-semibold">Total Omzet:</span> Total pendapatan kotor dari semua platform yang terhubung.</li>
                            <li><span className="font-semibold">PPh Final Terutang:</span> Estimasi pajak 0.5% yang perlu Anda bayar. Nilai ini baru muncul setelah omzet Anda melebihi Rp 500 juta.</li>
                            <li><span className="font-semibold">Estimasi Penghematan:</span> Jumlah pajak yang berhasil Anda hemat berkat fasilitas bebas pajak untuk omzet hingga Rp 500 juta.</li>
                             <li><span className="font-semibold">Sisa Batas Bebas Pajak:</span> Sisa omzet yang masih bisa Anda dapatkan sebelum mulai membayar PPh Final 0.5%.</li>
                        </ul>
                    </div>
                     <Separator />
                    <div className="space-y-2">
                        <h4 className="font-bold text-foreground">Pelacak & Input Omzet</h4>
                        <ul className="list-disc list-inside space-y-1">
                            <li><span className="font-semibold">Progress Bar:</span> Visualisasi progres omzet Anda menuju batas Rp 500 juta. Akan berubah warna saat mendekati batas.</li>
                             <li><span className="font-semibold">Input Omzet Manual:</span> Area untuk memasukkan total omzet bulanan dari setiap platform. Hubungkan lebih banyak platform di halaman "Integrasi".</li>
                        </ul>
                    </div>
                     <Separator />
                    <div className="space-y-2">
                        <h4 className="font-bold text-foreground">Komposisi Omzet</h4>
                        <p>Diagram lingkaran ini menunjukkan persentase kontribusi omzet dari setiap platform, membantu Anda melihat mana yang paling menghasilkan.</p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogTrigger asChild>
                        <Button variant="outline">Mengerti</Button>
                    </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Progres Menuju Batas Bebas Pajak (PP 55/2022)</h3>
              <Progress value={progress} indicatorClassName={getProgressColor(progress)} />
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Tercapai: <span className="text-foreground">{formatCurrency(totalOmzet)}</span></span>
                <span>Batas: <span className="text-foreground">{formatCurrency(taxFreeLimit)}</span></span>
              </div>
            </div>
            {progress >= 100 && (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Batas Omzet Terlampaui!</AlertTitle>
                    <AlertDescription>
                        Omzet Anda telah melebihi batas bebas pajak. PPh Final 0.5% kini dihitung dari total omzet.
                    </AlertDescription>
                </Alert>
            )}

            <Separator />
            
            {/* Tabel Input Omzet */}
            <div>
              <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-medium text-muted-foreground">Input Omzet Manual (Simulasi)</h3>
                 <Button asChild variant="outline" size="sm" className="gap-1">
                    <Link href="/integrations">
                      Kelola Integrasi
                    </Link>
                  </Button>
              </div>
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead className="text-right w-[180px]">Omzet (Rp)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {umkmData.platforms.filter(p => p.connected).map((p) => (
                      <TableRow key={p.name}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="p-2">
                          <Input
                            type="text"
                            inputMode='numeric'
                            value={new Intl.NumberFormat('id-ID').format(p.omzet)}
                            onChange={(e) => handleOmzetChange(p.name, e.target.value)}
                            className="w-full text-right"
                            placeholder="0"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Kolom Kanan: Info Tambahan */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Komposisi Omzet</CardTitle>
              <CardDescription>Distribusi pendapatan dari berbagai platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <OmzetPieChart data={umkmData.platforms} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BadgePercent className="h-5 w-5 text-primary"/>
                <CardTitle className="text-lg">Insentif & Pertumbuhan</CardTitle>
              </div>
              <CardDescription>Manfaatkan potensi insentif pajak untuk bisnis Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Estimasi penghematan pajak tahunan.</li>
                  <li>Simulasi pembuatan kode billing untuk pembayaran.</li>
                  <li>Info program penghapusan sanksi administrasi.</li>
              </ul>
            </CardContent>
            <CardFooter>
               <Button asChild size="sm" className="w-full">
                  <Link href="/incentives">Lihat Detail Insentif</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
               <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary"/>
                <CardTitle className="text-lg">Pusat Edukasi</CardTitle>
              </div>
               <CardDescription>Pahami aturan pajak UMKM terbaru dengan mudah.</CardDescription>
            </CardHeader>
            <CardContent>
               <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Akses ringkasan PP 55/2022 &amp; PP 23/2018.</li>
                  <li>Pertanyaan yang sering diajukan (FAQ).</li>
                  <li>Studi kasus dan simulasi perhitungan pajak.</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild variant="secondary" size="sm" className="w-full">
                  <Link href="/education">Kunjungi Pusat Edukasi</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-200">
          Disclaimer Simulasi
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Aplikasi ini adalah alat simulasi untuk tujuan edukasi dan tidak terhubung dengan Direktorat Jenderal Pajak (DJP). Selalu konfirmasi perhitungan Anda dengan aturan yang berlaku.
        </AlertDescription>
      </Alert>
    </div>
  );
}
