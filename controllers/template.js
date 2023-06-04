require("dotenv").config()
const axios = require("axios")

exports.create_template = (req, res) => {
    console.log("call create template EXPRESS")

    const token = req.body.token
    axios
        .request({
            method: "post",
            url: process.env.BACKEND_DOMAIN + "/template/create",
            data: {
                folder_ID: req.body.folder_ID,
                desc: req.body.desc,
                name: req.body.name,
                jsondata: req.body.jsondata,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.get_template = (req, res) => {
    console.log("call list template api EXPRESS")
    const queryparam = req.query.folder_id
        ? `?folder_id=${req.query.folder_id}`
        : ""

    const token = req.body.token
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + `/template/list${queryparam}`,
        })
        .then((response) => res.json(response.data))
        .catch((err) => res.json(err.response.data))
}

exports.update_template = (req, res) => {
    console.log("call update template api EXPRESS")

    const token = req.body.token
    axios
        .request({
            method: "put",
            url: process.env.BACKEND_DOMAIN + "/template/update",
            data: {
                id: req.body.id,
                folder_ID: req.body.folder_ID,
                name: req.body.name,
                desc: req.body.desc,
                jsondata: req.body.jsondata,
                is_disable: req.body.is_disable,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.del_template = (req, res) => {
    console.log("call delete template api EXPRESS")

    const token = req.body.token
    axios
        .request({
            method: "delete",
            url: process.env.BACKEND_DOMAIN + "/template/delete/" + req.body.id,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            res.json(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}
