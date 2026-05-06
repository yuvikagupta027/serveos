import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { BsWhatsapp } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";

export default function Contact() {

    const [message, setMessage] = useState(
        "Hi, I am interested in booking a room. Please share details."
    );

    const contactData = [
        { icon: <FaMapMarkerAlt />, title: "Address", text: "123 Oceanfront Drive, Paradise Bay, PB 90210" },
        { icon: <FaPhoneAlt />, title: "Phone", text: "+91-9781536683" },
        { icon: <FaWhatsapp />, title: "WhatsApp", text: "+91-9781536683" },
    ];

    function submitform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var name = data.get("name");
        var email = data.get("email");
        var message = data.get("message");
        var currentDate = new Date().toISOString().split("T")[0];
        var status = "New";

        axios.post("https://serveos-1.onrender.com/submitformcontact", {
            Name: name,
            Email: email,
            Message: message,
            Date: currentDate,
            Status: status
        }).then((succ) => {
            alert("Form Submitted Successfully.!");
            e.target.reset();
        })
    }

    return (
        <>
            <div className="w-100">
                <Navbar />
            </div>
            <div className="container-fluid px-3 py-3">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Contact Us</h2>
                    <p className="text-muted">
                        We'd love to hear from you. Get in touch with our team.
                    </p>
                </div>
                <div className="row align-items-center">
                    {contactData.map((item, index) => (
                        <div key={index} className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="contact-card h-100">
                                <div className="contact-icon">
                                    {item.icon}
                                </div>
                                <div>
                                    <h6 className="mb-1">{item.title}</h6>
                                    <p className="mb-0 small">{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row g-4 mt-2">
                    <div className="col-lg-6 col-12">
                        <div className="p-2">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3228.3993763149615!2d14.329668475264707!3d35.98610711316704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e4c8a038000cb%3A0x7688f8b28a15d1e1!2sParadise%20Bay%20Resort!5e0!3m2!1sen!2sin!4v1777743708318!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <form onSubmit={submitform} className="shadow-sm cardd mb-4 py-5 px-4">
                            <label>Name</label>
                            <input name="name" type="text" placeholder="Your name" className="form-control mb-3" />
                            <label>Email</label>
                            <input name="email" type="email" placeholder="your@email.com" className="form-control mb-3" />
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                className="form-control mb-3" />
                            <button type="submit" className="btn btn-gradient w-100">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div >
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