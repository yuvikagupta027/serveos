import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaWifi, FaSnowflake, FaWineBottle, FaWater, FaDoorOpen, FaSwimmingPool, FaUtensils, FaHotTub } from "react-icons/fa";
import Footer from "./Footer";
import { BsWhatsapp } from "react-icons/bs";

export default function Home() {

    const [rooms, setrooms] = useState([]);

    function fetchrooms() {
        axios.post("https://serveos-1.onrender.com/fetchrooms").then((succ) => {
            setrooms(succ.data)
        })
    }

    useEffect(() => {
        fetchrooms()
    }, [])

    const amenities = [
        { name: "WiFi", icon: <FaWifi size={22} /> },
        { name: "AC", icon: <FaSnowflake size={22} /> },
        { name: "Mini Bar", icon: <FaWineBottle size={22} /> },
        { name: "Ocean View", icon: <FaWater size={22} /> },
        { name: "Balcony", icon: <FaDoorOpen size={22} /> },
        { name: "Pool", icon: <FaSwimmingPool size={22} /> },
        { name: "Kitchen", icon: <FaUtensils size={22} /> },
        { name: "Jacuzzi", icon: <FaHotTub size={22} /> }
    ];

    const reviews = [
        { name: "James Wilson", role: "Travel Enthusiast", review: "Absolutely amazing experience! The staff was incredibly attentive and the rooms are luxurious beyond words.", rating: 5, initial: "J" },
        { name: "Sarah Chen", role: "Executive", review: "Perfect for business and leisure. The facilities are world-class and the location is unbeatable.", rating: 5, initial: "S" },
        { name: "Marco Rossi", role: "Photographer", review: "The ocean views from the suite are breathtaking. I captured some of my best work here!", rating: 5, initial: "M" },
        { name: "Emily Park", role: "Blogger", review: "Exceeded all expectations. This is hands-down the best resort I’ve stayed at in the years.", rating: 4, initial: "E" }
    ];

    return (
        <>
            <div className="hero-container">
                <div className="w-100">
                    <Navbar />
                </div>
                <div className="hero-content">
                    <h1 className="fw-bold text-light mb-2">
                        Experience Luxury Like Never <br />Before
                    </h1>
                    <p className="text-light">
                        Discover our world-class accommodations and unforgettable experiences in paradise
                    </p>
                    <div className="shadow col-lg-6 col-11 px-4 py-2 mt-2 rounded-3 glass-card">
                        <div className="row g-2 align-items-center w-100">
                            <div className="col-md-4 col-12">
                                <label>Check-in</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-4 col-12">
                                <label>Check-out</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="col-md-4 col-12">
                                <label>Guests</label>
                                <select className="form-select">
                                    <option>1 Guest</option>
                                    <option>2 Guests</option>
                                    <option>3 Guests</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-3 mb-3 w-100">
                            <Link to="/user/UserRooms">
                                <button className="btn btn-gradient w-100">
                                    Search Rooms
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="text-center mb-4">
                        <p className="text-primary small fw-bold m-0">OUR COLLECTION</p>
                        <h2 className="fw-bold">Featured Rooms</h2>
                        <p className="text-muted">
                            Hand-picked rooms for unforgettable moments
                        </p>
                    </div>
                    <div className="row g-4">
                        {rooms.slice(0, 3).map((row, index) => (
                            <div className="col-lg-4 col-md-6" key={index}>
                                <div className="card">
                                    <div style={{ height: "190px" }}>
                                        <img src={row.Image} className="w-100 h-100" />
                                    </div>
                                    <div className="p-3">
                                        <h6 className="fw-bold">{row.Name}</h6>
                                        <div style={{ height: 50 }}>
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                {row.Amenities?.wifi && (
                                                    <span className="badge bg-light text-dark border">WiFi</span>
                                                )}
                                                {row.Amenities?.ac && (
                                                    <span className="badge bg-light text-dark border">AC</span>
                                                )}
                                                {row.Amenities?.minibar && (
                                                    <span className="badge bg-light text-dark border">Mini Bar</span>
                                                )}
                                                {row.Amenities?.pool && (
                                                    <span className="badge bg-light text-dark border">Pool</span>
                                                )}
                                                {row.Amenities?.balcony && (
                                                    <span className="badge bg-light text-dark border">Balcony</span>
                                                )}
                                                {row.Amenities?.jacuzzi && (
                                                    <span className="badge bg-light text-dark border">Jacuzzi</span>
                                                )}
                                                {row.Amenities?.oceanview && (
                                                    <span className="badge bg-light text-dark border">Ocean View</span>
                                                )}
                                                {row.Amenities?.kitchen && (
                                                    <span className="badge bg-light text-dark border">Kitchen</span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-muted small mb-2">
                                            ₹{row.Price}/night • {row.Capacity} guests
                                        </p>
                                        <button className="btn btn-outline-primary w-100">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/user/UserRooms">
                            <button className="btn btn-gradient px-4 py-2">
                                View All Rooms
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="py-5 bg-light">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">World-Class Amenities</h2>
                    </div>
                    <div className="container">
                        <div className="row g-3 justify-content-center">
                            {amenities.map((item, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-6">
                                    <div className="amenity-card text-center">
                                        <div className="amenity-icon">
                                            {item.icon}
                                        </div>
                                        <p className="amenity-text">{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="container py-5">
                    <div className="text-center mb-4">
                        <p className="text-primary small fw-bold m-0">GUEST STORIES</p>
                        <h2 className="fw-bold">What Our Guests Say</h2>
                    </div>
                    <div className="row g-4">
                        {reviews.map((item, index) => (
                            <div key={index} className="col-lg-6 col-12">
                                <div className="card cardd shadow px-3 py-3">
                                    <div className="d-flex align-items-center">
                                        <div className="avatar">
                                            {item.initial}
                                        </div>
                                        <div className="ms-2">
                                            <h6 className="mb-0 fw-bold">{item.name}</h6>
                                            <small className="text-muted">{item.role}</small>
                                        </div>
                                    </div>
                                    <div className="text-warning">
                                        {"★".repeat(item.rating)}
                                        {"☆".repeat(5 - item.rating)}
                                    </div>
                                    <p className="text-muted">
                                        "{item.review}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="colorrr py-5">
                    <div className="text-center">
                        <h2 className="fw-bold text-light">Ready for your Perfect Getaway?</h2>
                        <p className="text-light small fw-bold mb-3">Book your stay today and start your journey to paradise</p>
                        <Link to="/user/UserRooms">
                            <button className="btn btn-light">Book Your Room Now</button>
                        </Link>
                    </div>
                </div>
                <div className="position-fixed bottom-0 end-0 p-3 z-3">
                    <button
                        className="fixed-join-btn text-light fw-bold px-3 py-2 shadow rounded-pill bgcolor"
                        onClick={() =>
                            window.open(
                                "https://wa.me/919781536683?text=Hi%2C%20I%20am%20interested%20in%20your%services.%20Can%20you%20help%20me%3F",
                                "_blank"
                            )
                        }
                    >
                        <BsWhatsapp size={24} />
                    </button>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}