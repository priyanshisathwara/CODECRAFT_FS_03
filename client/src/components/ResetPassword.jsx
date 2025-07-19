import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResetPassword.css";

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

const validateNewPassword = (values) => {
    const errors = {};

    if (!values.email || !email_pattern.test(values.email)) {
        errors.email = "Please enter a valid email";
    }

    if (!values.newPassword || values.newPassword.trim() === "") {
        errors.newPassword = "New password should not be empty";
    } else if (!password_pattern.test(values.newPassword)) {
        errors.newPassword = "Password must contain at least 6 characters, including uppercase, lowercase, special character, and number";
    }

    if (!values.confirmNewPassword || values.confirmNewPassword.trim() === "") {
        errors.confirmNewPassword = "Confirm password should not be empty";
    } else if (values.confirmNewPassword !== values.newPassword) {
        errors.confirmNewPassword = "Passwords do not match";
    }

    return errors;
};

function ResetPassword() {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmNewPassword: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateNewPassword(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            toast.error("Please correct the errors before submitting.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/reset-password-form", {
                email: formData.email,
                password: formData.newPassword
            });

            if (response.data.status === "Success") {
                toast.success("Password updated successfully!");
                navigate("/login");
            } else {
                toast.error(response.data.message || "Failed to reset password.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h3 className="reset-password-title">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="reset-password-form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="reset-password-input"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="reset-password-error">{errors.email}</p>}
                    </div>

                    <div className="reset-password-form-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            className="reset-password-input"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        {errors.newPassword && <p className="reset-password-error">{errors.newPassword}</p>}
                    </div>

                    <div className="reset-password-form-group">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            placeholder="Confirm new password"
                            className="reset-password-input"
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmNewPassword && <p className="reset-password-error">{errors.confirmNewPassword}</p>}
                    </div>

                    <button type="submit" className="reset-password-btn">Update Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
