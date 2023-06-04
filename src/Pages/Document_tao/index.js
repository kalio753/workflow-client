import $ from "jquery"
import { Breadcrumb, Button, Input, message, Spin } from "antd"
import "./main.less"
import SmallHeader from "../components/SmallHeader"
import { Upload_ic } from "../../assets/images"
import { createRef, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getJsonData, getNewDocJsonDataSelector } from "../../redux/selectors"
import { Link, useNavigate } from "react-router-dom"
import { submitTemplate } from "../../redux/slices/documentSlice"
import { useState } from "react"
import axios from "axios"
import { setJsonData } from "../../redux/slices/globalVariableSlice"
import FilePreview from "../components/FilePreview"

window.jQuery = $ // JQuery alias
window.$ = $

require("jquery-ui-sortable")
require("formBuilder")
require("formBuilder/dist/form-render.min.js")

const erp_url = "/workflow-service"

function Document_tao() {
    const dispatch = useDispatch()
    let formData
    const navigate = useNavigate()

    const titleRef = useRef()
    const fileInput = createRef()
    const fb = createRef()

    const [isUploadDone, setIsUploadDone] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState([])
    const [fileQuantities, setFileQuantities] = useState(0)
    const [filePathList, setFilePathList] = useState([])

    const newDocJson = useSelector(getNewDocJsonDataSelector)
    const jsonDataCurrent = useSelector(getJsonData)

    useEffect(() => {
        const config = {
            formData: jsonDataCurrent,
        }
        formData = $(fb.current).formRender(config)
    }, [jsonDataCurrent])

    if (isUploadDone && fileQuantities === filePathList.length) {
        const jsonData = jsonDataCurrent

        const data = {
            template_id: newDocJson.template_id,
            title: titleRef.current.input.value,
            jsondata: jsonData,
            list_path: filePathList,
        }
        setIsUploadDone(false)
        dispatch(submitTemplate({ data, navigate }))
    }

    const handleSubmit = () => {
        const jsonData = formData?.userData || jsonDataCurrent
        console.log(jsonData)
        dispatch(setJsonData(jsonData))

        // Validate thong tin rong~
        const isEmpty = validateEmpty(jsonData)

        // Validate neu co 2 truong date
        // Quy luật: Bắt buộc label của thẻ date trước và sau là "Từ" và "Đến"
        let dateCheck
        const isTwoDate = jsonData.reduce((acc, ele) => {
            if (
                ele.type === "date" &&
                (ele.label === "Từ" || ele.label === "Đến")
            )
                return acc + 1
            else return acc
        }, 0)

        if (isTwoDate === 2) {
            const fromDate = jsonData.filter((ele) => ele.label === "Từ")[0]
                .userData[0]
            const toDate = jsonData.filter((ele) => ele.label === "Đến")[0]
                .userData[0]
            dateCheck = Date.parse(toDate) - Date.parse(fromDate)
        }

        if (isEmpty) {
            message.error("Xin hãy nhập đầy đủ các trường thông tin !")
            // } else if (fileList.length === 0) {
            // message.error("Không tìm thấy file đính kèm")
        } else if (dateCheck <= 0) {
            message.error(
                "Ngày kết thúc không được nhỏ hơn hoặc bằng ngày bắt đầu !"
            )
        } else {
            setIsUploadDone(true)
            setIsLoading(true)
            fileList?.forEach((file, index) => {
                const fileFormData = new FormData()
                fileFormData.append("file", file)
                sendFile(fileFormData)
            })
        }
    }

    function sendFile(fileFormData) {
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

    function validateEmpty(dataArr) {
        if (titleRef.current.input.value === "") {
            return true
        }
        if (dataArr) {
            for (const i of dataArr) {
                if (i.userData) {
                    if (i.userData[0] === "") {
                        return true
                    }
                }
            }
        }
        return false
    }

    const handleDeleteFile = (name) => {
        const jsonData = formData.userData
        dispatch(setJsonData(jsonData))
        setFileList((prev) => prev.filter((file) => file.name !== name))
        setFileQuantities((prev) => prev - 1)
    }

    const handleSave = () => {
        fileList.forEach((file, index) => {
            const fileFormData = new FormData()
            fileFormData.append("file", fileInput.current.files[0])
            sendFile(fileFormData)
        })
    }
    const handleFileOnChange = () => {
        const jsonData = formData.userData
        dispatch(setJsonData(jsonData))
        setFileList((prev) => {
            const file = fileInput.current.files[0]
            const fileExt = file?.name.split(".")[1] // Đuôi file
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

    const handleCancel = () => {
        navigate(erp_url + "/u")
    }

    return (
        <div>
            {/* <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
                separator="»"
                className="breadcrumb"
            >
                <Breadcrumb.Item>Tài liệu</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={"/u"}>Tạo mới</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="bread-active">
                    {newDocJson.template_name}
                </Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="vb_user_t_background">
                <SmallHeader title={newDocJson.template_name}></SmallHeader>
                <div className="vb_user_t_title-section">
                    <div>Tiêu đề Văn bản</div>
                    <Input className="vb_user_t_title-input" ref={titleRef} />
                </div>
                <div className="fb-editor" ref={fb}></div>

                <div className="vb_user_t_container">
                    <div className="input_section">
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

                        {fileList.map((file, index) =>
                            file ? (
                                <FilePreview
                                    index={index}
                                    file={file}
                                    onDelete={handleDeleteFile}
                                />
                            ) : null
                        )}

                        {isLoading ? (
                            <Spin
                                className="loading-section"
                                tip="Đang tải ..."
                            />
                        ) : (
                            <div className="btn-section">
                                <Button
                                    className="btn btn_cancel"
                                    onClick={handleCancel}
                                >
                                    Hủy
                                </Button>
                                {/* <Button
                                    className="btn btn_save"
                                    onClick={handleSave}
                                >
                                    Lưu
                                </Button> */}
                                <Button
                                    className="btn btn_create"
                                    onClick={handleSubmit}
                                >
                                    Gửi
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="progress_section"></div>
                </div>
            </div>
        </div>
    )
}

export default Document_tao
