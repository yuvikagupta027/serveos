import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { MdDelete } from "react-icons/md";

export default function Leads() {

    const [leadss, setLeadss] = useState([]);

    function fetchleadss() {
        axios.post("https://serveos-1.onrender.com/fetchform").then((succ) => {
            setLeadss(succ.data)
        })
    }

    useEffect(() => {
        fetchleadss();
    }, [])

    function updateStatus(id, newStatus) {
        axios.post("https://serveos-1.onrender.com/update-lead-status", {
            Id: id,
            Status: newStatus
        })
            .then(() => {
                fetchleadss();
            })
            .catch(err => console.log(err));
    }

    function deletee(x) {
        axios.post("https://serveos-1.onrender.com/deleteform", {
            Id: x,
        }).then((succ) => {
            if (succ.data == "ok") {
                alert("Lead deleted successfully.!");
                fetchleadss();
            }
        })
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
                            <div className="px-2">
                                <h3 className="p-0 m-0">Leads</h3>
                                <p className="small m-0 p-0">Manage contact inquiries.</p>
                            </div>
                            <div className="card border-0 shadow-sm rounded-4 p-3">
                                <div className="table-responsive">
                                    <table className="table align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>NAME</th>
                                                <th>EMAIL</th>
                                                <th>MESSAGE</th>
                                                <th>DATE</th>
                                                <th>STATUS</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leadss.map((row) => (
                                                <tr key={row.id}>
                                                    <td>{row.Name}</td>
                                                    <td>{row.Email}</td>
                                                    <td>{row.Message}</td>
                                                    <td>{row.Date}</td>
                                                    <td>
                                                        <select
                                                            className={`form-select form-select-sm 
                                                            ${row.Status === "New" ? "bg-warning-subtle" : "bg-success-subtle"}`}
                                                            value={row.Status}
                                                            onChange={(e) => updateStatus(row._id, e.target.value)}
                                                        >
                                                            <option value="New">New</option>
                                                            <option value="Replied">Replied</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => deletee(row._id)} className="btn btn-success btn-sm">
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
    )
}