import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 custom-navbar">
                <div className="container-fluid px-3">
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <img src="/images/logo.png" alt="ServeOS Logo" width="60" height="60" className="me-2 rounded-circle" />
                        <h2 className='mt-2' style={{ fontFamily: "inherit" }}>ServeOS</h2>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-lg-center gap-2">
                            <li className="nav-item">
                                <Link to="/" className="nav-link fw-bold text-dark">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/UserRooms" className="nav-link fw-bold text-dark">Rooms</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/UserGallery" className="nav-link fw-bold text-dark">Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/Contact" className="nav-link fw-bold text-dark">Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/user/BookNow" className="btn btn-danger fw-bold px-3">Book Now</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}