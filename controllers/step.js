require("dotenv").config()
const axios = require("axios")

exports.create_step = (req, res) => {
    console.log("call create step for flow EXPRESS")
    const token = req.body.token
    const objectExecute = req.body.user_id
        ? { user_id: req.body.user_id }
        : req.body.part_id
        ? { part_id: req.body.part_id }
        : { position_id: req.body.position_id }

    axios
        .request({
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                template_ID: req.body.template_ID,
                is_start: req.body.is_start,
                step_number: req.body.step_number,
                ...objectExecute,
            },
            url: process.env.BACKEND_DOMAIN + "/flow/create_step",
        })
        .then((response) => res.json(response.data))
        .catch((err) => {
            res.json(err.response.data)
        })
    // axios
    //     .post(process.env.BACKEND_DOMAIN + "/step/create", {
    //         template_ID: req.body.template_ID,
    //         is_start: req.body.is_start,
    //         step_number: req.body.step_number,
    //         ...objectExecute,
    //     })
    //     .then((response) => {
    //         res.json(response.data)
    //     })
    //     .catch((err) => {
    //         res.json(err.response.data)
    //     })
}

exports.get_step = (req, res) => {
    console.log("call list workflow EXPRESS")
    let template_id = req.body.id
    // let template_id = req.query.template_id
    const queryparam = template_id ? `?template_id=${template_id}` : ""
    const token = req.body.token

    console.log(123)
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                name: req.body.name,
            },
            url: `${process.env.BACKEND_DOMAIN}/flow/list${queryparam}`,
        })
        .then((response) => res.json(response.data))
        .catch((err) => {
            res.json(err)
        })
}
