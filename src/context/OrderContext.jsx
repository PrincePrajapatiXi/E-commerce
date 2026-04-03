import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
};

const generateOrderId = () => {
    const prefix = 'CTY';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
};

const ORDER_STATUSES = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('userOrders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('userOrders', JSON.stringify(orders));
    }, [orders]);

    const createOrder = (orderData) => {
        const newOrder = {
            id: generateOrderId(),
            ...orderData,
            status: 'Confirmed',
            statusHistory: [
                { status: 'Confirmed', date: new Date().toISOString(), description: 'Order has been placed successfully' },
            ],
            createdAt: new Date().toISOString(),
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    const getOrder = (orderId) => {
        return orders.find(o => o.id === orderId);
    };

    const getAllOrders = () => orders;

    const getRecentOrders = (limit = 5) => orders.slice(0, limit);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                return {
                    ...order,
                    status: newStatus,
                    statusHistory: [
                        ...order.statusHistory,
                        { status: newStatus, date: new Date().toISOString(), description: `Order ${newStatus.toLowerCase()}` },
                    ],
                };
            }
            return order;
        }));
    };

    return (
        <OrderContext.Provider value={{
            orders,
            createOrder,
            getOrder,
            getAllOrders,
            getRecentOrders,
            updateOrderStatus,
            ORDER_STATUSES,
        }}>
            {children}
        </OrderContext.Provider>
    );
};
