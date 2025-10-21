'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { format } from 'date-fns';

interface Platform {
    name: string;
    omzet: number;
    connected: boolean;
    lastSync: string | null;
}

interface UmkmData {
    platforms: Platform[];
}

interface UmkmContextType {
    umkmData: UmkmData;
    taxFreeLimit: number;
    isLoading: boolean;
    setUmkmData: React.Dispatch<React.SetStateAction<UmkmData>>;
    handleOmzetChange: (platformName: string, newOmzet: string) => void;
    toggleConnection: (platformName: string) => void;
    addPlatform: (platformName: string) => void;
}

const initialData: UmkmData = {
    platforms: [],
};

const defaultData: UmkmData = {
     platforms: [
        { name: 'Shopee', omzet: 350181000, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        { name: 'Tokopedia', omzet: 306819000, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        { name: 'Lazada', omzet: 0, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
        { name: 'TikTok Shop', omzet: 0, connected: true, lastSync: format(new Date(), 'yyyy-MM-dd HH:mm:ss') },
    ],
}

const UmkmContext = createContext<UmkmContextType | undefined>(undefined);

export function UmkmProvider({ children }: { children: ReactNode }) {
    const [umkmData, setUmkmData] = useState<UmkmData>(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const taxFreeLimit = 500000000;

    useEffect(() => {
        // Simulate loading data. In a real app, this could be an API call.
        // Using setTimeout to ensure it happens after the initial render cycle.
        const timer = setTimeout(() => {
            setUmkmData(defaultData);
            setIsLoading(false);
        }, 1); // A minimal delay is enough to avoid race conditions.

        return () => clearTimeout(timer);
    }, []);

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
        setUmkmData,
        handleOmzetChange,
        toggleConnection,
        addPlatform
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [umkmData, isLoading]);

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