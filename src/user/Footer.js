import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <div className="bg-light text-dark pt-5 pb-4">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 col-12">
                            <h5 className="fw-bold">OCEANVIEW</h5>
                            <small className="text-muted">BOUTIQUE HOTEL</small>
                            <p className="mt-3 small text-muted">
                                Vivamus lacus lorem, ultrices et nisi non, scelerisque aliquet
                                tempor sit amet eros. Suspendisse ac suscipit elit.
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <h6 className="fw-bold mb-3">ACTIVE FOOTER MENU</h6>
                            <ul className="list-unstyled mb-2 text-small">
                                <li>Home</li>
                                <li>About Hotel</li>
                                <li>Suites & Apartments</li>
                                <li>Hotel Amenities</li>
                                <li>What's On</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 col-6">
                            <h6 className="fw-bold mb-3">RECENT POSTS</h6>
                            <p className="small mb-2">
                                First Hotelizing WordPress Theme
                                <br />
                                <span className="text-muted">August 11, 2023</span>
                            </p>
                            <p className="small">
                                Hotel and Restaurant Business
                                <br />
                                <span className="text-muted">July 28, 2023</span>
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <h6 className="fw-bold mb-3">HOTEL NEWSLETTER</h6>

                            <p className="small text-muted">Get notified on any hotel news.</p>

                            <input
                                type="email"
                                placeholder="email@domain.com"
                                className="form-control mb-3"
                            />
                            <h6 className="fw-bold mt-3">GET SOCIAL WITH US</h6>
                            <div className="d-flex gap-2 mt-2">
                                <div className="social-icon"><FaFacebookF /></div>
                                <div className="social-icon"><FaTwitter /></div>
                                <div className="social-icon"><FaYoutube /></div>
                                <div className="social-icon"><FaInstagram /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}