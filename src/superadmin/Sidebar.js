import { AiFillDashboard } from "react-icons/ai";
import { BiCalculator } from "react-icons/bi";
import { FaClipboardList, FaGlobe, FaRegSquare, FaUserCheck, FaUsers } from "react-icons/fa";
import { HiMiniComputerDesktop, HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoIosStats } from "react-icons/io";
import { IoRestaurant, IoSettings } from "react-icons/io5";
import { MdLogout, MdOutlineInventory, MdOutlineLibraryBooks } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

    const navi = useNavigate();
    const id = localStorage.getItem("login");

    const list = [
        { link: "/superadmin/Dashboard", name: "Dashboard", icon: <AiFillDashboard size={17} /> },
        // { link: "/superadmin/Resort", name: "Resort", icon: <IoRestaurant size={17} /> },
        { link: "/superadmin/Rooms", name: "Rooms", icon: <MdOutlineLibraryBooks size={17} /> },
        { link: "/superadmin/Bookings", name: "Bookings", icon: <FaRegSquare size={17} /> },
        { link: "/superadmin/Calendar", name: "Calendar", icon: <FaClipboardList size={17} /> },
        { link: "/superadmin/Leads", name: "Leads", icon: <FaUsers size={17} /> },
        { link: "/superadmin/Gallery", name: "Gallery", icon: <MdOutlineInventory size={17} /> },
        // { link: "/superadmin/Reviews", name: "Reviews", icon: <IoIosStats size={17} /> },
        { link: "/superadmin/Settings", name: "Settings", icon: <IoSettings size={17} /> },
    ]

    function logout() {
        if (id) {
            localStorage.removeItem("login");
            navi("/superadmin/")
        }
    }

    return (
        <>
            <div className="d-none d-lg-flex flex-column bg-light text-dark min-vh-100 p-0 position-fixed" style={{ width: "250px", zIndex: 1000 }}>
                <div className="d-flex align-items-center justify-content-center">
                    <span className="card colorrr text-light p-1">
                        <BiCalculator size={20} />
                    </span>
                    <h4 className="p-3 mt-2 text-dark">ServeOS</h4>
                </div>
                <ul className="nav flex-column w-100">
                    {list.map((row, index) => (
                        <li className="nav-item w-100">
                            <NavLink
                                to={row.link}
                                className={({ isActive }) =>
                                    `mx-3 nav-link sidebar-link d-flex align-items-center gap-2 fw-bold ${isActive ? "active-link" : ""
                                    }`
                                }>
                                {row.icon}
                                {row.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto w-100">
                    <div className="p-3">
                        <button onClick={logout} className="btn btn-danger align-items-center w-100">
                            <MdLogout size={18} className="mb-1" /> Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
                <div className="offcanvas-header">
                    <h5 className="fw-bold">POS System</h5>
                    <button className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body p-0">
                    <ul className="nav flex-column">
                        {list.map((row, index) => (
                            <li key={index} className="nav-item">
                                <NavLink to={row.link} className="nav-link text-dark fw-bold d-flex align-items-center gap-2 px-3">
                                    {row.icon}
                                    {row.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="p-3">
                        <button onClick={logout} className="btn btn-danger align-items-center w-100">
                            <MdLogout size={18} className="mb-1" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}