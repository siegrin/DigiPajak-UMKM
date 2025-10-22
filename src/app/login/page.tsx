'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUmkm } from "@/context/UmkmContext";
import { Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
    username: z.string().min(1, { message: "Username tidak boleh kosong." }),
    password: z.string().min(1, { message: "Password tidak boleh kosong." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useUmkm();
    const { toast } = useToast();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "admin",
            password: "admin",
        },
    });

    const handleLogin = (values: LoginFormValues) => {
        setAuthError('');
        setIsSubmitting(true);
        
        // Simulate network delay
        setTimeout(() => {
            if (login(values.username, values.password)) {
                toast({
                    title: "Login Berhasil",
                    description: "Selamat datang kembali! Mengarahkan ke dashboard...",
                });
            } else {
                setAuthError("Username atau password salah.");
                form.setValue("password", ""); // Clear password on error
            }
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            <div className="mb-8 flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold">DigiPajak UMKM</h1>
            </div>
            <Card className="w-full max-w-sm animate-in fade-in slide-in-from-bottom-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Masukkan kredensial Anda untuk mengakses dashboard.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="admin" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input type={showPassword ? "text" : "password"} {...field} />
                                            </FormControl>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {authError && (
                                <p className="text-sm font-medium text-destructive">{authError}</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSubmitting ? 'Memverifikasi...' : 'Sign in'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Gunakan username: <strong>admin</strong> & password: <strong>admin</strong> untuk masuk.</p>
            </div>
        </div>
    );
}
