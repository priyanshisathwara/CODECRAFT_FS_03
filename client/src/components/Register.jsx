import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "./Register.css"
import axios from "axios";


export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        role: "user"
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = Validation("", formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please enter valid input");
            return;
        }

        console.log(formData);


        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {
                const data = response.data;

                // Save user data to localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success("Registered successfully!");
                navigate("/");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            toast.error(err?.response?.data?.message || "Something went wrong!");
        }

    }


    const Validation = (key = "", values) => {
        console.log("kjhgf")
        let error = {};

        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;


        if (!values.role || (values.role !== "user" && values.role !== "owner")) {
            error.role = "Please select a valid role";
        }


        if (!key || key == "" || key == "checkName") {
            if (!values.name || values.name.trim() === "") {
                error.name = "name should not be empty";
            }
        }

        if (!values?.email || values?.email?.trim() === "") {
            if (!key || key == "" || key == "checkEmail") {
                error.email = "Email should not be empty";
            }
        } else if (!email_pattern.test(values.email)) {
            if (!key || key == "" || key != "checkEmail") {
                error.email = "Invalid email format";
            }
        }

        if (!key || key == "" || key == "checkPassword") {
            if (!values.password || values.password.trim() === "") {
                error.password = "Password should not be empty";
            } else if (!password_pattern.test(values.password)) {
                error.password = "Password must contain at least 6 characters, including uppercase, lowercase, special character and number";
            }
        }
        if (!key || key === "checkConfirmPassword") {
            if (!values.confirm_password || values.confirm_password.trim() === "") {
                error.confirm_password = "Confirm password should not be empty";
            } else if (values.confirm_password !== values.password) {
                error.confirm_password = "Passwords do not match";
            }
        }
        console.log(error)

        return error;

    }

    return (
        <div className="register-page-container">
            <div className="register-box">
                <h2 className="register-title">Register</h2>
                <div className="register-radio-group">
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={formData.role === "user"}
                            onChange={handleChange}
                        />
                        User
                    </label>
                    <label style={{ marginLeft: '20px' }}>
                        <input
                            type="radio"
                            name="role"
                            value="owner"
                            checked={formData.role === "owner"}
                            onChange={handleChange}
                        />
                        Admin
                    </label>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="register-form-group">
                        <label><strong>Name</strong></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            autoComplete="off"
                            className="register-input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors?.name && <span className="register-error">{errors.name}</span>}
                    </div>

                    <div className="register-form-group">
                        <label><strong>Email</strong></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="register-input"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors?.email && <span className="register-error">{errors.email}</span>}
                    </div>

                    <div className="register-form-group">
                        <label><strong>Password</strong></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            className="register-input"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors?.password && <span className="register-error">{errors.password}</span>}
                    </div>

                    <div className="register-form-group">
                        <label><strong>Confirm Password</strong></label>
                        <input
                            type="password"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            className="register-input"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                        {errors?.confirm_password && <span className="register-error">{errors.confirm_password}</span>}
                    </div>

                    <button type="submit" className="register-btn">Register</button>
                </form>

                <p className="register-login-text">Already Have an Account?</p>
                <Link to="/login" className="register-login-btn">Login</Link>
            </div>
            <ToastContainer />
        </div>

    )
}

