import axios from "axios"
import { getToken } from "../../../../utils/helper"

export function requestGetStepsById(id) {
    const token = getToken("usertoken")
    return axios.request({
        method: "post",
        url: process.env.HD_EXP_DOMAIN + "/step/workflow",
        data: {
            token,
            id,
        },
    })
}
