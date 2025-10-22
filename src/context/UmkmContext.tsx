'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

interface Platform {
    name: string;
    omzet: number;
    connected: boolean;
    lastSync: string | null;
}

interface UmkmData {
    platforms: Platform[];
    npwp: string;
}

interface UmkmContextType {
    umkmData: UmkmData;
    taxFreeLimit: number;
    isLoading: boolean;
    isAuthenticated: boolean;
    isOnboarded: boolean;
    setUmkmData: React.Dispatch<React.SetStateAction<UmkmData>>;
    handleOmzetChange: (platformName: string, newOmzet: string) => void;
    toggleConnection: (platformName: string) => void;
    addPlatform: (platformName: string) => void;
    login: (user: string, pass: string) => boolean;
    logout: () => void;
    completeOnboarding: (npwp: string) => void;
}

const initialData: UmkmData = {
    platforms: [],
    npwp: '',
};

const defaultData: UmkmData = {
     platforms: [
        { name: 'Shopee', omzet: 350181000, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        { name: 'Tokopedia', omzet: 306819000, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        { name: 'Lazada', omzet: 0, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        { name: 'TikTok Shop', omzet: 0, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
    ],
    npwp: '',
}

const UmkmContext = createContext<UmkmContextType | undefined>(undefined);

export function UmkmProvider({ children }: { children: ReactNode }) {
    const [umkmData, setUmkmData] = useState<UmkmData>(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isOnboarded, setIsOnboarded] = useState(false);
    
    const taxFreeLimit = 500000000;

    useEffect(() => {
        try {
            const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
            const onboardStatus = sessionStorage.getItem('isOnboarded') === 'true';
            const storedNpwp = sessionStorage.getItem('npwp');
            
            setIsAuthenticated(authStatus);
            setIsOnboarded(onboardStatus);

            if(authStatus && onboardStatus) {
                setUmkmData(prev => ({...prev, ...defaultData, npwp: storedNpwp || ''}));
            }
        } catch (error) {
            console.error("Could not access sessionStorage:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = (user: string, pass: string): boolean => {
        if(user === 'admin' && pass === 'admin') {
            try {
                sessionStorage.setItem('isAuthenticated', 'true');
            } catch (error) {
                 console.error("Could not access sessionStorage:", error);
            }
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }

    const logout = useCallback(() => {
        try {
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('isOnboarded');
            sessionStorage.removeItem('npwp');
        } catch (error) {
            console.error("Could not access sessionStorage:", error);
        }
        setIsAuthenticated(false);
        setIsOnboarded(false);
        setUmkmData(initialData);
    }, []);

    const completeOnboarding = (npwp: string) => {
        try {
            sessionStorage.setItem('isOnboarded', 'true');
            sessionStorage.setItem('npwp', npwp);
        } catch (error) {
            console.error("Could not access sessionStorage:", error);
        }
        setIsOnboarded(true);
        setUmkmData(prev => ({...prev, ...defaultData, npwp}));
    }

    const handleOmzetChange = (platformName: string, newOmzet: string) => {
        const value = parseInt(newOmzet.replace(/\D/g, ''), 10) || 0;
        setUmkmData(prevData => ({
            ...prevData,
            platforms: prevData.platforms.map(p =>
                p.name === platformName ? { ...p, omzet: value } : p
            )
        }));
    };

    const toggleConnection = (platformName: string) => {
        setUmkmData(prevData => ({
            ...prevData,
            platforms: prevData.platforms.map(p =>
                p.name === platformName 
                ? { 
                    ...p, 
                    connected: !p.connected,
                    lastSync: !p.connected ? format(new Date(), 'yyyy-MM-dd HH:mm:ss') : null,
                  } 
                : p
            )
        }));
    };

    const addPlatform = (platformName: string) => {
        const platformExists = umkmData.platforms.some(p => p.name.toLowerCase() === platformName.toLowerCase());
        if (!platformExists) {
            const newPlatform: Platform = {
                name: platformName,
                omzet: 0,
                connected: true, 
                lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
            };
            setUmkmData(prevData => ({
                ...prevData,
                platforms: [...prevData.platforms, newPlatform]
            }));
        }
    };
    
    const contextValue = useMemo(() => ({
        umkmData,
        taxFreeLimit,
        isLoading,
        isAuthenticated,
        isOnboarded,
        setUmkmData,
        handleOmzetChange,
        toggleConnection,
        addPlatform,
        login,
        logout,
        completeOnboarding,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [umkmData, isLoading, isAuthenticated, isOnboarded, logout]);

    return (
        <UmkmContext.Provider value={contextValue}>
            {children}
        </UmkmContext.Provider>
    );
}

export function useUmkm() {
    const context = useContext(UmkmContext);
    if (context === undefined) {
        throw new Error('useUmkm must be used within a UmkmProvider');
    }
    return context;
}
