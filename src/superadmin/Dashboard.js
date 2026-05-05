import { FaClipboardList, FaRegClock, FaRupeeSign } from "react-icons/fa";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { SlGraph } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const list = [
        { name: "TOTAL BOOKINGS", number: "1,284", desc: "+12.5% from last month", icon: <FaClipboardList color="white" className="mb-1" />, bg: "bg-primary" },
        { name: "REVENUE", number: "284,500", desc: "+8.2% from last month", icon: <FaRupeeSign color="white" className="mb-1" />, bg: "bg-success" },
        { name: "OCCUPANCY RATE", number: "78%", desc: "+3.1% from last month", icon: <SlGraph color="white" className="mb-1" />, bg: "bg-warning" },
        { name: "PENDING REQUESTS", number: "23", desc: "-5 from last month", icon: <FaRegClock color="white" className="mb-1" />, bg: "bg-danger" },
    ]

    const listt2 = [
        { name: "James Wilson", room: "Ocean Suite", dates: "2024-12-15 → 2024-12-18", status: "Confirmed" },
        { name: "Sarah Chen", room: "Garden Villa", dates: "2024-12-16 → 2024-12-20", status: "Pending" },
        { name: "Marco Rossi", room: "Deluxe King", dates: "2024-12-17 → 2024-12-19", status: "Confirmed" },
        { name: "Emily Park", room: "Presidential Suite", dates: "2024-12-20 → 2024-12-25", status: "Cancelled" }
    ]

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
                                <h3 className="p-0 m-0">Dashboard Content</h3>
                                <p className="small m-0 p-0">Welcome back, Admin. Here's your overview.</p>
                            </div>
                            <div className="row g-3 py-2">
                                {list.map((row) => (
                                    <div className="col-lg-3 col-md-6 col-6">
                                        <div className="card shadow-sm border-0 p-3 rounded-4">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <small className="text-muted">{row.name}</small>
                                                    <h4 className="fw-bold">{row.number}</h4>
                                                    <small className="text-success">{row.desc}</small>
                                                </div>
                                                <div className={`btn align-items-center ${row.bg}`}>
                                                    {row.icon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="row mt-0 g-3">
                                <div className="col-lg-8">
                                    <div className="card shadow-sm border-0 rounded-4 p-3">
                                        <h6 className="fw-bold mb-3">Revenue Overview</h6>
                                        <div style={{ minHeight: "250px" }} className="d-flex align-items-center justify-content-center bg-light rounded">
                                            <p className="text-muted">Graph will go here</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card shadow-sm border-0 rounded-4 p-3">
                                        <h6 className="fw-bold mb-3">Booking Distribution</h6>
                                        <div className="d-flex align-items-center justify-content-center mb-3" style={{ height: "200px" }}>
                                            <div style={{
                                                width: "120px",
                                                height: "120px",
                                                borderRadius: "50%",
                                                background: "conic-gradient(#4f46e5 60%, #f59e0b 24%, #10b981 16%)"
                                            }}>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mb-1">
                                                <span className="badge bg-primary me-2"> </span>
                                                Confirmed <span className="float-end">60%</span>
                                            </p>
                                            <p className="mb-1">
                                                <span className="badge bg-warning me-2"> </span>
                                                Pending <span className="float-end">24%</span>
                                            </p>
                                            <p>
                                                <span className="badge bg-success me-2"> </span>
                                                Cancelled <span className="float-end">16%</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="card border-0 shadow-sm rounded-4 p-3">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="fw-bold m-0">Recent Bookings</h6>
                                            <Link to="/superadmin/Bookings">
                                                <button className="btn btn-sm text-primary fw-semibold">
                                                    View All →
                                                </button>
                                            </Link>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>GUEST</th>
                                                        <th>ROOM</th>
                                                        <th>DATES</th>
                                                        <th>STATUS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listt2.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-semibold">{item.name}</td>
                                                            <td className="text-muted">{item.room}</td>
                                                            <td className="text-muted">{item.dates}</td>
                                                            <td>
                                                                <span className={`badge px-3 py-2 rounded-pill ${item.status === "Confirmed"
                                                                    ? "bg-success-subtle text-success"
                                                                    : item.status === "Pending"
                                                                        ? "bg-warning-subtle text-warning"
                                                                        : "bg-danger-subtle text-danger"
                                                                    }`}>
                                                                    {item.status}
                                                                </span>
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
                </div>
            </div>
        </>
    )
}