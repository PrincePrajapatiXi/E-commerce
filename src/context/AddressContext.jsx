import React, { createContext, useContext, useState, useEffect } from 'react';

const AddressContext = createContext();

export const useAddresses = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddresses must be used within AddressProvider');
    }
    return context;
};

export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState(() => {
        const saved = localStorage.getItem('userAddresses');
        return saved ? JSON.parse(saved) : [];
    });

    const [defaultAddressId, setDefaultAddressId] = useState(() => {
        return localStorage.getItem('defaultAddressId') || null;
    });

    useEffect(() => {
        localStorage.setItem('userAddresses', JSON.stringify(addresses));
    }, [addresses]);

    useEffect(() => {
        if (defaultAddressId) {
            localStorage.setItem('defaultAddressId', defaultAddressId);
        }
    }, [defaultAddressId]);

    const addAddress = (address) => {
        const newAddress = {
            id: Date.now().toString(),
            ...address,
            createdAt: new Date().toISOString(),
        };
        setAddresses(prev => {
            const updated = [...prev, newAddress];
            if (updated.length === 1) {
                setDefaultAddressId(newAddress.id);
            }
            return updated;
        });
        return newAddress;
    };

    const updateAddress = (id, updatedData) => {
        setAddresses(prev => prev.map(addr =>
            addr.id === id ? { ...addr, ...updatedData } : addr
        ));
    };

    const deleteAddress = (id) => {
        setAddresses(prev => prev.filter(addr => addr.id !== id));
        if (defaultAddressId === id) {
            setDefaultAddressId(addresses.length > 1 ? addresses.find(a => a.id !== id)?.id : null);
        }
    };

    const setDefault = (id) => {
        setDefaultAddressId(id);
    };

    const getDefaultAddress = () => {
        return addresses.find(a => a.id === defaultAddressId) || addresses[0] || null;
    };

    return (
        <AddressContext.Provider value={{
            addresses,
            defaultAddressId,
            addAddress,
            updateAddress,
            deleteAddress,
            setDefault,
            getDefaultAddress,
        }}>
            {children}
        </AddressContext.Provider>
    );
};
