require("dotenv").config()
const axios = require("axios")

exports.my_templates = (req, res) => {
    console.log("call list me/templates EXPRESS")
    const token = req.body.token
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + "/me/templates",
        })
        .then((response) => res.json(response.data))
        .catch((err) => res.json(err.response.data))
}

exports.submit_template = (req, res) => {
    console.log("call list me/doc/submit EXPRESS")

    const token = req.body.token

    const template_id = req.body.template_id
    const title = req.body.title
    const note = req.body.note
    const jsondata = req.body.jsondata
    const list_path = req.body.list_path

    axios
        .request({
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                template_id,
                title,
                note,
                jsondata,
                list_path,
            },
            url: process.env.BACKEND_DOMAIN + "/me/doc/submit",
        })
        .then((response) => res.json(response.data))
        .catch((err) => {
            res.json(err)
        })
}

exports.submit_action = (req, res) => {
    console.log("call list me/doc/action EXPRESS")

    const token = req.body.token

    const doc_id = req.body.doc_id
    const note = req.body.note
    const action_id = req.body.action_id
    const list_path = req.body.list_path
    const list_user = req.body?.list_user
    const list_part = req.body?.list_part
    const list_position = req.body?.list_position

    console.log(process.env.BACKEND_DOMAIN + "/me/doc/action/")

    let data = {
        action_id,
        doc_id,
        note,
        list_path,
    }
    if (list_user) {
        data["list_user"] = list_user
    } else if (list_part) {
        data["list_part"] = list_part
    } else if (list_position) {
        data["list_position"] = list_position
    }

    axios
        .request({
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { ...data },
            url: process.env.BACKEND_DOMAIN + "/me/doc/action/",
        })
        .then((response) => res.json(response.data))
        .catch((err) => {
            res.json(err)
        })
}

exports.doc_sent_to_me = (req, res) => {
    console.log("call list me/sendto EXPRESS")
    const token = req.body.token
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + "/me/sendto",
        })
        .then((response) => res.json(response.data))
        .catch((err) => res.json(err))
}

exports.doc_sent_by_me = (req, res) => {
    console.log("call list me/sentby EXPRESS")
    const token = req.body.token
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + "/me/sentby",
        })
        .then((response) => res.json(response.data))
        .catch((err) => res.json(err))
}

exports.doc_detail = (req, res) => {
    console.log("call list me/doc/{doc_id}/detail EXPRESS")

    const token = req.body.token
    const doc_id = req.params.doc_id

    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: process.env.BACKEND_DOMAIN + "/me/doc/" + doc_id + "/detail",
        })
        .then((response) => res.json(response.data))
        .catch((err) => {
            res.json(err)
        })
}
