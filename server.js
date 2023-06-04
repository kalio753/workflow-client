const axios = require("axios")
const express = require("express")
const path = require("path")
const multer = require("multer")
const https = require("https")
require("dotenv").config()
const TemplateController = require("./controllers/template")
const FolderController = require("./controllers/folder")
const UserController = require("./controllers/user")
const StepController = require("./controllers/step")
const SampleController = require("./controllers/sampledata")
const PORT = 5000

const app = express()

app.use("/files", express.static("files"))
app.use(express.static("files"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, OPTIONS",
        "DELETE"
    )
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-Type"
    )
    res.setHeader("Access-Control-Allow-Credentials", true)
    next()
})

// ------------------------------------------------------------------------------------

// Root
// app.get("/", async (req, res) => {
//     res.json("This is root page")
// })

// User
app.post("/me/templates", UserController.my_templates)

app.post("/me/doc/submit", UserController.submit_template)

app.post("/me/doc/action", UserController.submit_action)

app.post("/me/sendto", UserController.doc_sent_to_me)

app.post("/me/sentby", UserController.doc_sent_by_me)

app.post("/me/doc/:doc_id/detail", UserController.doc_detail)

// Folder
app.post("/wm/folder/create", FolderController.create_folder)

app.post("/wm/folder/list", FolderController.get_folder)

// Template
app.post("/template/create", TemplateController.create_template)

app.post("/template/list", TemplateController.get_template)

app.post("/template/update", TemplateController.update_template)

app.post("/template/delete", TemplateController.del_template)

// Step
app.post("/step/create", StepController.create_step)

app.post("/step/workflow", StepController.get_step)

// Actions
app.post("/me/actions", (req, res) => {
    console.log("call list actions EXPRESS")
    const token = req.body.token
    const doc_id = req.body.doc_id
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + "/me/actions/" + doc_id,
        })
        .then((response) => res.json(response.data))
        .catch((err) => res.json(err.response.data))
})

// Sample Data
app.post("/sampledata/part/list", SampleController.get_path)

app.post("/sampledata/position/list", SampleController.get_position)

app.post("/sampledata/user/list", SampleController.get_user)

// ------------------------------------------------------------------------------------

// Handle React routing, return all requests to React app
// app.use(express.static(path.join(__dirname, "./dist")))

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./dist", "index.html"))
// })

// Handle file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files")
    },

    filename: (req, file, cb) => {
        console.log(file)
        // cb(null, Date.now() + path.extname(file.originalname))
        cb(null, Date.now() + "_" + file.originalname)
    },
})

const maxFileSize = 3 * 1024 * 1024 // 3 MB
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        var ext = path.extname(file.originalname)
        if (
            ext !== ".png" &&
            ext !== ".jpg" &&
            ext !== ".gif" &&
            ext !== ".webm" &&
            ext !== ".jpeg" &&
            ext !== ".txt" &&
            ext !== ".doc" &&
            ext !== ".docx" &&
            ext !== ".xlsx" &&
            ext !== ".xls" &&
            ext !== ".pdf" &&
            ext !== ".mp3" &&
            ext !== ".mp4"
        ) {
            return cb(new Error("Only images & documents are allowed"))
        }
        cb(null, true)
    },
    limits: { fileSize: maxFileSize },
}).single("file")

app.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.\
            res.json(err)
        } else if (err) {
            // An unknown error occurred when uploading.
            res.json({ code: err.message })
            console.log(err)
        } else {
            // Everything went fine.
            console.log(req.file)
            if (req.file) {
                res.json(`/${req.file.destination}/${req.file.filename}`)
            } else {
                //
            }
        }
    })
})

// app.post("/upload", upload.single("file"), (req, res) => {
//     console.log("Uploading pictures...")
//     try {
//         console.log(req.file.destination + "/" + req.file.filename)
//         res.json({ result: true })
//     } catch (e) {
//         throw new Error(fileError)
//     }
// })
// if (process.env.NODE_ENV === 'production') {

// Serve any static files
app.use(express.static(path.join(__dirname, "dist")))

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    // res.sendFile("index.html", { root: "dist" })
})
// }

app.listen(PORT, () => {
    console.log(`Running this application on the Port ${PORT}`)
})
