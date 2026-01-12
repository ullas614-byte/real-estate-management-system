import express from "express";
import { getProfile, test } from "../Controllers/userControllers.js";
import { verifyUser } from "../Middleware/verifyUser.js";


const router = express.Router();

router.get('/test', test)
router.get('/profile', verifyUser, getProfile)

export default router;