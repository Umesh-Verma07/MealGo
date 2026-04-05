import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Home() {

    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchFoodData = async () => {
        try {
            setIsLoading(true)
            setError("")

            const response = await fetch(`${SERVER_URL}/api/foodData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error('Unable to fetch menu data')
            }

            const payload = await response.json()
            setFoodItem(payload[0] || [])
            setFoodCat(payload[1] || [])
        } catch (fetchError) {
            setError(fetchError.message || 'Unable to load menu right now')
        } finally {
            setIsLoading(false)
        }
    }

    const searchItem = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        fetchFoodData();
    }, [])

    const normalizedSearch = search.trim().toLowerCase()
    const hasSearch = normalizedSearch.length > 0
    const filteredItems = foodItem.filter((item) => item.name.toLowerCase().includes(normalizedSearch))
    const categoryItems = (categoryName) => foodItem.filter((item) => item.CategoryName === categoryName && item.name.toLowerCase().includes(normalizedSearch))
    const menuContent = hasSearch ? (
        <section className='menu-section'>
            <div className='menu-section-header'>
                <div>
                    <p className='menu-section-meta'>Search results</p>
                    <h2 className='menu-section-title'>Showing matches for "{search}"</h2>
                </div>
                <p className='menu-section-meta'>{filteredItems.length} item{filteredItems.length === 1 ? '' : 's'}</p>
            </div>

            {filteredItems.length > 0 ? (
                <div className='menu-grid'>
                    {filteredItems.map((filteredItem) => (
                        <Card key={filteredItem._id} foodItem={filteredItem} options={filteredItem.options[0]} />
                    ))}
                </div>
            ) : (
                <div className='empty-state'>No dishes match your search. Try a different keyword.</div>
            )}
        </section>
    ) : (
        foodCat.length > 0 ? foodCat.map((category) => {
            const items = categoryItems(category.CategoryName)

            return (
                <section key={category._id} className='menu-section'>
                    <div className='menu-section-header'>
                        <div>
                            <p className='menu-section-meta'>Category</p>
                            <h2 className='menu-section-title'>{category.CategoryName}</h2>
                        </div>
                        <p className='menu-section-meta'>{items.length} item{items.length === 1 ? '' : 's'}</p>
                    </div>

                    {items.length > 0 ? (
                        <div className='menu-grid'>
                            {items.map((filteredItem) => (
                                <Card key={filteredItem._id} foodItem={filteredItem} options={filteredItem.options[0]} />
                            ))}
                        </div>
                    ) : (
                        <div className='empty-state'>No items available in this category right now.</div>
                    )}
                </section>
            )
        }) : (
            <div className='empty-state'>No menu data found.</div>
        )
    )

    return (
        <div>
            <Navbar />

            <section className="hero-section">
                <div id="carouselExampleAutoplaying" className="carousel slide hero-carousel" data-bs-ride="carousel">
                    <div className="hero-overlay">
                        <div className="hero-copy">
                            <div className="hero-kicker">Chef-picked menus</div>
                            <h1>Food that feels fast, fresh, and worth the wait.</h1>
                            <p>Search your cravings, explore categories, and build your meal in a few taps.</p>
                            <div className="hero-search" role="search">
                                <input className="form-control" type="search" placeholder="Search dishes, combos, desserts..." aria-label="Search" value={search} onChange={searchItem} />
                            </div>
                        </div>
                    </div>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-item active">
                            <img src="./carousel/1.jpg" className="d-block w-100" alt="Food platter" />
                        </div>
                        <div className="carousel-item">
                            <img src="./carousel/2.jpg" className="d-block w-100" alt="Fresh breakfast" />
                        </div>
                        <div className="carousel-item" >
                            <img src="./carousel/3.jpg" className="d-block w-100" alt="Healthy bowl" />
                        </div>
                        <div className="carousel-item" >
                            <img src="./carousel/4.jpg" className="d-block w-100" alt="Dessert spread" />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            <div className='container py-4'>
                {isLoading && <div className='empty-state'>Loading menu...</div>}

                {!isLoading && error && <div className='empty-state'>{error}</div>}

                {/* We render search mode and category mode separately to keep filtering logic predictable. */}
                {!isLoading && !error && menuContent}
            </div>
            <Footer />
        </div>
    )
}
