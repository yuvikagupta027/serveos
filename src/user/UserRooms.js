import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function UserRooms() {

    const [rooms, setrooms] = useState([]);

    function fetchrooms() {
        axios.post("http://localhost:1000/fetchrooms").then((succ) => {
            setrooms(succ.data)
        })
    }

    useEffect(() => {
        fetchrooms()
    }, [])

    return (
        <>
            <div className="w-100">
                <Navbar />
            </div>
            <div className="container-fluid px-3 py-3">
                <div className="text-start mb-4">
                    <h2 className="fw-bold">Our Rooms</h2>
                    <p className="text-muted">
                        Discover luxury accommodations tailored to your needs
                    </p>
                </div>
                <div className="row g-4">
                    {rooms.map((row, index) => (
                        <div className="col-lg-4 col-md-6 col-12" key={index}>
                            <div className="card">
                                <div style={{ height: "220px" }}>
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
                                    <p className="text-muted small mb-2 mt-2">
                                        ₹{row.Price}/night • {row.Capacity} guests
                                    </p>
                                    <Link to="/user/BookNow">
                                        <button className="btn colorrr text-light fw-bold w-100">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
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
            <div className="w-100">
                <Footer />
            </div>
        </>
    )
}