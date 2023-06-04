require("dotenv").config()
const axios = require("axios")
const { removeAccents } = require("../utils/helper")

exports.get_path = (req, res) => {
    console.log("call list parts in sampledata EXPRESS")

    const token = req.body.token
    let searchKeywords = removeAccents(req.query.kw)
    const queryparam = searchKeywords ? `?kw=${searchKeywords}` : ""
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: `${process.env.BACKEND_DOMAIN}/profile_service/part/list${queryparam}`,
        })
        .then((response) => {
            res.json(response.data.data)
        })
        .catch((err) => console.log(err))

    // let searchKeywords = removeAccents(req.query.kw)
    // const queryparam = searchKeywords ? `?kw=${searchKeywords}` : ""
    // // console.log(
    // //     `${process.env.BACKEND_DOMAIN}/sampledata/part/list${queryparam}`
    // // )
    // axios
    //     .get(`${process.env.BACKEND_DOMAIN}/sampledata/part/list${queryparam}`)
    //     .then((response) => {
    //         res.json(response.data.data)
    //     })
    //     .catch((err) => console.log(err))

    // callAxios("departments", req, res)
}

exports.get_position = (req, res) => {
    console.log("call list positions in sampledata EXPRESS")
    const token = req.body.token
    let searchKeywords = removeAccents(req.query.kw)
    const queryparam = searchKeywords ? `?kw=${searchKeywords}` : ""
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: `${process.env.BACKEND_DOMAIN}/profile_service/position/list${queryparam}`,
        })
        .then((response) => {
            res.json(response.data.data)
        })
        .catch((err) => console.log(err))

    // callAxios("position-management", req, res)
}

exports.get_user = (req, res) => {
    console.log("call list users in sampledata EXPRESS")
    const token = req.body.token
    let searchKeywords = removeAccents(req.query.kw)
    const queryparam = searchKeywords ? `?kw=${searchKeywords}` : ""
    axios
        .request({
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            url: `${process.env.BACKEND_DOMAIN}/profile_service/user/list${queryparam}`,
        })
        .then((response) => {
            res.json(response.data.data)
        })
        .catch((err) => console.log(err))
    // callAxios("user-dep-po.s", req, res)
}
