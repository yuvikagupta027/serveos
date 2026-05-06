import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [tab, settab] = useState(0);
    const navi = useNavigate();

    function registerform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var name = data.get("name");
        var contact = data.get("contact");
        var email = data.get("email");
        var pass = data.get("pass");

        axios.post("https://serveos-1.onrender.com/registerform", {
            Name: name,
            Contact: contact,
            Email: email,
            Pass: pass,
        }).then((succ) => {
            console.log(succ.data);
            localStorage.setItem('login', succ.data.insertedId);
            alert("you are registered.!");
            e.target.reset();
        })
    }

    function loginform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var email2 = data.get("email2");
        var pass2 = data.get("pass2");

        axios.post("https://serveos-1.onrender.com/loginform", {
            Email: email2,
            Pass: pass2,
        }).then((succ) => {
            if (succ.data) {
                localStorage.setItem('login', succ.data._id);
                navi("/superadmin/Dashboard")
            } else {
                alert("wrong email or password, Please try again.")
                // e.target.name2.focus();
            }
        })
    }

    function checkuser() {
        var id = localStorage.getItem("login")
        console.log(id);

        if (id) {
            axios.post("https://serveos-1.onrender.com/logincheck", { Id: id }).then((succ) => {
                if (succ.data) {
                    navi("/superadmin/Dashboard")
                }
            })
        }
    }

    useEffect(() => {
        checkuser();
    }, [])

    return (
        <>
            <div className="row m-0 vh-100 justify-content-center align-items-center bg-primary-subtle p-4">
                <div className="col-lg-4 card p-3 content-container shadow rounded-4 m-0 pb-0">
                    <ul className="nav nav-tabs nav-justified">
                        <li className="nav-item" onClick={() => settab(0)}>
                            <a className={tab == 0 ? "nav-link text-light bg-primary fw-bold active" : "nav-link bg-light text-dark fw-bold"}>Signup</a>
                        </li>
                        <li className="nav-item" onClick={() => settab(1)}>
                            <a className={tab == 1 ? "nav-link text-light fw-bold bg-primary active" : "nav-link bg-light text-dark fw-bold"}>Login</a>
                        </li>
                    </ul>
                    {tab == 0 && (
                        <form onSubmit={registerform}>
                            <div className="card-body text-dark mt-3 px-2 m-0 p-0">
                                <input type="text" name="name" className="form-control mb-2" placeholder="Add Name" />
                                <input type="tel" name="contact" className="form-control mb-2" placeholder="Add Contact" />
                                <input type="email" name="email" className="form-control mb-2" placeholder="Add Email" />
                                <input type="password" name="pass" className="form-control mb-2" placeholder="Add Password" />
                                <button type="submit" className="btn btn-danger mt-1">SignUp</button>
                                <div className="d-flex w-100 align-items-center justify-content-center mt-2">
                                    <p>Have an Account?</p> &nbsp;
                                    <button onClick={() => settab(1)} className="m-0 btn p-0 mb-3 bg-dark-subtle text-dark px-2">Login</button>
                                </div>
                            </div>
                        </form>
                    )}
                    {tab == 1 && (
                        <form onSubmit={loginform}>
                            <div className="card-body text-dark mt-3 px-2 m-0 p-0">
                                <input type="email" name="email2" className="form-control mb-2" placeholder="Add Email" />
                                <input type="password" name="pass2" className="form-control mb-2" placeholder="Add Password" />
                                <button type="submit" className="btn btn-danger mt-1">Login</button>
                                <div className="d-flex w-100 align-items-center justify-content-center mt-2">
                                    <p>Dont have an Account?</p> &nbsp;
                                    <button onClick={() => settab(0)} className="m-0 btn p-0 mb-3 bg-dark-subtle text-dark px-2">SignUp</button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}