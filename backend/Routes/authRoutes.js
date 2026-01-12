import express from "express";
import { signup, signin } from "../Controllers/authControllers.js";
import { verifyUser } from "../Middleware/verifyUser.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", verifyUser,(req,res)=>{
    res.json({
        message: "Welcome",
        userId: req.user.id,
    })
})

export default router;