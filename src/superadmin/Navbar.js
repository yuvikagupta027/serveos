import { FaSearch } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
    return (
        <>
            <div className="d-flex border-bottom p-3 justify-content-between align-items-center mb-3 bg-white">
                <div className="d-flex align-items-center gap-2">
                    <button type="button" className="btn btn-light d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
                        <MdMenu size={22} />
                    </button>
                    <div className="input-group">
                        <button className="btn btn-light"><FaSearch /></button>
                        <input type="text" className="form-control" placeholder="Search..." />
                    </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-danger">A</button>
                    <div className="d-none d-lg-block">
                        <p className="fw-bold mb-0">Admin User</p>
                        <small>Admin</small>
                    </div>
                </div>
            </div>
        </>
    )
}