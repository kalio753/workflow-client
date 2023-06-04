import { Button, message, Select, Spin } from "antd"
import TextArea from "antd/lib/input/TextArea"
import axios from "axios"
import { createRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getFileExtName } from "../../../utils/helper"
import { Upload_ic } from "../../assets/images"
import { getActionSelector } from "../../redux/selectors"
import FilePreview from "../components/FilePreview"
import DebounceSelect from "./DebounceSelect"
const { Option } = Select

function ActionSection({ doc_id }) {
    const fileInput = createRef()
    const [fileList, setFileList] = useState([])
    const [isTrienKhai, setIsTrienKhai] = useState(false)
    const actions = useSelector(getActionSelector)
    const [isLoading, setIsLoading] = useState(false)
    const [fileQuantities, setFileQuantities] = useState(0)
    const [note, setNote] = useState("")
    const [actionId, setActionId] = useState()
    const [filePathList, setFilePathList] = useState([])
    const [isUploadDone, setIsUploadDone] = useState(false)
    const [trienKhaiTo, setTrienKhaiTo] = useState("user")
    const [value, setValue] = useState([])
    const navigate = useNavigate()

    // Submit action here
    if (isUploadDone && fileQuantities === filePathList.length) {
        let decodedCookies = decodeURIComponent(document.cookie)
        let cookies = decodedCookies.split("; ")
        let token
        for (const i of cookies) {
            if (i.startsWith("usertoken")) {
                token = i.split("=")[1]
            }
        }

        let data = {
            action_id: actionId,
            doc_id,
            list_path: filePathList,
        }
        if (note) {
            data["note"] = note
        }

        // Cac ID duoc trien khai
        const ext_list = value.map((info) => info.value)
        if (trienKhaiTo === "user") {
            data["list_user"] = ext_list
        } else if (trienKhaiTo === "part") {
            data["list_part"] = ext_list
        } else if (trienKhaiTo === "position") {
            data["list_position"] = ext_list
        }

        axios
            .request({
                method: "post",
                url: process.env.HD_EXP_DOMAIN + "/me/doc/action",
                data: {
                    ...data,
                    token: token,
                },
            })
            .then((res) => {
                console.log(res)
                if (!res.data.result) {
                    message.error(res.data.data)
                } else {
                    message.success("Xử lý thành công")
                    setIsUploadDone(false)
                    navigate("/workflow-service/dagui")
                }
            })
            .catch((e) => console.error("Err:", e))
    }

    const handleFileOnChange = () => {
        setFileList((prev) => {
            const file = fileInput.current.files[0]
            const fileExt = getFileExtName(file?.name) // Đuôi file
            const toCheck = [
                "txt",
                "png",
                "jpg",
                "jpeg",
                "gif",
                "doc",
                "docx",
                "pdf",
                "xlsx",
                "xls",
                "pptx",
                "ppt",
            ]
            if (!toCheck.includes(fileExt)) {
                message.error(`Định dạng file .${fileExt} không được hỗ trợ`)
                return [...prev]
            }
            if (file?.size > 3 * 1024 * 1024) {
                message.error(`File ${file?.name} có dung lượng quá lớn !`)
                return [...prev]
            } else {
                setFileQuantities((prev) => prev + 1)
                return [...prev, file]
            }
        })
    }

    const handleDeleteFile = (name) => {
        setFileList((prev) => prev.filter((file) => file.name !== name))
        setFileQuantities((prev) => prev - 1)
    }

    const onChange = (id) => {
        actions.find((act) => act.action_id === id).action_name === "Triển khai"
            ? setIsTrienKhai(true)
            : setIsTrienKhai(false)
        setActionId(id)
    }
    const onSearch = (value) => {
        console.log("search:", value)
    }

    function sendFile(fileFormData) {
        // This is for multer upload
        // axios
        //     .post(`${process.env.HD_EXP_DOMAIN}/upload`, fileFormData, {
        //         headers: { "content-type": "multipart/form-data" },
        //     })
        //     .then((res) => {
        //         if (res.data.code === "Only images & documents are allowed") {
        //             message.warn(
        //                 "Tập tin đính kèm chỉ có thể là hình ảnh hoặc tài liệu !"
        //             )
        //             setIsLoading(false)
        //         } else if (typeof res.data !== "string") {
        //             message.error(
        //                 "Quá trình Upload file thất bại, vui lòng thử lại sau !"
        //             )
        //             setIsLoading(false)
        //         } else {
        //             setFilePathList((prev) => [...prev, res.data])
        //         }
        //     })

        // this is for s3 upload
        axios
            .post(
                `${process.env.S3_SERVICE_DOMAIN}/workflow/upload_single`,
                fileFormData,
                {
                    headers: { "content-type": "multipart/form-data" },
                }
            )
            .then((res) => {
                console.log(res)
                if (!res.data.result) {
                    message.error(
                        "Quá trình Upload file thất bại, vui lòng thử lại sau !"
                    )
                    setIsLoading(false)
                } else {
                    setFilePathList((prev) => [...prev, res.data.data])
                }
            })
    }

    const handleSubmitAction = () => {
        // Validate các trường thông tin
        if (actionId === undefined) {
            message.warn("Xin hãy chọn 1 thao tác xử lý")
        } else {
            fileList?.forEach((file, index) => {
                const fileFormData = new FormData()
                fileFormData.append("file", file)
                sendFile(fileFormData)
            })
            setIsUploadDone(true)
            setIsLoading(true)
        }
    }

    const handlePickTrienKhai = (value) => {
        setTrienKhaiTo(value)
        setValue([])
    }

    // Usage of DebounceSelect

    async function fetchUserList(username) {
        console.log("fetching user", username)
        let decodedCookies = decodeURIComponent(document.cookie)
        let cookies = decodedCookies.split("; ")
        let token
        for (const i of cookies) {
            if (i.startsWith("usertoken")) {
                token = i.split("=")[1]
            }
        }
        if (trienKhaiTo === "user") {
            return fetch(
                process.env.HD_EXP_DOMAIN +
                    `/sampledata/${trienKhaiTo}/list` +
                    `?kw=${username}`,
                {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                }
            )
                .then((response) => response.json())
                .then((body) => {
                    return body.map((user) => {
                        return {
                            label: user.name,
                            value: user.id,
                        }
                    })
                })
        } else {
            return fetch(
                process.env.HD_EXP_DOMAIN +
                    `/sampledata/${trienKhaiTo}/list` +
                    `?kw=${username}`
            )
                .then((response) => response.json())
                .then((body) => {
                    console.log("hihi", body)
                    return body.message.map((user) => {
                        console.log(user)
                        return {
                            label: user.name,
                            value: user.id,
                        }
                    })
                })
        }
    }

    return (
        <>
            <form action="#">
                <label className="vb_user_t_input-file-btn">
                    <img src={Upload_ic} alt="" />
                    Chọn tài liệu đính kèm
                    <input
                        type="file"
                        ref={fileInput}
                        multiple="multiple"
                        onChange={handleFileOnChange}
                    />
                </label>
            </form>

            {fileList?.map(
                (file, index) =>
                    file && (
                        <FilePreview
                            index={index}
                            file={file}
                            onDelete={handleDeleteFile}
                        />
                    )
            )}

            <div className="extra_star">
                {/* Chỗ này thêm ngôi sao = CSS tại bí quá :)) */}
                <TextArea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="extra_note"
                    placeholder="Ghi chú"
                    // value="Việc gia đình"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                ></TextArea>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 23,
                }}
            >
                <Select
                    className="extra_action"
                    placeholder="Chọn thao tác"
                    style={{
                        height: 44,
                    }}
                    listHeight={150}
                    showSearch
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children
                            .toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                >
                    {actions?.map((action) => (
                        <Option key={action.action_id} value={action.action_id}>
                            {action.action_name}
                        </Option>
                    ))}
                </Select>
                {isTrienKhai && <div>Đến :</div>}
                {isTrienKhai && (
                    <Select
                        className="extra_action"
                        defaultValue="user"
                        style={{
                            // width: 120,
                            height: 44,
                        }}
                        onChange={handlePickTrienKhai}
                        options={[
                            {
                                value: "user",
                                label: "Cá nhân",
                            },
                            {
                                value: "part",
                                label: "Phòng ban",
                            },
                            {
                                value: "position",
                                label: "Chức danh",
                            },
                        ]}
                    />
                )}
            </div>
            {isTrienKhai && (
                <DebounceSelect
                    mode="multiple"
                    showSearch
                    value={value}
                    placeholder="Tìm kiếm"
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => {
                        setValue(newValue)
                    }}
                    className="extra_trienkhai-search"
                />
            )}
            {isLoading ? (
                <Spin />
            ) : (
                <Button className="extra_btn" onClick={handleSubmitAction}>
                    Hoàn thành
                </Button>
            )}
        </>
    )
}

export default ActionSection
