import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Footer from "./Footer";
import { BsWhatsapp } from "react-icons/bs";

export default function BookNow() {

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [img, setimg] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isDateLocked, setIsDateLocked] = useState(false);
    const [isRoomLocked, setIsRoomLocked] = useState(false);
    const [availableRooms, setAvailableRooms] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [step, setStep] = useState(1);
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        contact: "",
        note: ""
    });
    const [dates, setDates] = useState({
        checkin: "",
        checkout: "",
        guests: 1,
    });

    function fetchimages() {
        axios.post("http://localhost:1000/fetchimage").then((succ) => {
            setimg(succ.data)
        })
    }

    useEffect(() => {
        fetchimages();
    }, [])

    function addRoom(room) {
        const exists = selectedRooms.find(r => r._id === room._id);
        if (exists) {
            setSelectedRooms(
                selectedRooms.map(r =>
                    r._id === room._id
                        ? { ...r, qty: r.qty + 1 }
                        : r
                )
            );
        } else {
            setSelectedRooms([...selectedRooms, { ...room, qty: 1 }]);
        }
    }

    function removeRoom(roomId) {
        setSelectedRooms(
            selectedRooms
                .map(r =>
                    r._id === roomId
                        ? { ...r, qty: r.qty - 1 }
                        : r
                )
                .filter(r => r.qty > 0)
        );
    }

    function fetchRooms() {
        axios.post("http://localhost:1000/fetchrooms")
            .then((res) => {
                setRooms(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    function checkAvailability() {
        if (!dates.checkin || !dates.checkout) {
            alert("Select dates first");
            return;
        }
        axios.post("http://localhost:1000/check-availability", dates)
            .then((res) => {
                if (res.data.length === 0) {
                    alert("No rooms available");
                    return;
                }
                setAvailableRooms(res.data);
                setIsDateLocked(true);
                setStep(2);
            })
            .catch(err => console.log(err));
    }

    function bookRoom(roomId, roomName) {

        axios.post("http://localhost:1000/book-room", {
            roomId: roomId,
            roomName: roomName,
            checkIn: dates.checkin,
            checkOut: dates.checkout,
            guests: dates.guests
        })
            .then((res) => {
                alert(res.data.message);
                resetAll();
            })
            .catch(err => console.log(err));
    }

    function resetAll() {
        setStep(1);
        setIsDateLocked(false);
        setIsRoomLocked(false);
        setAvailableRooms([]);
        setSelectedRooms([]);

        setDates({
            checkin: "",
            checkout: "",
            guests: 1
        });
    }

    return (
        <>
            <div className="w-100">
                <Navbar />
            </div>
            <div className="container-fluid px-3 py-3">
                <div className="row g-3 justify-content-start mb-3">
                    {img.slice(0, 4).map((row, index) => (
                        <div key={index} className="col-lg-3">
                            <div className="image-card" onClick={() => setSelectedIndex(index)}>
                                <img src={row.Image} alt="img" className="image" />
                                <div className="overlay">
                                    <h6 className="p-0 m-0">{row.Name}</h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {isDateLocked ? (
                    <div className="alert alert-success d-flex justify-content-between align-items-center">
                        <div>
                            <div className="justify-content-start gap-2">
                                ✔ Stay Dates
                                <b> ({dates.checkin} → {dates.checkout})</b>
                            </div>
                            <div className="justify-content-start gap-2">
                                ✔ No. of Guests ~
                                <b className="text-center"> {dates.guests}</b>
                            </div>
                        </div>
                        <button className="btn btn-sm btn-outline-dark"
                            onClick={() => {
                                setIsDateLocked(false);
                                setStep(1);
                                setAvailableRooms([]);
                            }}>
                            Change
                        </button>
                    </div>
                ) : (
                    <div className={`step-box ${step === 1 ? "active" : ""}`}>
                        <h5>📅 Stay Dates</h5>
                        <div className="row gap-3 mt-2 align-items-center">
                            <div className=" col-lg-4 col-12 card p-3">
                                <div className="d-flex align-items-center justify-content-center gap-2">
                                    <div className="col-6 mt-2">
                                        <label>Check In</label>
                                        <input min={new Date().toISOString().split("T")[0]} type="date" className="form-control" value={dates.checkin} onChange={(e) => setDates({ ...dates, checkin: e.target.value })} />
                                    </div>
                                    <div className="col-6 mt-2">
                                        <label>Check Out</label>
                                        <input min={new Date().toISOString().split("T")[0]} type="date" className="form-control" value={dates.checkout} onChange={(e) => setDates({ ...dates, checkout: e.target.value })} />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label>Guests</label>
                                    <select
                                        className="form-control"
                                        value={dates.guests}
                                        onChange={(e) => setDates({ ...dates, guests: e.target.value })}
                                    >
                                        <option value={1}>1 Guest</option>
                                        <option value={2}>2 Guests</option>
                                        <option value={3}>3 Guests</option>
                                    </select>
                                </div>
                                <div className="mt-4 d-flex align-items-end">
                                    <button className="btn btn-success w-100" onClick={checkAvailability}>
                                        Search Availability
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-7 col-12">
                                <div className="d-flex align-items-center justify-content-start gap-2">
                                    <h1 className="text-start fw-bold">Paradise Bay</h1>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} size={20} className="text-warning" />
                                    ))}
                                </div>
                                <p> <span className="fw-bold">CHECK IN TIME:</span> 2:00:PM | <span className="fw-bold">CHECK OUT TIME:</span> 12:00:PM</p>
                            </div>
                        </div>
                    </div>
                )}

                {isRoomLocked ? (
                    <div className="alert alert-success d-flex justify-content-between align-items-center mt-3">
                        <div>
                            ✔ Choose Your Room
                            <b> ({selectedRooms.length} Room Selected)</b>
                        </div>
                        <button className="btn btn-sm btn-outline-dark" onClick={() => { setIsRoomLocked(false); setStep(2) }}>
                            Change
                        </button>
                    </div>
                ) : (
                    <div className={`step-box mt-3 ${step >= 2 ? "active" : "disabled"}`}>
                        <h5>🛏️ Choose Your Room</h5>
                        <div className="d-flex flex-wrap align-items-start justify-content-center gap-3">
                            <div className="col-lg-10 col-12">
                                {availableRooms.map((room, index) => (
                                    <div key={index} className="card shadow-sm mb-4 p-3 border-0 rounded-4">
                                        <div className="row g-3 align-items-center">
                                            <div className="col-lg-4 col-12">
                                                <img src={room.Image} alt="room" className="w-100 rounded-3" style={{ height: "220px", objectFit: "cover" }} />
                                            </div>
                                            <div className="col-lg-5 col-12">
                                                <h5 className="fw-bold mb-1">{room.Name}</h5>
                                                <div className="mb-2 text-warning">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar key={i} size={14} />
                                                    ))}
                                                </div>
                                                <p className="text-muted small mb-2">
                                                    Spacious luxury room with modern amenities and peaceful surroundings.
                                                </p>
                                                <div className=" gap-3 small text-muted">
                                                    <span>👤 {room.Capacity} Guests</span>
                                                    <span>🛏️ 1 Bed</span>
                                                    <div style={{ height: 50 }}>
                                                        <div className="d-flex flex-wrap gap-2 mt-3">
                                                            {room.Amenities?.wifi && (
                                                                <span className="badge bg-light text-dark border">WiFi</span>
                                                            )}
                                                            {room.Amenities?.ac && (
                                                                <span className="badge bg-light text-dark border">AC</span>
                                                            )}
                                                            {room.Amenities?.minibar && (
                                                                <span className="badge bg-light text-dark border">Mini Bar</span>
                                                            )}
                                                            {room.Amenities?.pool && (
                                                                <span className="badge bg-light text-dark border">Pool</span>
                                                            )}
                                                            {room.Amenities?.balcony && (
                                                                <span className="badge bg-light text-dark border">Balcony</span>
                                                            )}
                                                            {room.Amenities?.jacuzzi && (
                                                                <span className="badge bg-light text-dark border">Jacuzzi</span>
                                                            )}
                                                            {room.Amenities?.oceanview && (
                                                                <span className="badge bg-light text-dark border">Ocean View</span>
                                                            )}
                                                            {room.Amenities?.kitchen && (
                                                                <span className="badge bg-light text-dark border">Kitchen</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-12 text-end">
                                                <p className="text-muted small m-0 p-0">Avg per night</p>
                                                <h4 className="fw-bold text-danger m-0 p-0">₹{room.Price}</h4>
                                                <p className="text-muted small mb-2">Incl. taxes</p>
                                                <div className="d-flex justify-content-end align-items-center gap-2">
                                                    <button className="btn btn-danger p-1 px-2" onClick={() => removeRoom(room._id)}>
                                                        -
                                                    </button>
                                                    <span>
                                                        {selectedRooms.find(r => r._id === room._id)?.qty || 0}
                                                    </span>
                                                    <button className="btn btn-success p-1 px-2" onClick={() => addRoom(room)}>
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="col-lg-2 col-12">
                                {selectedRooms.length > 0 && (
                                    <div className="card p-3">
                                        <h5>Selected Room</h5>
                                        {selectedRooms.map((room, index) => (
                                            <div key={index} className="border rounded p-2 mb-2">
                                                <h6 className="m-0">{room.Name}</h6>
                                                <small>Qty: {room.qty}</small>
                                                <div className="d-flex justify-content-between">
                                                    <span>₹{room.Price} × {room.qty}</span>
                                                    <span>₹{room.Price * room.qty}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <hr />
                                        <h5>Total: ₹{selectedRooms.reduce((total, r) => total + r.Price * r.qty, 0)}</h5>
                                        <button className="btn btn-gradient w-100 mt-2"
                                            onClick={() => {
                                                setIsRoomLocked(true);
                                                setStep(3);
                                            }}>
                                            Continue to Payment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {step >= 3 && (
                    <div className={`step-box mt-3 ${step >= 3 ? "active" : "disabled"}`}>
                        <h5>👤 Your Details & Payment</h5>
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <input required className="form-control" placeholder="Your Name" value={customer.name}
                                            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <input required className="form-control" placeholder="Your Email" value={customer.email}
                                            onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                                    </div>
                                    <div className="col-md-4">
                                        <input required className="form-control" placeholder="Mobile Number" value={customer.contact}
                                            onChange={(e) => setCustomer({ ...customer, contact: e.target.value })} />
                                    </div>
                                    <div className="col-12">
                                        <textarea required className="form-control" placeholder="Special Note" value={customer.note}
                                            onChange={(e) => setCustomer({ ...customer, note: e.target.value })}></textarea>
                                    </div>
                                    <div className="col-12">
                                        <input required type="checkbox" /> I agree with cancellation policy
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-12">
                                <div className="card p-3 shadow">
                                    <h6>Booking Summary</h6>
                                    <p>{dates.checkin} → {dates.checkout}</p>
                                    {selectedRooms.map((room, i) => (
                                        <div key={i} className="d-flex justify-content-between">
                                            <span>{room.Name} × {room.qty}</span>
                                            <span>₹{room.Price * room.qty}</span>
                                        </div>
                                    ))}
                                    <hr />
                                    <h5>₹{selectedRooms.reduce((t, r) => t + r.Price * r.qty, 0)}
                                    </h5>
                                    <button className="btn btn-gradient w-100 mt-2"
                                        onClick={() => {
                                            if (!customer.name || !customer.email || !customer.contact) {
                                                alert("Please fill all details");
                                                return;
                                            }
                                            selectedRooms.forEach(r => {
                                                axios.post("http://localhost:1000/book-room", {
                                                    roomId: r._id,
                                                    roomName: r.Name,
                                                    checkIn: dates.checkin,
                                                    checkOut: dates.checkout,
                                                    guests: dates.guests,
                                                    customerName: customer.name,
                                                    customerEmail: customer.email,
                                                    customerContact: customer.contact,
                                                    note: customer.note
                                                });
                                            });
                                            alert("Booking Successful");
                                            resetAll();
                                        }}>
                                        Make Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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