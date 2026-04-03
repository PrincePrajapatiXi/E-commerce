import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle, Truck, MapPin, ArrowLeft } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';

const statusIcons = {
    'Confirmed': CheckCircle,
    'Processing': Clock,
    'Shipped': Package,
    'Out for Delivery': Truck,
    'Delivered': MapPin,
};

const statusColors = {
    'Confirmed': 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
    'Processing': 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30',
    'Shipped': 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
    'Out for Delivery': 'text-orange-500 bg-orange-50 dark:bg-orange-900/30',
    'Delivered': 'text-green-500 bg-green-50 dark:bg-green-900/30',
};

const OrderHistory = () => {
    const { getAllOrders, ORDER_STATUSES } = useOrders();
    const orders = getAllOrders();

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric',
        });
    };

    const formatTime = (dateStr) => {
        return new Date(dateStr).toLocaleTimeString('en-IN', {
            hour: '2-digit', minute: '2-digit',
        });
    };

    const getStatusIndex = (status) => ORDER_STATUSES.indexOf(status);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors">
            <SEO title="My Orders - Catchy Electronics" description="Track your order history and status." />
            <div className="max-w-4xl mx-auto">
                <Breadcrumb items={[{ label: 'Account', link: '/account' }, { label: 'Orders' }]} />

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                    <Package className="text-primary" /> My Orders
                </h1>

                {orders.length === 0 ? (
                    <EmptyState type="orders" />
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => {
                            const StatusIcon = statusIcons[order.status] || Package;
                            const statusColor = statusColors[order.status] || '';
                            const statusIdx = getStatusIndex(order.status);

                            return (
                                <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-all hover:shadow-md">
                                    {/* Order Header */}
                                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <p className="text-sm font-mono text-gray-500 dark:text-gray-400">Order #{order.id}</p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                Placed on {formatDate(order.createdAt)} at {formatTime(order.createdAt)}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusColor}`}>
                                            <StatusIcon size={16} />
                                            {order.status}
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div className="px-6 py-4">
                                        <div className="flex flex-wrap gap-4 mb-4">
                                            {order.items?.slice(0, 3).map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <img
                                                        src={item.images?.[0]}
                                                        alt={item.name}
                                                        className="w-14 h-14 object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-1"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{item.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity} × ₹{item.price?.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            {order.items?.length > 3 && (
                                                <p className="text-xs text-gray-400 self-center">+{order.items.length - 3} more</p>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between mb-2">
                                                {ORDER_STATUSES.map((status, idx) => {
                                                    const Icon = statusIcons[status] || Package;
                                                    const isCompleted = idx <= statusIdx;
                                                    const isCurrent = idx === statusIdx;

                                                    return (
                                                        <div key={status} className="flex flex-col items-center flex-1">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                                                                isCompleted
                                                                    ? 'bg-primary text-white shadow-glow'
                                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                                            } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}>
                                                                <Icon size={14} />
                                                            </div>
                                                            <span className={`text-[10px] mt-1 text-center hidden sm:block ${isCompleted ? 'text-primary font-medium' : 'text-gray-400'}`}>
                                                                {status}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            {/* Line */}
                                            <div className="flex items-center -mt-[52px] sm:-mt-[52px] px-4 mb-8">
                                                {ORDER_STATUSES.slice(0, -1).map((_, idx) => (
                                                    <div key={idx} className={`flex-1 h-1 rounded-full mx-1 transition-all ${
                                                        idx < statusIdx ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                                                    }`} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                Total: ₹{order.total?.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                Est. delivery: {formatDate(order.estimatedDelivery)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
