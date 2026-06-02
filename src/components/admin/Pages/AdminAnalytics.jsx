'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    BarChart3, TrendingUp, Users, DollarSign, 
    ArrowUpRight, AlertCircle, Calendar,
    Activity
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { fetchAnalytics } from '@/redux/actions/analyticsActions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const AdminAnalytics = () => {
    const dispatch = useDispatch();
    const analyticsState = useSelector((state) => state.analytics || {});
    const { analytics, loading, error } = analyticsState;

    useEffect(() => {
        dispatch(fetchAnalytics());
    }, [dispatch]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatPercentage = (value) => {
        return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    const prepareRevenueChartData = () => {
        if (!analytics?.revenueByMonth) return null;

        const months = analytics.revenueByMonth.map(item => {
            const date = new Date(item._id.year, item._id.month - 1);
            return date.toLocaleDateString('en-US', { month: 'short' });
        });

        return {
            labels: months,
            datasets: [
                {
                    label: 'Revenue',
                    data: analytics.revenueByMonth.map(item => item.revenue),
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                },
                {
                    label: 'Orders',
                    data: analytics.revenueByMonth.map(item => item.orders),
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    yAxisID: 'orders',
                },
            ],
        };
    };

    const prepareOrdersStatusData = () => {
        if (!analytics?.ordersByStatus) return null;

        const statusColors = {
            'Delivered': '#10b981',
            'Processing': '#f59e0b',
            'Shipped': '#3b82f6',
            'Cancelled': '#ef4444',
            'Pending': '#6b7280'
        };

        return {
            labels: analytics.ordersByStatus.map(item => item._id),
            datasets: [
                {
                    data: analytics.ordersByStatus.map(item => item.count),
                    backgroundColor: analytics.ordersByStatus.map(item =>
                        statusColors[item._id] || '#6b7280'
                    ),
                    borderWidth: 2,
                    borderColor: '#ffffff',
                },
            ],
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        if (context.datasetIndex === 0) {
                            return `Revenue: ${formatCurrency(context.parsed.y)}`;
                        } else {
                            return `Orders: ${context.parsed.y}`;
                        }
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return formatCurrency(value);
                    }
                }
            },
            orders: {
                beginAtZero: true,
                position: 'right',
                ticks: {
                    callback: function(value) {
                        return value;
                    }
                },
                grid: {
                    drawOnChartArea: false,
                },
            }
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                }
            }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
                    <p className="text-slate-500">Overview of your store's performance metrics.</p>
                </div>
                <button 
                    onClick={() => dispatch(fetchAnalytics())}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium shadow-sm transition-colors"
                >
                    <Activity size={16} className="text-blue-600" />
                    Refresh Data
                </button>
            </div>

            {/* Error State */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 font-bold animate-shake">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-pulse h-32"></div>
                    ))
                ) : analytics && (
                    <>
                        {[
                            { label: 'Total Revenue', value: formatCurrency(analytics.revenue?.total || 0), change: formatPercentage(analytics.revenue?.growth || 0), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                            { label: 'Total Orders', value: analytics.orders?.total || 0, change: formatPercentage(analytics.orders?.growth || 0), icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-100' },
                            { label: 'Active Customers', value: analytics.customers?.total || 0, change: formatPercentage(analytics.customers?.growth || 0), icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
                            { label: 'Avg. Order Value', value: analytics.orders?.total > 0 ? formatCurrency((analytics.revenue?.total || 0) / analytics.orders.total) : formatCurrency(0), change: '+0.0%', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                        <stat.icon size={22} />
                                    </div>
                                    <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {stat.change} <ArrowUpRight size={12} className="ml-1" />
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Revenue & Orders Growth</h3>
                    <div className="h-80">
                        {analytics ? (
                            <Line data={prepareRevenueChartData()} options={chartOptions} />
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 italic">No chart data available</div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 mb-6">Order Status Distribution</h3>
                    <div className="h-80">
                        {analytics ? (
                            <Doughnut data={prepareOrdersStatusData()} options={doughnutOptions} />
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400 italic">No status data available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
