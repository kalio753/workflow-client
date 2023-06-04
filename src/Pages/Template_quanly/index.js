import { Link, useNavigate } from "react-router-dom"

import { useState, useEffect } from "react"

import { Button, Table, Input } from "antd"
import "./Template_quanly.less"
import SmallHeader from "../components/SmallHeader"
import AddButton from "../components/AddButton"
import { useDispatch, useSelector } from "react-redux"
import { getTemplateSelector } from "../../redux/selectors"
import {
    deleteTemplate,
    getTemplates,
    updateTemplate,
} from "../../redux/slices/templateSlice"
import { setEditingTemplate } from "../../redux/slices/globalVariableSlice"
import { getFolder } from "../../redux/slices/folderSlice"
import DeleteModal from "../components/DeleteModal"
import axios from "axios"

const erp_url = "/workflow-service"
// const erp_url = ""

function Template_quanly() {
    useEffect(() => {
        dispatch(getTemplates())
        dispatch(getFolder())
    }, [dispatch])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const templateList = useSelector(getTemplateSelector)
    const [searchKey, setSearchKey] = useState("")
    const [tableData, setTableData] = useState(false)
    const [deletedItems, setDeletedItems] = useState([])
    const [itemToDelete, setItemToDelete] = useState({})
    let availableList = templateList
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState("")

    if (deletedItems?.length > 0) {
        availableList = availableList.reduce((acc, item) => {
            for (let i of deletedItems) {
                if (item.template_id === i) return acc
                return [...acc, item]
            }
        }, [])
    }

    const columns = [
        {
            key: "1",
            width: 900,
            title: <div className="dsvbql-table__title">Tên tài liệu</div>,
            render: (item) => {
                return (
                    <div className="dsvbql-table__content">
                        {item.template_name}
                    </div>
                )
            },
        },
        {
            key: "2",
            title: "",
            render: (item) => {
                return (
                    <div className="dsvbql-table__buttons">
                        <Button
                            className="dsvbql-table__button-edit"
                            onClick={() => handleSelectTemplate(item)}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            className="dsvbql-table__button-delete"
                            onClick={() => toggleDeleteModal(item)}
                        >
                            Xóa
                        </Button>
                    </div>
                )
            },
        },
    ]

    const handleOk = () => {
        setModalText("Tiến trình đang được xử lý, vui lòng đợi !")
        handleDeleteTemplate(itemToDelete)
        setConfirmLoading(true)
    }
    const handleCancel = () => {
        setOpen(false)
    }

    let locale = {
        emptyText: "Không có tài liệu nào.",
    }

    const handleInputSearch = (e) => {
        setSearchKey(e.target.value)
    }

    const handleSearch = () => {
        setTableData(
            templateList.filter((item) => {
                return item.template_name
                    .toLowerCase()
                    .includes(searchKey.toLowerCase())
            })
        )
    }

    const handleDeleteTemplate = (item) => {
        dispatch(
            deleteTemplate({
                data: {
                    id: item.template_id,
                },
                setOpen,
                setConfirmLoading,
            })
        )

        setDeletedItems((prev) => [...prev, item.template_id])
        setItemToDelete({})
    }

    const toggleDeleteModal = (item) => {
        setOpen(true)
        setModalText('Xác nhận xóa tài liệu "' + item.template_name + '"?')
        setItemToDelete(item)
    }

    const handleSelectTemplate = (item) => {
        console.log("item ne", item)
        dispatch(setEditingTemplate(item))
        navigate(`${erp_url}/edit_template`)
    }

    const handleEnterSearch = (e) => {
        if (e.keyCode === 13) {
            handleSearch()
        }
    }

    return (
        <div style={{ flex: 2 }}>
            {/* <Breadcrumb className="breadcrumb" separator="»">
                <Breadcrumb.Item>Tài liệu</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách tài liệu</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="dsvbql-layout-background">
                <SmallHeader title="Danh sách tài liệu">
                    <Link to={erp_url + "/vbct"}>
                        <AddButton
                            content="Tạo tài liệu"
                            onclick={() => dispatch(setEditingTemplate({}))}
                        />
                    </Link>
                </SmallHeader>

                <div className="dsvbql-content">
                    {/* <SearchSection onclick={() => {}} /> */}
                    <div className="dsvbql__search search_wkf">
                        <Input
                            className="dsvbql__search-input"
                            // style={{ paddingLeft: 19 }}
                            placeholder="Nhập tài liệu"
                            allowClear
                            value={searchKey}
                            onChange={handleInputSearch}
                            onKeyDown={handleEnterSearch}
                        />
                        <Button
                            className="search-btn"
                            style={{
                                marginLeft: 39,
                                width: 151,
                                height: 44,
                                backgroundColor: "#3699ff",
                                color: "#ffffff",
                            }}
                            onClick={handleSearch}
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                <Table
                    className="dsvbql-table"
                    columns={columns}
                    locale={locale}
                    dataSource={tableData || availableList}
                    // lấy trong dataSource cột 'id' để làm key cho từng row
                    rowKey={(item) => item.template_id}
                    rowClassName={"table-row"}
                    scroll={{ x: false }}
                ></Table>
                <DeleteModal
                    open={open}
                    confirmLoading={confirmLoading}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    modalText={modalText}
                />
            </div>
        </div>
    )
}

export default Template_quanly
