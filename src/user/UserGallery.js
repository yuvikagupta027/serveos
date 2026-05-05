import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import { BsWhatsapp } from "react-icons/bs";

export default function UserGallery() {

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [img, setimg] = useState([]);

    function fetchimages() {
        axios.post("http://localhost:1000/fetchimage").then((succ) => {
            setimg(succ.data)
        })
    }

    useEffect(() => {
        fetchimages();
    }, [])

    return (
        <>
            <div className="w-100">
                <Navbar />
            </div>
            <div className="container-fluid px-3 py-3">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Gallery</h2>
                    <p className="text-muted">Explore the beauty of our resort</p>
                </div>
                <div className="row g-3 justify-content-start mb-3">
                    {img.map((row, index) => (
                        <div key={index} className="col-lg-4 col-6">
                            <div className="image-card" onClick={() => setSelectedIndex(index)}>
                                <img src={row.Image} alt="img" className="image" />
                                <div className="overlay">
                                    <h6 className="p-0 m-0">{row.Name}</h6>
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
            {selectedIndex !== null && (
                <div className="lightbox fade-in">
                    <span className="close" onClick={() => setSelectedIndex(null)}>✕</span>
                    <span className="navgallery left" onClick={() => setSelectedIndex((selectedIndex - 1 + img.length) % img.length)}>
                        ❮
                    </span>
                    <img key={selectedIndex} src={img[selectedIndex].Image} className="lightbox-img zoom-in" />
                    <span className="navgallery right" onClick={() => setSelectedIndex((selectedIndex + 1) % img.length)}>
                        ❯
                    </span>
                </div>
            )}
        </>
    )
}