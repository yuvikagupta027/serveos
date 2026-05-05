import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";

export default function Gallery() {

    function submitimage(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var image = data.get("image");
        var name = data.get("name");

        axios.post("http://localhost:1000/addimage", {
            Image: image,
            Name: name,
        }).then((succ) => {
            alert("Image in gallery is added successfully!");
            fetchimages();
            e.target.reset();
        })
    }

    const [img, setimg] = useState([]);

    function fetchimages() {
        axios.post("http://localhost:1000/fetchimage").then((succ) => {
            setimg(succ.data)
        })
    }

    useEffect(() => {
        fetchimages();
    }, [])

    function deletee(x) {
        axios.post("http://localhost:1000/deleteimage", {
            Id: x,
        }).then((succ) => {
            if (succ.data === "ok") {
                alert("Image deleted Successfully!");
                fetchimages();
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
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="px-2">
                                    <h3 className="p-0 m-0">Gallery</h3>
                                    <p className="small m-0 p-0">Manage property images.</p>
                                </div>
                                <button data-bs-toggle="modal" data-bs-target="#modal" className="btn btn-primary">
                                    + Upload Image
                                </button>
                            </div>
                            <div className="row g-3 justify-content-start mb-3">
                                {img.map((row, index) => (
                                    <div key={index} className="col-lg-4 col-6">
                                        <div className="image-card">
                                            <img src={row.Image} alt="img" className="image" />
                                            <div className="overlay">
                                                <h6 className="p-0 m-0">{row.Name}</h6>
                                                <button onClick={() => deletee(row._id)} className="btn btn-danger btn-sm mt-2">
                                                    <FaTrash />
                                                </button>
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
                        <div className="modal-header">
                            <h5>Add Image</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={submitimage}>
                                <label className="form-label small text-dark p-0 m-0">Add Image</label>
                                <input required type="url" placeholder="https://.." name="image" className="form-control mb-3" />
                                <label className="form-label small text-dark p-0 m-0">Add Name</label>
                                <input required type="text" placeholder="Like Ocean Villa" name="name" className="form-control mb-3" />
                                <button type="submit" className="btn btn-danger">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}