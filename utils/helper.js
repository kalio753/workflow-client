// Bỏ dấu tiếng việt
function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
    ]
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g")
        var char = AccentsMap[i][0]
        str = str.replace(re, char)
    }
    return str
}

const getToken = (key) => {
    let decodedCookies = decodeURIComponent(document.cookie)
    let cookies = decodedCookies.split("; ")
    let token
    for (const i of cookies) {
        if (i.startsWith(key)) {
            token = i.split("=")[1]
        }
    }
    return token
}

// Giải mã JWT
const parseJwt = (token) => {
    var base64Url = token.split(".")[1]
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join("")
    )

    return JSON.parse(jsonPayload)
}

function getFileExtName(fileName) {
    const re = /(?:\.([^.]+))?$/

    return re.exec(fileName)[1]
}

module.exports = { removeAccents, getToken, parseJwt, getFileExtName }
