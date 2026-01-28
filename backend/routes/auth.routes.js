import express from "express";
import { signup, login, logout } from "../controllers/auth.controllers.js";
import upload from "../middlewares/uploadMiddleware.js";


const router = express.Router()


router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.post("/upload-image", upload.single("image"), (req, res) => {
    if(!req.file){
        return res.status(400).json({message: "No file upload"})
    }
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}}`;
    res.status(200).json({imageurl})
})


export default router;