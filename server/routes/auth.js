import express from "express";
import { loginUser, registerUser, resendResetPasswordMail, resetPassword, sendResetPasswordMail, verifyOtp } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset-password", sendResetPasswordMail);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password-form",resetPassword);
router.post("/resend-otp", resendResetPasswordMail);

export default router;