'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import {
    Plus, Search, Trash2, Edit, X, Save,
    Image as ImageIcon, Tag, DollarSign,
    AlignLeft, Microscope, Layers, AlertCircle,
    CheckCircle2, ArrowUpRight, Package,
    Filter, MoreVertical, ChevronRight,
    Download, Upload, ShoppingCart,
    Eye, Trash, Activity
} from 'lucide-react';
import {
    listProducts,
    deleteProduct,
    createProduct,
    updateProduct
} from '@/redux/actions/productActions';
import { listCategories } from '@/redux/actions/categoryActions';
import { PRODUCT_CREATE_RESET, PRODUCT_UPDATE_RESET } from '@/redux/constants/productConstants';
import ConfirmModal from '@/components/common/ConfirmModal';
import axios from 'axios';

const TECHNOLOGY_OPTIONS = ["Inkjet", "Laser", "Laser (B/W)"];
const USAGE_CATEGORY_OPTIONS = ["Home", "Office", "Mobile", "Photo"];
const ALL_IN_ONE_OPTIONS = ["Multifunction", "Single Function"];
const WIRELESS_OPTIONS = ["Yes", "No"];
const MAIN_FUNCTION_OPTIONS = ["Print", "Scan", "Copy", "Fax", "Print Only"];

const AdminProducts = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages, total } = productList;

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const [allProducts, setAllProducts] = useState([]);
    
    useEffect(() => {
        if (products) {
            if (page === 1) {
                setAllProducts(products);
            } else {
                setAllProducts(prev => {
                    const safePrev = Array.isArray(prev) ? prev : [];
                    const existingIds = new Set(safePrev.map(p => p._id));
                    const newProducts = products.filter(p => !existingIds.has(p._id));
                    return [...safePrev, ...newProducts];
                });
            }
        }
    }, [products, page]);

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, success: successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, success: successCreate } = productCreate;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { loading: loadingUpdate, success: successUpdate } = productUpdate;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
    const [bulkFile, setBulkFile] = useState(null);
    const [bulkUploadLoading, setBulkUploadLoading] = useState(false);
    const [bulkUploadMessage, setBulkUploadMessage] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const initialFormState = {
        technology: [],
        usageCategory: [],
        allInOneType: [],
        wireless: '',
        mainFunction: [],
        brand: '',
        title: '',
        category: '',
        price: '',
        oldPrice: '',
        countInStock: '',
        description: '',
        shortDetails: '', // Highlights
        shortSpecification: '', // Keywords
        overview: '',
        technicalSpecification: '',
        color: '',
        width: '',
        height: '',
        depth: '',
        screenSize: '',
        images: [],
        reviews: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [specType, setSpecType] = useState('text');
    const [specRows, setSpecRows] = useState([{ id: Date.now(), key: '', value: '' }]);

    useEffect(() => {
        dispatch(listCategories());

        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            closeForm();
            dispatch(listProducts(searchTerm, '', 1));
        }

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            closeForm();
            dispatch(listProducts(searchTerm, '', 1));
        }

        if (successDelete) {
            dispatch(listProducts(searchTerm, '', 1));
        }
    }, [dispatch, successCreate, successUpdate, successDelete]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setAllProducts([]);
            dispatch(listProducts(searchTerm, '', 1));
        }, 500);
        return () => clearTimeout(handler);
    }, [dispatch, searchTerm]);

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
        setFormData(initialFormState);
        setPreviewImages([]);
        setSelectedFiles([]);
        setSpecRows([{ id: Date.now(), key: '', value: '' }]);
        setSpecType('text');
    };

    const ARRAY_FIELDS = ['technology', 'usageCategory', 'allInOneType', 'mainFunction'];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && ARRAY_FIELDS.includes(name)) {
            setFormData(prev => {
                const current = Array.isArray(prev[name]) ? prev[name] : [];
                if (checked) {
                    return { ...prev, [name]: [...current, value] };
                } else {
                    return { ...prev, [name]: current.filter(v => v !== value) };
                }
            });
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleQuillChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        if (index >= formData.images.length) {
            const fileIndex = index - formData.images.length;
            setSelectedFiles(prev => prev.filter((_, i) => i !== fileIndex));
        } else {
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        }
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleReviewChange = (index, field, value) => {
        const newReviews = [...formData.reviews];
        newReviews[index] = { ...newReviews[index], [field]: value };
        setFormData(prev => ({ ...prev, reviews: newReviews }));
    };

    const addReview = () => {
        setFormData(prev => ({
            ...prev,
            reviews: [...prev.reviews, { name: '', avatar: '', rating: 5, comment: '' }]
        }));
    };

    const removeReview = (index) => {
        setFormData(prev => ({
            ...prev,
            reviews: prev.reviews.filter((_, i) => i !== index)
        }));
    };

    const handleEdit = (product) => {
        setEditingId(product._id);
        const techSpec = product.technicalSpecification || '';

        setFormData({
            technology: Array.isArray(product.technology) ? product.technology : [],
            usageCategory: Array.isArray(product.usageCategory) ? product.usageCategory : [],
            allInOneType: Array.isArray(product.allInOneType) ? product.allInOneType : [],
            wireless: typeof product.wireless === 'string' ? product.wireless : '',
            mainFunction: Array.isArray(product.mainFunction) ? product.mainFunction : [],
            brand: product.brand || '',
            title: product.title || '',
            category: product.category?._id || product.category || '',
            price: product.price || '',
            oldPrice: product.oldPrice || '',
            countInStock: product.countInStock || '',
            description: product.description || '',
            shortDetails: product.shortDetails || '',
            shortSpecification: product.shortSpecification || '',
            overview: product.overview || '',
            technicalSpecification: techSpec,
            color: product.color || '',
            width: product.width || '',
            height: product.height || '',
            depth: product.depth || '',
            screenSize: product.screenSize || '',
            images: product.images || [],
            reviews: product.reviews || []
        });

        if (techSpec.includes('<table') && techSpec.includes('<tr')) {
            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(techSpec, 'text/html');
                const rows = Array.from(doc.querySelectorAll('tr'));
                const parsedRows = rows.map((row, index) => {
                    const cells = row.querySelectorAll('td');
                    if (cells.length >= 2) {
                        return { id: Date.now() + index, key: cells[0].textContent, value: cells[1].textContent };
                    }
                    return null;
                }).filter(row => row !== null);

                if (parsedRows.length > 0) {
                    setSpecRows(parsedRows);
                    setSpecType('table');
                } else {
                    setSpecType('text');
                    setSpecRows([{ id: Date.now(), key: '', value: '' }]);
                }
            } catch (e) {
                setSpecType('text');
                setSpecRows([{ id: Date.now(), key: '', value: '' }]);
            }
        } else {
            try {
                const parsedJson = JSON.parse(techSpec);
                if (Array.isArray(parsedJson) && parsedJson.length > 0) {
                    const mappedRows = parsedJson.map((item, index) => ({
                        id: Date.now() + index,
                        key: item.name || item.key || '',
                        value: item.value || ''
                    }));
                    setSpecRows(mappedRows);
                    setSpecType('table');
                } else {
                    setSpecType('text');
                    setSpecRows([{ id: Date.now(), key: '', value: '' }]);
                }
            } catch (e) {
                setSpecType('text');
                setSpecRows([{ id: Date.now(), key: '', value: '' }]);
            }
        }

        setPreviewImages(product.images || []);
        setSelectedFiles([]);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteProduct(itemToDelete));
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const addSpecRow = () => {
        setSpecRows([...specRows, { id: Date.now(), key: '', value: '' }]);
    };

    const removeSpecRow = (id) => {
        setSpecRows(specRows.filter(row => row.id !== id));
    };

    const updateSpecRow = (id, field, value) => {
        setSpecRows(specRows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        let finalTechSpecs = formData.technicalSpecification;
        if (specType === 'table') {
            const tableRows = specRows.filter(r => r.key && r.value).map(r => 
                `<tr class="border-b border-slate-100">
                    <td class="py-3 pr-4 font-bold text-slate-900 uppercase text-xs w-1/3">${r.key}</td>
                    <td class="py-3 text-slate-600 text-sm">${r.value}</td>
                </tr>`
            ).join('');
            finalTechSpecs = `<table class="w-full text-left border-collapse"><tbody>${tableRows}</tbody></table>`;
        }

        Object.keys(formData).forEach(key => {
            if (key === 'images') {
                data.append('existingImages', JSON.stringify(formData.images));
            } else if (key === 'reviews') {
                data.append('reviews', JSON.stringify(formData.reviews));
            } else if (key === 'technicalSpecification') {
                data.append('technicalSpecification', finalTechSpecs);
            } else if (ARRAY_FIELDS.includes(key)) {
                data.append(key, JSON.stringify(Array.isArray(formData[key]) ? formData[key] : []));
            } else {
                data.append(key, formData[key]);
            }
        });

        selectedFiles.forEach(file => data.append('images', file));

        if (editingId) {
            dispatch(updateProduct(editingId, data));
        } else {
            dispatch(createProduct(data));
        }
    };

    const handleBulkUpload = async (e) => {
        e.preventDefault();
        if (!bulkFile) {
            setBulkUploadMessage('Please select a file');
            return;
        }
        setBulkUploadLoading(true);
        const formData = new FormData();
        formData.append('excelFile', bulkFile);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`,
                },
            };
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
            const { data } = await axios.post(`${baseUrl}/products/bulk-upload`, formData, config);
            setBulkUploadMessage(data.message);
            dispatch(listProducts());
            setBulkFile(null);
        } catch (error) {
            setBulkUploadMessage(error.response?.data?.message || 'Upload failed');
        } finally {
            setBulkUploadLoading(false);
        }
    };

    const handleLoadMore = () => {
        if (page < pages && !loading) {
            dispatch(listProducts(searchTerm, '', page + 1));
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="Critical Operation"
                message="You are about to permanently purge this asset from the global catalog. This action cannot be reversed."
                loading={loadingDelete}
            />
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Product Catalog
                        <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-widest shadow-lg shadow-blue-600/20">Live Inventory</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm">Manage, curate and expand your printing solutions.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search Model, SKU, Brand..."
                            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-bold text-sm shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsBulkUploadOpen(true)}
                        className="p-4 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all shadow-sm active:scale-95 group/bulk"
                        title="Bulk Import"
                    >
                        <Upload size={22} className="group-hover/bulk:translate-y-[-2px] transition-transform" />
                    </button>
                    <button 
                        onClick={() => setIsFormOpen(true)}
                        className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3"
                    >
                        <Plus size={18} strokeWidth={3} />
                        Initialize Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Assets', value: total || 0, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'In Stock', value: allProducts.filter(p => p.countInStock > 0).length, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Out of Stock', value: allProducts.filter(p => p.countInStock === 0).length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Categories', value: categories?.length || 0, icon: Layers, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group/stat">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 shadow-sm group-hover/stat:scale-110 transition-transform`}>
                            <stat.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-900 tabular-nums">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
                <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
                    <div>
                        <h2 className="font-black text-xl text-slate-900 tracking-tight">Inventory Records</h2>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{total || allProducts.length} items currently indexed in system.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                            <CheckCircle2 size={14} className="animate-pulse" /> System Synced
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identification</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Valuation</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Availability</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading && page === 1 ? (
                                <tr><td colSpan="6" className="py-32 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse italic">Synchronizing Data...</td></tr>
                            ) : allProducts.length === 0 ? (
                                <tr><td colSpan="6" className="py-32 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">Inventory Empty</td></tr>
                            ) : allProducts.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50/80 transition-all duration-300 group">
                                    <td className="px-8 py-6">
                                        <div className="w-20 h-20 bg-white border border-slate-100 rounded-2xl p-2 overflow-hidden shadow-sm group-hover:scale-110 transition-transform flex items-center justify-center">
                                            <img 
                                                src={product.images?.[0] || 'https://via.placeholder.com/150'} 
                                                alt={product.title} 
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1.5 max-w-xs">
                                            <span className="font-black text-sm text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                                {product.title}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.brand || 'PRINTSCARTS'}</span>
                                                <span className="w-1.5 h-1.5 bg-slate-100 rounded-full"></span>
                                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-1.5 rounded">SKU: {product._id.substring(product._id.length - 6).toUpperCase()}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/50">
                                            {product.category?.name || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-lg text-slate-900 tabular-nums">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                            {product.oldPrice && (
                                                <span className="text-[10px] font-bold text-slate-400 line-through mt-0.5">${product.oldPrice.toLocaleString()}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-2">
                                            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${product.countInStock > 10 ? 'text-emerald-600' : product.countInStock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                                                <div className={`w-2 h-2 rounded-full ${product.countInStock > 10 ? 'bg-emerald-500 animate-pulse' : product.countInStock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                                                {product.countInStock > 0 ? `${product.countInStock} In Unit` : 'Depleted'}
                                            </div>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                    className={`h-full transition-all duration-1000 ${product.countInStock > 10 ? 'bg-emerald-500' : product.countInStock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${Math.min(100, (product.countInStock / 20) * 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleEdit(product)}
                                                className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90 group/edit"
                                                title="Edit Asset"
                                            >
                                                <Edit size={18} className="group-hover/edit:rotate-12 transition-transform" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product._id)}
                                                className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-90 group/del"
                                                title="Delete Asset"
                                            >
                                                <Trash2 size={18} className="group-hover/del:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {loading && page > 1 && (
                    <div className="p-8 border-t border-slate-50 flex justify-center sticky bottom-0 bg-white/95 backdrop-blur-md z-10 gap-3">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-slate-900 font-black uppercase tracking-widest text-[10px]">Fetching Archives...</span>
                    </div>
                )}

                {page < pages && !loading && (
                    <div className="p-10 border-t border-slate-50 flex justify-center bg-slate-50/30">
                        <button 
                            onClick={handleLoadMore}
                            className="px-10 py-4 bg-slate-900 text-white hover:bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3"
                        >
                           Expand Catalog
                           <Plus size={16} strokeWidth={3} />
                        </button>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={closeForm}></div>
                    <div className="relative w-full max-w-6xl bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 shrink-0">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{editingId ? 'Edit Product Asset' : 'Initialize New Asset'}</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configure system specifications and valuation</p>
                            </div>
                            <button onClick={closeForm} className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl transition-all active:scale-95 shadow-sm">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                            <form id="productForm" onSubmit={handleSubmit} className="space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                                <Tag size={16} />
                                            </div>
                                            <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">Core Identity</h3>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            {/* Structured Attributes Section */}
                                            <div className="col-span-2 space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technology</label>
                                                <div className="flex flex-wrap gap-3 mt-1">
                                                    {TECHNOLOGY_OPTIONS.map(opt => (
                                                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                name="technology"
                                                                value={opt}
                                                                checked={Array.isArray(formData.technology) && formData.technology.includes(opt)}
                                                                onChange={handleInputChange}
                                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <span className="text-xs font-bold text-slate-700">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                                
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Usage Category</label>
                                                <div className="flex flex-wrap gap-3 mt-1">
                                                    {USAGE_CATEGORY_OPTIONS.map(opt => (
                                                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                name="usageCategory"
                                                                value={opt}
                                                                checked={Array.isArray(formData.usageCategory) && formData.usageCategory.includes(opt)}
                                                                onChange={handleInputChange}
                                                                className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                            />
                                                            <span className="text-xs font-bold text-slate-700">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>

                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">All-in-One Type</label>
                                                <div className="flex flex-wrap gap-3 mt-1">
                                                    {ALL_IN_ONE_OPTIONS.map(opt => (
                                                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                name="allInOneType"
                                                                value={opt}
                                                                checked={Array.isArray(formData.allInOneType) && formData.allInOneType.includes(opt)}
                                                                onChange={handleInputChange}
                                                                className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                                                            />
                                                            <span className="text-xs font-bold text-slate-700">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>

                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Main Function</label>
                                                <div className="flex flex-wrap gap-3 mt-1">
                                                    {MAIN_FUNCTION_OPTIONS.map(opt => (
                                                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                name="mainFunction"
                                                                value={opt}
                                                                checked={Array.isArray(formData.mainFunction) && formData.mainFunction.includes(opt)}
                                                                onChange={handleInputChange}
                                                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                            />
                                                            <span className="text-xs font-bold text-slate-700">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Wireless Capability</label>
                                                    <select
                                                        name="wireless"
                                                        value={formData.wireless}
                                                        onChange={handleInputChange}
                                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all appearance-none shadow-sm"
                                                    >
                                                        <option value="">Select Option</option>
                                                        {WIRELESS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand Entity</label>
                                                    <input 
                                                        name="brand" value={formData.brand} onChange={handleInputChange} required
                                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                                                        placeholder="e.g. HP, Canon"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System Domain</label>
                                                    <select 
                                                        name="category" value={formData.category} onChange={handleInputChange} required
                                                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all appearance-none shadow-sm"
                                                    >
                                                        <option value="">Select Domain</option>
                                                        {categories?.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Asset Model Name</label>
                                                <input 
                                                    name="title" value={formData.title} onChange={handleInputChange} required
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                                                    placeholder="Product Title"
                                                />
                                            </div>

                                            <div className="space-y-6 pt-4">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                                                        <Activity size={16} />
                                                    </div>
                                                    <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">Physical Specs</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Color</label>
                                                        <input 
                                                            name="color" value={formData.color} onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/10 outline-none"
                                                            placeholder="e.g. White"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Screen Size</label>
                                                        <input 
                                                            name="screenSize" value={formData.screenSize} onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/10 outline-none"
                                                            placeholder="e.g. 2.7 inch"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Width</label>
                                                        <input 
                                                            name="width" value={formData.width} onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/10 outline-none"
                                                            placeholder="Width"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Height</label>
                                                        <input 
                                                            name="height" value={formData.height} onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/10 outline-none"
                                                            placeholder="Height"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Depth</label>
                                                        <input 
                                                            name="depth" value={formData.depth} onChange={handleInputChange}
                                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/10 outline-none"
                                                            placeholder="Depth"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                                <DollarSign size={16} />
                                            </div>
                                            <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">Valuation & Units</h3>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="space-y-2 col-span-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price ($)</label>
                                                <input 
                                                    type="number" name="price" value={formData.price} onChange={handleInputChange} required
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2 col-span-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">MSRP ($)</label>
                                                <input 
                                                    type="number" name="oldPrice" value={formData.oldPrice} onChange={handleInputChange}
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                                                />
                                            </div>
                                            <div className="space-y-2 col-span-1">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Units</label>
                                                <input 
                                                    type="number" name="countInStock" value={formData.countInStock} onChange={handleInputChange} required
                                                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6 pt-10">
                                            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Tag size={18} /></div>
                                                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Reviews & Testimonials</h4>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={addReview}
                                                    className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-[10px] font-black transition-all shadow-lg shadow-pink-100 uppercase tracking-widest"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                    Add Node
                                                </button>
                                            </div>

                                            <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                                {formData.reviews.map((review, index) => (
                                                    <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 relative group animate-in slide-in-from-right-4 duration-300">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeReview(index)}
                                                            className="absolute -top-2 -right-2 p-2 bg-white text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all border border-slate-100"
                                                        >
                                                            <X size={16} />
                                                        </button>

                                                        <div className="grid grid-cols-1 gap-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reviewer Name</label>
                                                                    <input
                                                                        type="text"
                                                                        value={review.name}
                                                                        onChange={(e) => handleReviewChange(index, 'name', e.target.value)}
                                                                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20 outline-none"
                                                                        placeholder="Name"
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className="space-y-1">
                                                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rating (1-5)</label>
                                                                    <select
                                                                        value={review.rating}
                                                                        onChange={(e) => handleReviewChange(index, 'rating', Number(e.target.value))}
                                                                        className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20 outline-none"
                                                                    >
                                                                        {[5, 4, 3, 2, 1].map(num => (
                                                                            <option key={num} value={num}>{num} Stars</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Feedback Message</label>
                                                                <textarea
                                                                    value={review.comment}
                                                                    onChange={(e) => handleReviewChange(index, 'comment', e.target.value)}
                                                                    className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-pink-500/20 outline-none resize-none"
                                                                    rows="2"
                                                                    placeholder="Message"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {formData.reviews.length === 0 && (
                                                    <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center">
                                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No active reviews linked.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                                            <ImageIcon size={16} />
                                        </div>
                                        <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">Visual Assets</h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                                        {previewImages.map((url, index) => (
                                            <div key={index} className="group relative aspect-square bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 p-2 hover:border-blue-400 transition-all shadow-sm">
                                                <img src={url} alt="Preview" className="w-full h-full object-contain rounded-2xl" />
                                                <button 
                                                    type="button" onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                                                >
                                                    <X size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                        ))}
                                        <label className="aspect-square bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white hover:border-blue-400 hover:text-blue-600 transition-all group">
                                            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                                                <Plus size={24} />
                                            </div>
                                            <span className="text-[9px] font-black uppercase tracking-widest">Inject Media</span>
                                            <input type="file" multiple onChange={handleFileChange} className="hidden" />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">KEYWORDS</label>
                                            <div className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
                                                <ReactQuill 
                                                    value={formData.shortSpecification} 
                                                    onChange={(val) => handleQuillChange('shortSpecification', val)}
                                                    theme="snow"
                                                    className="border-none"
                                                    placeholder="Keywords for indexing..."
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">HIGHLIGHTS</label>
                                            <div className="bg-white border border-slate-200 rounded-[1.5rem] overflow-hidden shadow-sm">
                                                <ReactQuill 
                                                    value={formData.shortDetails} 
                                                    onChange={(val) => handleQuillChange('shortDetails', val)}
                                                    theme="snow"
                                                    className="border-none"
                                                    placeholder="Key product highlights..."
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 lg:col-span-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">Full Narrative Overview</label>
                                            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                                                <ReactQuill 
                                                    value={formData.overview} 
                                                    onChange={(val) => handleQuillChange('overview', val)}
                                                    theme="snow"
                                                    className="border-none"
                                                    placeholder="Detailed narrative description..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 block">About this product</label>
                                        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                                            <ReactQuill 
                                                value={formData.description} 
                                                onChange={(val) => handleQuillChange('description', val)}
                                                theme="snow"
                                                className="border-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                                                <Microscope size={16} />
                                            </div>
                                            <h3 className="font-black text-xs text-slate-900 uppercase tracking-[0.2em]">TECHNICAL SPECIFICATION</h3>
                                        </div>
                                        <div className="flex bg-slate-100 p-1 rounded-xl">
                                            <button 
                                                type="button" onClick={() => setSpecType('text')}
                                                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${specType === 'text' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                                            >
                                                Text Editor
                                            </button>
                                            <button 
                                                type="button" onClick={() => setSpecType('table')}
                                                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${specType === 'table' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                                            >
                                                Table Builder
                                            </button>
                                        </div>
                                    </div>

                                    {specType === 'text' ? (
                                        <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                                            <ReactQuill 
                                                value={formData.technicalSpecification} 
                                                onChange={(val) => handleQuillChange('technicalSpecification', val)}
                                                theme="snow"
                                                className="border-none"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-4 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
                                            {specRows.map((row) => (
                                                <div key={row.id} className="flex gap-4 group animate-in slide-in-from-left-4 duration-300 items-center">
                                                    <input 
                                                        placeholder="Property Name"
                                                        value={row.key}
                                                        onChange={(e) => updateSpecRow(row.id, 'key', e.target.value)}
                                                        className="flex-1 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm"
                                                    />
                                                    <input 
                                                        placeholder="Value"
                                                        value={row.value}
                                                        onChange={(e) => updateSpecRow(row.id, 'value', e.target.value)}
                                                        className="flex-1 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all shadow-sm"
                                                    />
                                                    <button 
                                                        type="button" onClick={() => removeSpecRow(row.id)}
                                                        className="p-3.5 bg-white border border-slate-100 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm group/del"
                                                    >
                                                        <X size={18} className="group-hover/del:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button 
                                                type="button" onClick={addSpecRow}
                                                className="w-full py-5 border-2 border-dashed border-slate-200 text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
                                            >
                                                <Plus size={16} className="group-hover:scale-125 transition-transform" /> Append Specification Node
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>

                        <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex justify-end gap-4 shrink-0">
                            <button 
                                onClick={closeForm}
                                className="px-8 py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-slate-900 transition-colors"
                            >
                                Abort Transaction
                            </button>
                            <button 
                                onClick={handleSubmit} disabled={loadingCreate || loadingUpdate}
                                className="px-12 py-5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50 flex items-center gap-3"
                            >
                                {loadingCreate || loadingUpdate ? (
                                    <> <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing... </>
                                ) : (
                                    <> <CheckCircle2 size={18} /> {editingId ? 'Confirm Modification' : 'Commit Asset'} </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isBulkUploadOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsBulkUploadOpen(false)}></div>
                    <div className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl border border-white/20 p-12 animate-in zoom-in-95 duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
                        <div className="text-center space-y-4 mb-10 relative z-10">
                            <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-slate-900/20">
                                <Upload size={32} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Bulk Inventory Injection</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Import Excel/CSV Manifest</p>
                            </div>
                        </div>

                        <form onSubmit={handleBulkUpload} className="space-y-8 relative z-10">
                            <div className="relative">
                                <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-slate-200 rounded-[2.5rem] cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all group">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <div className="p-5 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                            <Activity className="text-blue-500" size={32} />
                                        </div>
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
                                            {bulkFile ? bulkFile.name : 'Select Manifest File'}
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">XLSX or XLS only</p>
                                    </div>
                                    <input type="file" className="hidden" accept=".xlsx,.xls" onChange={(e) => setBulkFile(e.target.files[0])} />
                                </label>
                            </div>

                            {bulkUploadMessage && (
                                <div className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-sm ${bulkUploadMessage.includes('Success') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                    {bulkUploadMessage}
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <button 
                                    type="submit" disabled={!bulkFile || bulkUploadLoading}
                                    className="w-full py-5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                                >
                                    {bulkUploadLoading ? 'Processing Data...' : 'Execute Injection'}
                                </button>
                                <button 
                                    type="button" onClick={() => setIsBulkUploadOpen(false)}
                                    className="w-full py-5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
