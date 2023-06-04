import axios from "axios"
import { getToken } from "../../../../utils/helper"

export function requestGetTemplate() {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/template/list",
        data: { token },
    })
}

export function requestGetTemplateForUser() {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        // headers: {
        //     Authorization: `Bearer ${token}`
        // },
        url: process.env.HD_EXP_DOMAIN + "/me/templates",
        data: {
            token: token,
        },
    })
}

export function requestGetTemplateById(id) {
    return axios.request({
        method: "get",
        url: process.env.HD_EXP_DOMAIN + "/template/list?folder_id=" + id,
    })
}

export function requestPostTemplate(data) {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/template/create",
        data: { ...data, token },
    })
}

export function requestPutTemplate(data) {
    const token = getToken("usertoken")

    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/template/update",
        data: { ...data, token },
    })
}

export function requestDeleteTemplate(data) {
    const token = getToken("usertoken")

    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/template/delete",
        data: { ...data, token },
    })
}
