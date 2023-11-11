import express from 'express'
//import multer from 'multer'
import { postExample, getExample, updateExample, deleteExample, getExampleById } from "../controllers/example_controller.js"

//multer is for the Image uploader
// const upload = multer()

const router = express.Router()

router.post("/", postExample)
router.get("/", getExample)
router.get("/:id", getExampleById)
router.put("/:id", updateExample)
router.delete("/:id", deleteExample)

//TO DO: See better options for mobile app
// router.post("/upload", upload.single('pic'), postPostImg)
// router.get("/img/:id", getPostImg)

export default router