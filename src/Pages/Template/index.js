import $ from "jquery"
import { Plus, Close } from "../../assets/images"
import { Breadcrumb, Button, Input, Modal, Select, message, Spin } from "antd"
import "./Template.less"
import { useState, createRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    getEditingTemplateSelector,
    getFolderSelector,
} from "../../redux/selectors"
import {
    createTemplate,
    updateTemplate,
} from "../../redux/slices/templateSlice"
import { createFolder, getFolder } from "../../redux/slices/folderSlice"
import { Link, useNavigate } from "react-router-dom"
import defaultConfig from "./formBuilderConfig"
import { setEditingTemplate } from "../../redux/slices/globalVariableSlice"

window.jQuery = $ // JQuery alias
window.$ = $

require("jquery-ui-sortable")
require("formBuilder")
require("formBuilder/dist/form-render.min.js")

const erp_url = "/workflow-service"
// const erp_url = ""

function Template() {
    const dispatch = useDispatch()
    let formBuilder
    const currentPath = window.location.pathname
    const navigate = useNavigate()

    const fb = createRef()
    const createBtn = createRef()
    const { TextArea } = Input

    const folderList = useSelector(getFolderSelector)
    const editingTemplate = useSelector(getEditingTemplateSelector)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [folderSelected, setFolderSelected] = useState(
        editingTemplate.folder_name || undefined
    )
    const [jsonData, setJsonData] = useState("")
    const [addFolderInput, setAddFolderInput] = useState("")
    const [templateNameInput, setTemplateNameInput] = useState(
        editingTemplate.template_name || ""
    )
    const [templateDescInput, setTemplateDescInput] = useState(
        editingTemplate.template_desc || ""
    )

    // const dfValueFolder =
    //     currentPath == "/edit_template"
    //         ? { defaultValue: editingTemplate.folder_name }
    //         : { placeholder: "Chọn nhóm" }
    const dfValueJsonData =
        currentPath == erp_url + "/edit_template"
            ? editingTemplate.jsondata
            : []
    let config = defaultConfig(dfValueJsonData)

    useEffect(() => {
        // khởi tạo formBuilder ở lần chạy đầu tiên
        jQuery(function ($) {
            formBuilder = $(fb.current).formBuilder(config)
            createBtn.current.addEventListener("click", function () {
                setJsonData(formBuilder.actions.getData("json"))
            })
        })
    }, [])

    const handleCreateTemplate = (name, folder_id, desc) => {
        dispatch(
            createTemplate({
                data: {
                    folder_ID: folder_id,
                    desc: desc,
                    name: name,
                    jsondata: JSON.parse(jsonData),
                },
                navigate,
            })
        )
        setIsLoading(true)
    }

    const handleUpdateTemplate = (name, template_id, folder_id, desc) => {
        dispatch(
            updateTemplate({
                data: {
                    id: template_id,
                    folder_ID: folder_id,
                    desc,
                    name,
                    jsondata: JSON.parse(jsonData),
                    is_disable: false,
                },
                navigate,
            })
        )
        setIsLoading(true)
        // console.log("TETET", JSON.parse(jsonData))
    }

    const handleSelectFolder = (value) => {
        setFolderSelected(value)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        if (addFolderInput !== "") {
            dispatch(
                createFolder({
                    name: addFolderInput,
                    setFolderSelected,
                })
            )

            setAddFolderInput("")
            setIsModalVisible(false)
        } else
            message.error({
                content: "Hãy nhập một tên nhóm !",
                // className: "message",
            })
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleSubmit = () => {
        if (!templateNameInput) {
            message.error({
                content: "Hãy nhập tên tài liệu",
            })
        } else if (!folderSelected) {
            message.error({
                content: "Hãy chọn một nhóm",
            })
        } else if (jsonData == "[]") {
            message.error({
                content: "Hãy tạo biểu mẫu cho tài liệu này.",
            })
        } else {
            let folderID
            folderList.forEach((folder) => {
                if (folder.name == folderSelected) {
                    folderID = folder.id
                }
            })

            // Xóa form cũ tạo lại form mới

            if (currentPath == erp_url + "/edit_template") {
                dispatch(
                    setEditingTemplate({
                        folder_name: "",
                        desc: "",
                        template_id: "",
                    })
                )
                handleUpdateTemplate(
                    templateNameInput,
                    editingTemplate.template_id,
                    folderID,
                    templateDescInput
                )
            } else {
                handleCreateTemplate(
                    templateNameInput,
                    folderID,
                    templateDescInput
                )
            }
        }
    }

    const handleChangeAddFolderInput = (e) => {
        setAddFolderInput(e.target.value)
    }

    const handleCancelCreate = () => {
        dispatch(
            setEditingTemplate({ folder_name: "", desc: "", template_id: "" })
        )
        setTemplateNameInput("")
        setTemplateDescInput("")
        navigate(erp_url + "/quanly_template")
    }

    return (
        <div>
            {/* <Breadcrumb className="breadcrumb" separator="»">
                <Breadcrumb.Item>Tài liệu</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/">Danh sách tài liệu</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {currentPath === "/edit_template"
                        ? editingTemplate.desc
                        : "Tạo tài liệu"}
                </Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="vbctql-layout-background">
                <h3 className="title">Tạo tài liệu</h3>

                <div className="vbctql-content">
                    <div className="vbctql-form">
                        <div className="vbctql-form__left">
                            <div>
                                <Select
                                    // mode="tags"
                                    style={{
                                        width: "100%",
                                    }}
                                    onChange={handleSelectFolder}
                                    // onSelect= {handleSelectFolder}
                                    value={folderSelected}
                                    // filterOption={(input, option) => {
                                    //     (option.children.toLowerCase().includes(input.toLowerCase()))
                                    // }}

                                    placeholder="Chọn nhóm"
                                    // placeholder="Chọn nhóm"
                                    optionLabelProp="label"
                                    listHeight={128}
                                    showSearch
                                    className="vbctql-form__folder"
                                >
                                    {folderList.map((folder, index) => {
                                        return (
                                            <Select.Option
                                                style={{ fontSize: 18 }}
                                                key={index}
                                                value={folder.name}
                                            ></Select.Option>
                                        )
                                    })}
                                </Select>

                                {/* <Input className="vbctql-form__folder" placeholder="Tên nhóm"/> */}
                                <Button
                                    type="primary"
                                    className="vbctql-form__folder-add"
                                    onClick={showModal}
                                >
                                    <img src={Plus} alt="" />
                                </Button>
                            </div>
                            <Input
                                className="vbctql-form__template"
                                placeholder="Tên tài liệu"
                                value={templateNameInput}
                                onChange={(e) =>
                                    setTemplateNameInput(e.target.value)
                                }
                            />
                        </div>
                        <div className="vbctql-form__right">
                            <TextArea
                                value={templateDescInput}
                                onChange={(e) =>
                                    setTemplateDescInput(e.target.value)
                                }
                                className="vbctql-form__desc"
                                placeholder="Mô tả"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                        </div>
                    </div>

                    <div className="fb-wrapper" ref={fb}></div>

                    {isLoading ? (
                        <Spin className="vbctql-actions" tip="Đang tải ..." />
                    ) : (
                        <div className="vbctql-actions">
                            <Button
                                className="btn"
                                onClick={handleCancelCreate}
                            >
                                Hủy
                            </Button>
                            <Button
                                className="btn btn_create"
                                type="primary"
                                ref={createBtn}
                                onClick={handleSubmit}
                            >
                                {currentPath == erp_url + "/edit_template"
                                    ? "Cập nhật"
                                    : "Tạo"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Modal
                visible={isModalVisible}
                // onOk={handleOk}
                onCancel={handleCancel}
                centered={true}
                className="vbctql__modal"
                footer={null}
                closeIcon={<img src={Close} />}
            >
                <h3
                    className="title"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    Tạo nhóm
                </h3>
                <Input
                    className="vbctql__modal-input"
                    placeholder="Nhập tên nhóm"
                    value={addFolderInput}
                    onChange={handleChangeAddFolderInput}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) handleOk()
                    }}
                ></Input>
                <div className="vbctql__modal-actions">
                    <Button
                        className="btn"
                        onClick={handleCancel}
                        style={{ fontSize: 18 }}
                    >
                        Hủy
                    </Button>
                    <Button
                        className="btn btn_create"
                        style={{ fontSize: 18 }}
                        type="primary"
                        onClick={handleOk}
                    >
                        Tạo
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default Template
