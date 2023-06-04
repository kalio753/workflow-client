import axios from "axios"
import { getToken } from "../../../../utils/helper"

export function requestGetFolder() {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/wm/folder/list",
        data: { token },
    })
}

export function requestPostFolder({ name }) {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/wm/folder/create",
        data: { name, token },
    })
}
