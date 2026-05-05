import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Bookings() {

    const [statusFilter, setStatusFilter] = useState("All");
    const [bookings, setBookings] = useState([]);

    function fetchbookings() {
        axios.post("http://localhost:1000/fetchbookingss")
            .then((res) => {
                setBookings(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchbookings();
    }, []);

    function deletee(x) {
        axios.post("http://localhost:1000/deletebookingss", {
            Id: x,
        }).then((succ) => {
            if (succ.data === "ok") {
                alert("Booking deleted Successfully!");
                fetchbookings();
            }
        })
    }

    const filteredBookings =
        statusFilter === "All"
            ? bookings
            : bookings.filter(b => b.status === statusFilter);

    return (
        <>
            <div className="container-fluid">
                <div className="row g-0">
                    <div className="col-lg-2 d-lg-block">
                        <Sidebar />
                    </div>

                    <div className="col-lg-10 col-12 min-vh-100">
                        <Navbar />
                        <div className="container-fluid px-2">
                            <div className="px-2">
                                <h3 className="m-0">Bookings</h3>
                                <p className="small m-0">Manage all reservations.</p>
                            </div>
                            <div className="mt-3 ms-1">
                                <div className="d-flex gap-3 mb-3">
                                    <input type="date" className="form-control" style={{ maxWidth: "180px" }} />
                                    <select className="form-select" style={{ maxWidth: "180px" }} value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}>
                                        <option>All</option>
                                        <option>Confirmed</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card border-0 shadow-sm rounded-4 p-3">
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>GUEST</th>
                                                <th>ROOM</th>
                                                <th>CHECK-IN</th>
                                                <th>CHECK-OUT</th>
                                                <th>GUESTS</th>
                                                <th>STATUS</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBookings.map((b, i) => (
                                                <tr key={i}>
                                                    <td className="fw-semibold">{b.customerName}</td>
                                                    <td className="text-muted">{b.roomName}</td>
                                                    <td>{b.checkIn}</td>
                                                    <td>{b.checkOut}</td>
                                                    <td>{b.guests}</td>
                                                    <td>
                                                        <span className={`badge px-3 py-2 rounded-pill 
                                                            ${b.status === "Confirmed"
                                                                ? "bg-success-subtle text-success"
                                                                : b.status === "Pending"
                                                                    ? "bg-warning-subtle text-warning"
                                                                    : "bg-danger-subtle text-danger"
                                                            }`}>
                                                            {b.status || "Confirmed"}
                                                        </span>
                                                    </td>
                                                    <td className="d-flex align-items-center gap-2">
                                                        <button onClick={() => deletee(b._id)} className="btn btn-danger py-1">
                                                            <MdDelete />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}