import express from "express";
import { DeleteVideo, UpdateVideo, addVideo, GetVideo, addView, trend, random, sub, Getbytags, search } from "../controllers/video.js";
// import { verifyToken } from "server/verifyToken.js"
import { verifyToken } from "../verifyToken.js";


const router = express.Router()


router.post("/" , verifyToken ,addVideo)
router.put("/:id" , verifyToken ,addVideo)
router.delete("/:id" , verifyToken ,addVideo)
router.get("/find/:id"  ,addVideo)
router.put("/view/:id"  ,addView)
router.get("/trend"  ,trend)
router.get("/random"  ,random)
router.get("/sub" , verifyToken ,sub)
router.get("/tags"  ,Getbytags)
router.get("/search"  ,search)

export default router