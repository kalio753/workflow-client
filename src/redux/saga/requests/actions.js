import axios from "axios"

export function requestGetActions(doc_id) {
    let decodedCookies = decodeURIComponent(document.cookie)
    let cookies = decodedCookies.split("; ")
    let token
    for (const i of cookies) {
        if (i.startsWith("usertoken")) {
            token = i.split("=")[1]
        }
    }
    return axios.request({
        method: "post",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        url: process.env.HD_EXP_DOMAIN + "/me/actions",
        data: {
            token: token,
            doc_id,
        },
    })
}
