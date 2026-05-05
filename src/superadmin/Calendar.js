import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [status, setStatus] = useState({});

    function generateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        let calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(null);
        }

        for (let i = 1; i <= totalDays; i++) {
            calendarDays.push(i);
        }

        setDays(calendarDays);
    };

    function fetchAllDates() {
        let bookingMap = {};

        axios.post("http://localhost:1000/get-bookings")
            .then((res) => {
                res.data.forEach((row) => {
                    let start = new Date(row.checkIn);
                    let end = new Date(row.checkOut);
                    while (start < end) {
                        const key = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
                        bookingMap[key] = {
                            status: "occupied",
                            roomName: row.roomName,
                            customer: row.customerName
                        };
                        start.setDate(start.getDate() + 1);
                    }
                });
                axios.post("http://localhost:1000/get-blocked-dates")
                    .then((res2) => {
                        res2.data.forEach((d) => {
                            bookingMap[d.date] = {
                                status: "blocked"
                            };
                        });
                        setStatus(bookingMap);
                    });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        generateCalendar();
        fetchAllDates();
    }, [currentDate]);

    function unblockDate(day) {
        const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        axios.post("http://localhost:1000/unblock-date", { date: key })
            .then(() => {
                alert("Date Unblocked");
                fetchAllDates();
            })
            .catch(err => console.log(err));
    }

    function prevMonth() {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    function nextMonth() {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    function blockDate(day) {
        const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
        axios.post("http://localhost:1000/block-date", { date: key })
            .then(() => {
                alert("Date Blocked");
                fetchAllDates();
            })
            .catch(err => console.log(err));
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
                        <div className="container-fluid px-3 mt-3">
                            <h4>Admin Calendar</h4>
                            <div className="d-flex justify-content-between mb-3">
                                <button className="btn btn-light fw-bold" onClick={prevMonth}>
                                    <FaAngleLeft size={20} />
                                </button>
                                <h5>
                                    {currentDate.toLocaleString("default", { month: "long" })}{" "}
                                    {currentDate.getFullYear()}
                                </h5>
                                <button className="btn btn-light fw-bold" onClick={nextMonth}>
                                    <FaAngleRight size={20} />
                                </button>
                            </div>
                            <div className="d-flex">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                                    <div key={d} className="flex-fill text-center fw-bold">{d}</div>
                                ))}
                            </div>
                            <div className="d-flex flex-wrap">
                                {days.map((day, index) => {
                                    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
                                    const currentStatus = status[key]?.status || "available";
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const currentDayDate = new Date(
                                        currentDate.getFullYear(),
                                        currentDate.getMonth(),
                                        day
                                    );
                                    const isPast = day && currentDayDate < today;
                                    return (
                                        <div key={index} style={{ width: "14.2%", padding: "5px" }}>
                                            <div onClick={() => {
                                                if (currentDayDate < today) {
                                                    alert("Past dates cannot be modified");
                                                    return;
                                                }
                                                if (currentStatus === "available") {
                                                    blockDate(day);
                                                }
                                                else if (currentStatus === "blocked") {
                                                    unblockDate(day);
                                                }
                                            }}
                                                style={{
                                                    padding: "10px", textAlign: "center", borderRadius: "8px",
                                                    cursor: isPast ? "not-allowed" : (currentStatus === "available" ? "pointer" : "not-allowed"),
                                                    opacity: isPast ? 0.5 : 1,
                                                    backgroundColor:
                                                        isPast ? "#f1f1f1" :
                                                            currentStatus === "available" ? "#d4edda" :
                                                                currentStatus === "occupied" ? "#f8d7da" :
                                                                    "#e2e3e5"
                                                }}>
                                                <div>{day}</div>
                                                {/* {status[key]?.roomName && (
                                                    <small className="d-block text-dark">
                                                        {status[key].roomName}
                                                    </small>
                                                )} */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}