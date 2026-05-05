import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Settings() {

    const [form, setForm] = useState({
        name: "ServeOS Resort & Spa",
        address: "123 Oceanfront Drive, Paradise Bay, PB 90210",
        phone: "+1 555-0100",
        whatsapp: "+1 555-0100"
    });

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form);
        alert("Changes Saved!");
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
                        <div className="container px-2">
                            <div className="px-2 d-flex align-items-center justify-content-between">
                                <div>
                                    <h3 className="p-0 m-0">Settings</h3>
                                    <p className="small m-0 p-0">Manage resort details.</p>
                                </div>
                            </div>
                            <div className="card shadow-sm border-0 rounded-4 p-4" style={{ maxWidth: "600px" }}>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Resort Name</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control rounded-3" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Address</label>
                                        <textarea name="address" value={form.address} onChange={handleChange} className="form-control rounded-3" rows="3" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small text-muted">Phone</label>
                                            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="form-control rounded-3" />
                                        </div>

                                        <div className="col-md-6 mb-3">
                                            <label className="form-label small text-muted">WhatsApp</label>
                                            <input type="text" name="whatsapp" value={form.whatsapp} onChange={handleChange} className="form-control rounded-3" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-danger">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}