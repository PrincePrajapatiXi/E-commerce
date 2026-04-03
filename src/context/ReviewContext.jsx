import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error('useReviews must be used within ReviewProvider');
    }
    return context;
};

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('productReviews');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('productReviews', JSON.stringify(reviews));
    }, [reviews]);

    const addReview = (productId, review) => {
        setReviews(prev => {
            const productReviews = prev[productId] || [];
            const newReview = {
                id: Date.now().toString(),
                ...review,
                date: new Date().toISOString(),
                helpful: 0,
                unhelpful: 0,
            };
            return {
                ...prev,
                [productId]: [newReview, ...productReviews],
            };
        });
    };

    const getProductReviews = (productId) => {
        return reviews[productId] || [];
    };

    const getAverageRating = (productId) => {
        const productReviews = reviews[productId] || [];
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / productReviews.length).toFixed(1);
    };

    const getReviewCount = (productId) => {
        return (reviews[productId] || []).length;
    };

    const markHelpful = (productId, reviewId) => {
        setReviews(prev => ({
            ...prev,
            [productId]: (prev[productId] || []).map(r =>
                r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
            ),
        }));
    };

    const getRatingDistribution = (productId) => {
        const productReviews = reviews[productId] || [];
        const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        productReviews.forEach(r => {
            if (dist[r.rating] !== undefined) dist[r.rating]++;
        });
        return dist;
    };

    return (
        <ReviewContext.Provider value={{
            addReview,
            getProductReviews,
            getAverageRating,
            getReviewCount,
            markHelpful,
            getRatingDistribution,
        }}>
            {children}
        </ReviewContext.Provider>
    );
};
