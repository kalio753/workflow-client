import axios from "axios"
import { getToken } from "../../../../utils/helper"

export function requestGetDocsSentByme() {
    // get cookie
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        url: process.env.HD_EXP_DOMAIN + "/me/sentby",
        data: {
            token: token,
        },
    })
}

export function requestGetDocsSentTome() {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        url: process.env.HD_EXP_DOMAIN + "/me/sendto",
        data: {
            token: token,
        },
    })
}

export function requestGetDocDetail(id) {
    const token = getToken("usertoken")
    axios.request({
        method: "post",
        url: `${process.env.HD_EXP_DOMAIN}/me/doc/${id}/detail/`,
        data: {
            token: token,
        },
    })
}

export function requestPostSubmitDocument(data) {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        url: process.env.HD_EXP_DOMAIN + "/me/doc/submit",
        data: {
            ...data,
            token: token,
        },
    })
}
