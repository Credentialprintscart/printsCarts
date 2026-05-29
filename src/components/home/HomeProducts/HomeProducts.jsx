'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { listProducts } from '../../../redux/actions/productActions';
import { addToCart } from '../../../redux/actions/cartActions';
import { Eye, ShoppingBag, Search } from 'lucide-react';
import HomeProductCard from './HomeProductCard';
import './HomeProducts.css';

const HomeProducts = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
    
    // Filters from the image
    const [technology, setTechnology] = useState({ inkjet: false, laser: false, laserBW: false });
    const [usageCategory, setUsageCategory] = useState({ home: false, office: false, mobile: false, photo: false });
    const [aioType, setAioType] = useState({ multifunction: false, singleFunction: false });
    const [wireless, setWireless] = useState('Select');
    const [mainFunction, setMainFunction] = useState({ print: false, scan: false, copy: false, fax: false, printOnly: false });

    useEffect(() => {
        dispatch(listProducts('', '', 1));
    }, [dispatch]);

    const handleBuyNow = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(product.slug || product._id, 1));
        router.push('/cart?redirect=shipping');
    };

    const handleDetails = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/product/${product.slug || product._id}`);
    };

    // Filter and sort logic
    const filteredProducts = useMemo(() => {
        if (!products || !Array.isArray(products)) return [];
        
        let filtered = [...products];

        // 1. Search filter
        if (searchQuery) {
            filtered = filtered.filter(p => 
                (p.title || p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Price range filter
        filtered = filtered.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);

        // 3. Technology filter (Inkjet, Laser, Laser B/W)
        const activeTech = Object.entries(technology).filter(([_, val]) => val).map(([key]) => key);
        if (activeTech.length > 0) {
            filtered = filtered.filter(p => {
                const text = `${p.title} ${p.category?.name || p.category || ''} ${p.shortSpecification || ''}`.toLowerCase();
                return activeTech.some(tech => {
                    if (tech === 'inkjet') return text.includes('inkjet');
                    if (tech === 'laser') return text.includes('laser') && !text.includes('monochrome') && !text.includes('b/w');
                    if (tech === 'laserBW') return text.includes('laser') && (text.includes('monochrome') || text.includes('b/w'));
                    return false;
                });
            });
        }

        // 4. Usage Category filter (Home, Office, Mobile, Photo)
        const activeUsage = Object.entries(usageCategory).filter(([_, val]) => val).map(([key]) => key);
        if (activeUsage.length > 0) {
            filtered = filtered.filter(p => {
                const text = `${p.title} ${p.description || ''} ${p.overview || ''}`.toLowerCase();
                return activeUsage.some(usage => {
                    if (usage === 'home') return text.includes('home') || text.includes('personal');
                    if (usage === 'office') return text.includes('office') || text.includes('business') || text.includes('work');
                    if (usage === 'mobile') return text.includes('mobile') || text.includes('wireless') || text.includes('wi-fi');
                    if (usage === 'photo') return text.includes('photo');
                    return false;
                });
            });
        }

        // 5. All-in-One Type filter (Multifunction, Single Function)
        const activeAio = Object.entries(aioType).filter(([_, val]) => val).map(([key]) => key);
        if (activeAio.length > 0) {
            filtered = filtered.filter(p => {
                const text = `${p.title} ${p.description || ''}`.toLowerCase();
                const isMultifunction = text.includes('mfp') || text.includes('all-in-one') || text.includes('multifunction') || text.includes('3-in-1') || text.includes('4-in-1');
                return activeAio.some(type => {
                    if (type === 'multifunction') return isMultifunction;
                    if (type === 'singleFunction') return !isMultifunction;
                    return false;
                });
            });
        }

        // 6. Wireless filter
        if (wireless !== 'Select') {
            filtered = filtered.filter(p => {
                const text = `${p.title} ${p.technicalSpecification || ''}`.toLowerCase();
                if (wireless === 'Wi-Fi') return text.includes('wi-fi') || text.includes('wireless');
                if (wireless === 'Bluetooth') return text.includes('bluetooth');
                return true;
            });
        }

        // 7. Main Function filter (Print, Scan, Copy, Fax, Print Only)
        const activeFunctions = Object.entries(mainFunction).filter(([_, val]) => val).map(([key]) => key);
        if (activeFunctions.length > 0) {
            filtered = filtered.filter(p => {
                const text = `${p.title} ${p.description || ''} ${p.technicalSpecification || ''}`.toLowerCase();
                return activeFunctions.some(func => {
                    if (func === 'print') return text.includes('print');
                    if (func === 'scan') return text.includes('scan');
                    if (func === 'copy') return text.includes('copy');
                    if (func === 'fax') return text.includes('fax');
                    if (func === 'printOnly') return text.includes('print') && !text.includes('scan') && !text.includes('copy');
                    return false;
                });
            });
        }

        // 8. Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => (a.title || a.name || '').localeCompare(b.title || b.name || ''));
                break;
            default:
                break;
        }

        return filtered;
    }, [products, searchQuery, priceRange, sortBy, technology, usageCategory, aioType, wireless, mainFunction]);

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    return (
        <section className="home-products">
            <div className="home-products-container">
                <h2 className="main-title">Professional Hardware</h2>
                <p className="main-subtitle">Curated selection of high-performance printing solutions for home and office.</p>

                {/* Filter Section */}
                <div className="filter-section">
                    <div className="filter-top-row">
                        <div className="search-container">
                            <Search className="search-icon" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search model, brand or features..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search printers"
                            />
                        </div>
                        <div className="sort-container">
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort printers by">
                                <option value="featured">Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                        <div className="price-slider-container">
                            <div className="price-labels">
                                <span className="label-text">MAX PRICE:</span>
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="5000" 
                                    step="100"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                    aria-label="Filter by maximum price"
                                />
                                <span className="price-value">${priceRange.max}</span>
                            </div>
                        </div>
                    </div>

                    <div className="filter-bottom-row">
                        <div className="filter-group">
                            <h2>Technology</h2>
                            <div className="checkbox-group">
                                <label><input type="checkbox" checked={technology.inkjet} onChange={() => setTechnology({...technology, inkjet: !technology.inkjet})} /> Inkjet</label>
                                <label><input type="checkbox" checked={technology.laser} onChange={() => setTechnology({...technology, laser: !technology.laser})} /> Laser</label>
                                <label><input type="checkbox" checked={technology.laserBW} onChange={() => setTechnology({...technology, laserBW: !technology.laserBW})} /> Laser (B/W)</label>
                            </div>
                        </div>
                        <div className="filter-group">
                            <h2>Usage Category</h2>
                            <div className="checkbox-group grid-2">
                                <label><input type="checkbox" checked={usageCategory.home} onChange={() => setUsageCategory({...usageCategory, home: !usageCategory.home})} /> Home</label>
                                <label><input type="checkbox" checked={usageCategory.office} onChange={() => setUsageCategory({...usageCategory, office: !usageCategory.office})} /> Office</label>
                                <label><input type="checkbox" checked={usageCategory.mobile} onChange={() => setUsageCategory({...usageCategory, mobile: !usageCategory.mobile})} /> Mobile</label>
                                <label><input type="checkbox" checked={usageCategory.photo} onChange={() => setUsageCategory({...usageCategory, photo: !usageCategory.photo})} /> Photo</label>
                            </div>
                        </div>
                        <div className="filter-group">
                            <h2>All-in-One Type</h2>
                            <div className="checkbox-group">
                                <label className="purple-text"><input type="checkbox" checked={aioType.multifunction} onChange={() => setAioType({...aioType, multifunction: !aioType.multifunction})} /> Multifunction</label>
                                <label className="purple-text"><input type="checkbox" checked={aioType.singleFunction} onChange={() => setAioType({...aioType, singleFunction: !aioType.singleFunction})} /> Single Function</label>
                            </div>
                        </div>
                        <div className="filter-group">
                            <h2>Wireless</h2>
                            <select value={wireless} onChange={(e) => setWireless(e.target.value)} aria-label="Wireless connectivity">
                                <option>Select</option>
                                <option>Wi-Fi</option>
                                <option>Bluetooth</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <h2>Main Function</h2>
                            <div className="checkbox-group grid-3">
                                <label className="green-text"><input type="checkbox" checked={mainFunction.print} onChange={() => setMainFunction({...mainFunction, print: !mainFunction.print})} /> Print</label>
                                <label className="green-text"><input type="checkbox" checked={mainFunction.scan} onChange={() => setMainFunction({...mainFunction, scan: !mainFunction.scan})} /> Scan</label>
                                <label className="green-text"><input type="checkbox" checked={mainFunction.copy} onChange={() => setMainFunction({...mainFunction, copy: !mainFunction.copy})} /> Copy</label>
                                <label className="green-text"><input type="checkbox" checked={mainFunction.fax} onChange={() => setMainFunction({...mainFunction, fax: !mainFunction.fax})} /> Fax</label>
                                <label className="green-text"><input type="checkbox" checked={mainFunction.printOnly} onChange={() => setMainFunction({...mainFunction, printOnly: !mainFunction.printOnly})} /> Print Only</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="results-count">
                    Showing <span className="count-value">{filteredProducts.length}</span> items
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : error ? (
                        <div className="error-container">
                            <p>Error: {error}</p>
                            <button onClick={() => dispatch(listProducts('', '', 1))} className="reset-filters-btn">Try Again</button>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <HomeProductCard 
                                key={product._id} 
                                product={product} 
                                handleDetails={handleDetails} 
                                handleBuyNow={handleBuyNow} 
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No products match your current filters. Please try adjusting your search or filters.</p>
                            <button onClick={() => {
                                setSearchQuery('');
                                setTechnology({ inkjet: false, laser: false, laserBW: false });
                                setUsageCategory({ home: false, office: false, mobile: false, photo: false });
                                setAioType({ multifunction: false, singleFunction: false });
                                setWireless('Select');
                                setMainFunction({ print: false, scan: false, copy: false, fax: false, printOnly: false });
                                setPriceRange({ min: 0, max: 5000 });
                            }} className="reset-filters-btn">Reset All Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomeProducts;

