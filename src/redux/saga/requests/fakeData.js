import axios from "axios"

export function requestGetParts(search) {
    return axios.request({
        method: "get",
        url:
            process.env.HD_EXP_DOMAIN +
            "/departments" +
            (search ? `?kw=${search}` : ""),
    })
}

export function requestGetPositions() {
    return axios.request({
        method: "get",
        url: process.env.HD_EXP_DOMAIN + "/position-management",
    })
}

export function requestGetUsers() {
    return axios.request({
        method: "get",
        url: process.env.HD_EXP_DOMAIN + "/user-dep-pos",
    })
}
