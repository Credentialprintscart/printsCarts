'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/pages.css';

const BrowsePrinters = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [priceRange, setPriceRange] = useState(1000);

    const printers = [
        {
            id: 1,
            name: 'HP LaserJet Pro MFP 3301fdw',
            category: 'laser',
            price: 539,
            brand: 'HP',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
            rating: 4.8
        },
        {
            id: 2,
            name: 'Canon PIXMA TR8620 All-in-One',
            category: 'inkjet',
            price: 199,
            brand: 'Canon',
            image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=600',
            rating: 4.5
        },
        {
            id: 3,
            name: 'Epson EcoTank ET-2800',
            category: 'inkjet',
            price: 279,
            brand: 'Epson',
            image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=600',
            rating: 4.7
        },
        {
            id: 4,
            name: 'Brother HL-L2350DW Laser',
            category: 'laser',
            price: 159,
            brand: 'Brother',
            image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
            rating: 4.6
        }
    ];

    const filteredPrinters = printers.filter(printer => {
        const matchesSearch = printer.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesBrand = selectedBrand === 'All' || printer.brand === selectedBrand;
        const matchesPrice = printer.price <= priceRange;
        return matchesSearch && matchesBrand && matchesPrice;
    });

    return (
        <>
            
            <div className="browse-printers-page">
                <div className="browse-container">
                    <div className="browse-header">
                        <h1>Browse Printers</h1>
                        <p>Find the perfect printing solution for your home or office</p>
                    </div>

                    <div className="browse-layout">
                        <aside className="filters-sidebar">
                            <div className="filter-group">
                                <h3>Search</h3>
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Search printers..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="filter-group">
                                <h3>Brand</h3>
                                <div className="brand-options">
                                    {['All', 'HP', 'Canon', 'Epson', 'Brother'].map(brand => (
                                        <label key={brand} className="filter-label">
                                            <input
                                                type="radio"
                                                name="brand"
                                                checked={selectedBrand === brand}
                                                onChange={() => setSelectedBrand(brand)}
                                            />
                                            {brand}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-group">
                                <h3>Max Price: ${priceRange}</h3>
                                <input
                                    type="range"
                                    min="50"
                                    max="1000"
                                    step="50"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="price-range"
                                />
                            </div>
                        </aside>

                        <main className="results-area">
                            <div className="results-header">
                                <span>Showing {filteredPrinters.length} printers</span>
                                <div className="sort-box">
                                    <select>
                                        <option>Sort by: Featured</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Rating</option>
                                    </select>
                                </div>
                            </div>

                            <div className="browse-grid">
                                {filteredPrinters.map(printer => (
                                    <div key={printer.id} className="browse-card">
                                        <div className="card-image">
                                            <img src={printer.image} alt={printer.name} />
                                        </div>
                                        <div className="card-info">
                                            <span className="card-brand">{printer.brand}</span>
                                            <h3>{printer.name}</h3>
                                            <div className="card-meta">
                                                <span className="card-price">${printer.price}</span>
                                                <span className="card-rating">★ {printer.rating}</span>
                                            </div>
                                            <Link href={`/printers/${printer.id}`} className="view-btn">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredPrinters.length === 0 && (
                                <div className="no-results-state">
                                    <p>No printers match your current filters.</p>
                                    <button onClick={() => {
                                        setSearchTerm('');
                                        setSelectedBrand('All');
                                        setPriceRange(1000);
                                    }}>Clear All Filters</button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
            
            <style>{`
                .browse-printers-page {
                    padding-top: 120px;
                    padding-bottom: 80px;
                    background: #f8f9fa;
                    min-height: 100vh;
                }
                .browse-container {
                    max-width: 1300px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                .browse-header {
                    margin-bottom: 40px;
                    text-align: center;
                }
                .browse-header h1 {
                    font-size: 36px;
                    color: #0f3d91;
                    margin-bottom: 12px;
                }
                .browse-layout {
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 40px;
                }
                .filters-sidebar {
                    background: #fff;
                    padding: 24px;
                    border-radius: 12px;
                    height: fit-content;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    position: sticky;
                    top: 100px;
                }
                .filter-group {
                    margin-bottom: 30px;
                }
                .filter-group h3 {
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 16px;
                    color: #333;
                    border-bottom: 1px solid #f0f0f0;
                    padding-bottom: 8px;
                }
                .search-box input {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                }
                .brand-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .filter-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    font-size: 15px;
                }
                .price-range {
                    width: 100%;
                }
                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    padding: 0 4px;
                }
                .browse-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 24px;
                }
                .browse-card {
                    background: #fff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                    transition: transform 0.3s;
                }
                .browse-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
                }
                .card-image {
                    height: 200px;
                    background: #f8f9fa;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .card-image img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                }
                .card-info {
                    padding: 20px;
                }
                .card-brand {
                    font-size: 12px;
                    font-weight: 700;
                    color: #0f3d91;
                    text-transform: uppercase;
                }
                .card-info h3 {
                    font-size: 18px;
                    margin: 8px 0 12px;
                    color: #333;
                    height: 44px;
                    overflow: hidden;
                }
                .card-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .card-price {
                    font-size: 20px;
                    font-weight: 700;
                    color: #0f3d91;
                }
                .card-rating {
                    font-size: 14px;
                    color: #f59e0b;
                    font-weight: 600;
                }
                .view-btn {
                    display: block;
                    width: 100%;
                    padding: 12px;
                    background: #0f3d91;
                    color: #fff;
                    text-align: center;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: background 0.2s;
                }
                .view-btn:hover {
                    background: #0b2c66;
                }
                .no-results-state {
                    text-align: center;
                    padding: 60px;
                    background: #fff;
                    border-radius: 12px;
                }

                @media (max-width: 900px) {
                    .browse-layout {
                        grid-template-columns: 1fr;
                    }
                    .filters-sidebar {
                        position: static;
                    }
                }
            `}</style>
        </>
    );
};

export default BrowsePrinters;


