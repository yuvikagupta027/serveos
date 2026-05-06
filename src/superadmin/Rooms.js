import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaBed, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Rooms() {

    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState(null);

    function submitrooms(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var name = data.get("name");
        var price = data.get("price");
        var capacity = data.get("capacity");
        var image = data.get("image");
        var amenities = {
            wifi: data.get("wifi") ? true : false,
            ac: data.get("ac") ? true : false,
            minibar: data.get("minibar") ? true : false,
            oceanview: data.get("oceanview") ? true : false,
            balcony: data.get("balcony") ? true : false,
            pool: data.get("pool") ? true : false,
            kitchen: data.get("kitchen") ? true : false,
            jacuzzi: data.get("jacuzzi") ? true : false,
        };

        axios.post("https://serveos-1.onrender.com/addroom", {
            Name: name,
            Price: Number(price),
            Capacity: Number(capacity),
            Image: image,
            Amenities: amenities,
            Status: "Available"
        }).then((succ) => {
            alert("Room added successfully!");
            fetchrooms();
            e.target.reset();
        })
    }

    const [rooms, setrooms] = useState([]);

    function fetchrooms() {
        axios.post("https://serveos-1.onrender.com/fetchrooms").then((succ) => {
            setrooms(succ.data)
        })
    }

    useEffect(() => {
        fetchrooms()
    }, [])

    function deletee(x) {
        axios.post("https://serveos-1.onrender.com/deleteroom", {
            Id: x,
        }).then((succ) => {
            if (succ.data === "ok") {
                alert("Room deleted Successfully!");
                fetchrooms();
            }
        })
    }

    function handleUpdate(e) {
        e.preventDefault();

        const updated = {
            Price: Number(editData.Price),
            Capacity: Number(editData.Capacity),
            Amenities: editData.Amenities
        };

        axios.post("https://serveos-1.onrender.com/updateroom", {
            Id: editId,
            ...updated
        }).then(() => {
            alert("Room Updated ✅");
            fetchrooms();
        });
    }

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
                            <div className="px-2 d-flex align-items-center justify-content-between">
                                <div>
                                    <h3 className="p-0 m-0">Rooms</h3>
                                    <p className="small m-0 p-0">Manage your property rooms.</p>
                                </div>
                                <div>
                                    <button data-bs-toggle="modal" data-bs-target="#modal" className="btn btn-primary">+ Add Room</button>
                                </div>
                            </div>
                            <div className="row g-3 mt-2 mb-3">
                                {rooms.map((row, index) => (
                                    <div key={row._id} className="col-lg-4 col-6">
                                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ minHeight: 340 }}>
                                            <div className="position-relative bg-primary-subtle d-flex align-items-center justify-content-center"
                                                style={{ height: "160px", objectFit: "cover" }}>
                                                <img
                                                    src={row.Image} alt=""
                                                    className="w-100 h-100"
                                                    style={{ objectFit: "cover" }} />
                                                <span className={`badge position-absolute top-0 end-0 m-2 px-3 py-1 rounded-pill ${row.Status === "Available"
                                                    ? "bg-success-subtle text-success"
                                                    : "bg-warning-subtle text-warning"
                                                    }`}>
                                                    {row.Status}
                                                </span>
                                            </div>
                                            <div className="p-3">
                                                <h6 className="fw-bold mb-1 text-capitalize">{row.Name}</h6>
                                                <p className="text-muted small mb-2">
                                                    ₹{row.Price}/night • {row.Capacity} guests
                                                </p>
                                                <div style={{ minHeight: 50 }}>
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
                                                <div className="d-flex gap-2 mt-3 flex-wrap">
                                                    <button onClick={() => {
                                                        setEditId(row._id);
                                                        setEditData(row);
                                                    }}
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#editModal"
                                                        className="btn btn-dark flex-fill rounded-pill fw-semibold">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => deletee(row._id)} className="btn btn-danger rounded-pill px-3">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="modal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3 mt-3 mb-0 pb-0">
                            <h5>Add Rooms</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="px-3 py-1 mb-3">
                            <form onSubmit={submitrooms}>
                                <label className="form-label small text-dark p-0 m-0">Room Name</label>
                                <input required type="text" placeholder="e.g. ocean suite" name="name" className="form-control mb-3" />
                                <div className="d-flex gap-2">
                                    <div className="col-lg-6 col-6">
                                        <label className="form-label small text-dark p-0 m-0">Price/Night(₹)</label>
                                        <input required type="number" min={5000} placeholder="6480" name="price" className="form-control mb-3" />
                                    </div>
                                    <div className="col-lg-6 col-6">
                                        <label className="form-label small text-dark p-0 m-0">Capacity</label>
                                        <input required type="number" min={1} max={3} placeholder="2" name="capacity" className="form-control mb-3" />
                                    </div>
                                </div>
                                <div className="p-0 m-0">
                                    <label className="form-label small text-dark p-0 m-0">Amenities</label>
                                    <div className="d-flex flex-wrap align-items-center rounded-3 mb-2">
                                        <div className="form-check">
                                            <input type="checkbox" name="wifi" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">WiFi</label>
                                        </div>

                                        <div className="form-check">
                                            <input type="checkbox" name="ac" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">AC</label>
                                        </div>

                                        <div className="form-check">
                                            <input type="checkbox" name="minibar" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">Mini Bar</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" name="oceanview" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">Ocean View</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" name="balcony" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">Balcony</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" name="pool" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">Pool</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" name="kitchen" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">Kitchen</label>
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" name="jacuzzi" className="me-1 form-check-input" />
                                            <label className="form-check-label text-dark me-3">Jacuzzi</label>
                                        </div>
                                    </div>
                                </div>
                                <label className="form-label small text-dark p-0 m-0">Image</label>
                                <input type="url" name="image" className="form-control mb-2" placeholder="like https://...." />
                                <button type="submit" className="btn btn-danger">Add Room</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="d-flex justify-content-between px-3 mt-3">
                            <h5>Edit Room</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="px-3 py-2 mb-3">
                            {editData && (
                                <form onSubmit={handleUpdate}>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="col-6">
                                            <label className="form-label p-0 m-0 small">Price</label>
                                            <input className="form-control" type="number" name="price" value={editData?.Price || ""}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, Price: e.target.value })
                                                } />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label p-0 m-0 small">Capacity</label>
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="capacity"
                                                value={editData?.Capacity || ""}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, Capacity: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <label className="form-label small p-0 m-0 mt-2">Amenities</label>
                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                        {[
                                            { key: "wifi", label: "WiFi" },
                                            { key: "ac", label: "AC" },
                                            { key: "minibar", label: "Mini Bar" },
                                            { key: "oceanview", label: "Ocean View" },
                                            { key: "balcony", label: "Balcony" },
                                            { key: "pool", label: "Pool" },
                                            { key: "kitchen", label: "Kitchen" },
                                            { key: "jacuzzi", label: "Jacuzzi" }
                                        ].map((item) => (
                                            <div className="form-check" key={item.key}>
                                                <input
                                                    type="checkbox"
                                                    name={item.key}
                                                    checked={editData?.Amenities?.[item.key] || false}
                                                    onChange={(e) =>
                                                        setEditData({
                                                            ...editData,
                                                            Amenities: {
                                                                ...editData.Amenities,
                                                                [item.key]: e.target.checked
                                                            }
                                                        })
                                                    }
                                                    className="form-check-input"
                                                />
                                                <label className="form-check-label">
                                                    {item.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn btn-primary w-100">
                                        Update Room
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}