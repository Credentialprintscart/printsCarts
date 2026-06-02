'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Search, Layers, Trash2, Edit, X, Save, AlertCircle, CheckCircle2, MoreVertical, ChevronRight, Hash } from 'lucide-react';
import {
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from '@/redux/actions/categoryActions';
import { CATEGORY_CREATE_RESET, CATEGORY_UPDATE_RESET } from '@/redux/constants/categoryConstants';
import ConfirmModal from '@/components/common/ConfirmModal';

const AdminCategories = () => {
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate;

    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

    const categoryDelete = useSelector((state) => state.categoryDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [name, setName] = useState('');

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        dispatch(listCategories());

        if (successCreate) {
            dispatch({ type: CATEGORY_CREATE_RESET });
            setIsFormOpen(false);
            setName('');
        }

        if (successUpdate) {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            setIsFormOpen(false);
            setEditingId(null);
            setName('');
        }

        if (successDelete) {
            dispatch(listCategories());
        }
    }, [dispatch, successCreate, successUpdate, successDelete]);

    const handleAddNew = () => {
        setEditingId(null);
        setName('');
        setIsFormOpen(true);
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setName(category.name);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteCategory(itemToDelete));
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            dispatch(updateCategory(editingId, { name }));
        } else {
            dispatch(createCategory({ name }));
        }
    };

    const filteredCategories = categories?.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <ConfirmModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteHandler}
                title="System Deletion"
                message="Are you certain you want to remove this category? All products linked to this category may appear as 'Uncategorized'."
                loading={loadingDelete}
            />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Category Domains
                        <span className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded uppercase tracking-widest shadow-lg shadow-blue-600/20">Taxonomy</span>
                    </h1>
                    <p className="text-slate-400 font-bold text-sm">Organize and structure your system architecture.</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search classifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all font-bold text-sm shadow-sm"
                        />
                    </div>

                    {!isFormOpen && (
                        <button
                            onClick={handleAddNew}
                            className="px-8 py-4 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3"
                        >
                            <Plus size={18} strokeWidth={3} />
                            Append Category
                        </button>
                    )}
                </div>
            </div>

            {(errorDelete || errorCreate || errorUpdate) && (
                <div className="p-5 bg-red-50 text-red-600 rounded-2xl flex items-center gap-4 border border-red-100 animate-in slide-in-from-top-4 duration-300">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><AlertCircle size={20} /></div>
                    <span className="font-black text-xs uppercase tracking-widest">{errorDelete || errorCreate || errorUpdate}</span>
                </div>
            )}
            
            {successDelete && (
                <div className="p-5 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center gap-4 border border-emerald-100 animate-in slide-in-from-top-4 duration-300">
                    <div className="p-2 bg-white rounded-lg shadow-sm"><CheckCircle2 size={20} /></div>
                    <span className="font-black text-xs uppercase tracking-widest">Classification removed from system registry</span>
                </div>
            )}

            {/* Category Input Form */}
            {isFormOpen && (
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="bg-slate-900 px-8 py-6 flex justify-between items-center relative z-10">
                        <div>
                            <h3 className="font-black text-white flex items-center gap-3 uppercase tracking-widest text-sm">
                                <div className="p-1.5 bg-blue-500/20 rounded-lg"><Layers size={18} className="text-blue-400" /></div>
                                {editingId ? 'Modify Classification' : 'Initialize Category'}
                            </h3>
                        </div>
                        <button onClick={() => setIsFormOpen(false)} className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="p-10 relative z-10">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Classification Name (Public Title)</label>
                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="flex-1 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none text-lg font-black text-slate-800 transition-all shadow-sm"
                                    placeholder="Enter category nomenclature..."
                                    required
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={loadingCreate || loadingUpdate}
                                    className="px-10 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                                >
                                    {loadingCreate || loadingUpdate ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <Save size={20} />
                                    )}
                                    {loadingCreate || loadingUpdate ? 'Processing...' : 'Execute Commit'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* Classification Repository */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/20">
                <div className="bg-slate-50/30 border-b border-slate-100 px-10 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-900/10">
                            <Layers size={22} />
                        </div>
                        <div>
                            <span className="font-black text-slate-900 uppercase tracking-widest text-sm">System Repository</span>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Active Classifications</p>
                        </div>
                    </div>
                    <span className="bg-white border border-slate-200 text-slate-600 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {categories?.length || 0} Registered
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Node ID</th>
                                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Domain Title</th>
                                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan="3" className="py-24 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse italic">Scanning Data Nodes...</td></tr>
                            ) : filteredCategories?.length === 0 ? (
                                <tr><td colSpan="3" className="py-24 text-center text-slate-300 text-[10px] font-black uppercase tracking-[0.4em]">No Records Identified</td></tr>
                            ) : (
                                filteredCategories.map((category) => (
                                    <tr key={category._id} className="hover:bg-slate-50/80 transition-all duration-300 group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                                                    <Hash size={18} />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest tabular-nums">
                                                    #{category._id.substring(category._id.length - 8).toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="font-black text-slate-900 tracking-tight text-lg group-hover:text-blue-600 transition-colors">
                                                {category.name}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-90 group/edit"
                                                    title="Modify Node"
                                                >
                                                    <Edit size={18} className="group-hover/edit:rotate-12 transition-transform" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-90 group/del"
                                                    title="Purge Node"
                                                >
                                                    <Trash2 size={18} className="group-hover/del:scale-110 transition-transform" />
                                                </button>
                                                <div className="w-10 h-10 flex items-center justify-center text-slate-200 group-hover:text-slate-400 transition-colors">
                                                    <ChevronRight size={20} />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
