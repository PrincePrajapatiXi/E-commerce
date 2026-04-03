import React, { useState } from 'react';
import { Star, ThumbsUp, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ReviewSection = ({ productId }) => {
    const { addReview, getProductReviews, getAverageRating, getReviewCount, markHelpful, getRatingDistribution } = useReviews();
    const { user } = useAuth();
    const { success, error: showError } = useToast();

    const [showForm, setShowForm] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const reviews = getProductReviews(productId);
    const avgRating = getAverageRating(productId);
    const reviewCount = getReviewCount(productId);
    const distribution = getRatingDistribution(productId);
    const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            showError('Please select a rating');
            return;
        }
        if (!comment.trim()) {
            showError('Please write a review');
            return;
        }

        addReview(productId, {
            rating,
            title: title.trim() || 'Great product!',
            comment: comment.trim(),
            userName: user?.displayName || 'Anonymous',
            userImage: user?.imageUrl || null,
            verified: !!user,
        });

        setRating(0);
        setTitle('');
        setComment('');
        setShowForm(false);
        success('Review submitted successfully! 🎉');
    };

    const renderStars = (count, size = 16, interactive = false) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={size}
                        className={`transition-colors duration-150 ${
                            star <= (interactive ? (hoverRating || rating) : count)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300 dark:text-gray-600'
                        } ${interactive ? 'cursor-pointer hover:scale-110 transform transition-transform' : ''}`}
                        onClick={interactive ? () => setRating(star) : undefined}
                        onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
                        onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const maxDist = Math.max(...Object.values(distribution), 1);

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Customer Reviews
            </h2>

            {/* Rating Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Average Rating */}
                <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                        {reviewCount > 0 ? avgRating : '—'}
                    </div>
                    {renderStars(Math.round(avgRating), 24)}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                    </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 dark:text-gray-400 w-8 text-right">{star} ★</span>
                            <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                                    style={{ width: `${(distribution[star] / maxDist) * 100}%` }}
                                />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 w-8">{distribution[star]}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Write Review Button */}
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-6 bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold hover:shadow-glow transition-all transform hover:-translate-y-0.5"
            >
                {showForm ? 'Cancel' : '✍️ Write a Review'}
            </button>

            {/* Review Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 mb-8 animate-fadeIn">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Share your experience</h3>

                    {/* Rating Selector */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Rating *
                        </label>
                        {renderStars(rating, 32, true)}
                        {rating > 0 && (
                            <span className="text-sm text-primary mt-1 inline-block">
                                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Review Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Sum up your experience..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Comment */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Your Review *
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What did you like or dislike? How was the quality?..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-gradient-primary text-white px-8 py-3 rounded-xl font-semibold hover:shadow-glow transition-all transform hover:-translate-y-0.5"
                    >
                        Submit Review
                    </button>
                </form>
            )}

            {/* Reviews List */}
            {reviews.length > 0 ? (
                <div className="space-y-6">
                    {displayedReviews.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md">
                            <div className="flex items-start gap-4">
                                {/* User Avatar */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm overflow-hidden">
                                    {review.userImage ? (
                                        <img src={review.userImage} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={18} />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    {/* Name + Rating */}
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                            {review.userName}
                                        </span>
                                        {review.verified && (
                                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>

                                    {/* Stars + Date */}
                                    <div className="flex items-center gap-3 mb-2">
                                        {renderStars(review.rating, 14)}
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {formatDate(review.date)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    {review.title && (
                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                                            {review.title}
                                        </h4>
                                    )}

                                    {/* Comment */}
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>

                                    {/* Helpful */}
                                    <button
                                        onClick={() => markHelpful(productId, review.id)}
                                        className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition-colors group"
                                    >
                                        <ThumbsUp size={14} className="group-hover:fill-primary/20" />
                                        Helpful ({review.helpful})
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Show More/Less */}
                    {reviews.length > 3 && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="w-full py-3 text-primary hover:text-orange-600 font-medium flex items-center justify-center gap-1 transition-colors"
                        >
                            {showAll ? (
                                <><ChevronUp size={18} /> Show Less</>
                            ) : (
                                <><ChevronDown size={18} /> Show All {reviews.length} Reviews</>
                            )}
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/30 rounded-2xl">
                    <Star size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No reviews yet</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Be the first to review this product!</p>
                </div>
            )}
        </div>
    );
};

export default ReviewSection;
