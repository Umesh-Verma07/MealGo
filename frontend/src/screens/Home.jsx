import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {

    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])
    const [search, setSearch] = useState("")

    const localData = async () => {
        let response = await fetch("http://localhost:5001/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    const searchItem = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        localData();
    }, [])

    return (
        <div>
            <div><Navbar /></div>

            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "cover !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={searchItem} />
                            {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="./carousel/1.jpg" className="d-block w-100" style={{ filter: "brightness(70%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="./carousel/2.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" >
                        <img src="./carousel/3.jpg" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item" >
                        <img src="./carousel/4.jpg" className="d-block w-100" alt="..." />
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


            <div className='container'>
                {
                    search != []
                        ? <div className='row mb-3'>
                            <div className='fs-3 m-3'>
                                Search Item: {search}
                            </div>
                            <hr />
                            {
                                foodItem != []
                                    ? foodItem.filter((item) => (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map((filterItems) => {
                                            return (
                                                <>
                                                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                                                    </div>
                                                </>
                                            )
                                        })
                                    : <div>No Data Found!</div>
                            }
                        </div>

                        : foodCat != []
                            ? foodCat.map((data) => {
                                return (
                                    <div className='row mb-3'>
                                        <div key={data._id} className='fs-3 m-3'>
                                            {data.CategoryName}
                                        </div>
                                        <hr />
                                        {
                                            foodItem != []
                                                ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                    .map((filterItems) => {
                                                        return (
                                                            <>
                                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                                    <Card foodItem={filterItems} options={filterItems.options[0]} />
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                : <div>No Data Found!</div>
                                        }
                                    </div>
                                )
                            })
                            : <div> No Data Found! </div>
                }
            </div>
            <Footer />
        </div>
    )
}
