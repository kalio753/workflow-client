require("dotenv").config()
const axios = require("axios")

exports.create_folder = (req, res) => {
    console.log("call create folder EXPRESS")
    const token = req.body.token

    axios
        .request({
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: req.body.name,
            },
            url: process.env.BACKEND_DOMAIN + "/folder/create",
        })
        .then((response) => res.json(response.data))
        .catch((err) => {
            res.json(err)
        })

    // axios
    //     .post(process.env.BACKEND_DOMAIN + "/wm/folder/create", {
    //         name: req.body.name,
    //     })
    //     .then((response) => {
    //         res.json(response.data)
    //     })
    //     .catch((err) => console.log("err nè: ", err))
}

exports.get_folder = (req, res) => {
    console.log("call list folder EXPRESS")
    const token = req.body.token
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + "/folder/list",
        })
        .then((response) => res.json(response.data))
        .catch((err) => res.json(err.response.data))
}
