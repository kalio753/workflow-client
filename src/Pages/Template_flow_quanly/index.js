import { useEffect, useState } from "react"
import { Breadcrumb, Button, Table, Input } from "antd"
import { Link } from "react-router-dom"

import "./Template_flow_quanly.less"
import SmallHeader from "../components/SmallHeader"
import AddButton from "../components/AddButton"
import { useDispatch, useSelector } from "react-redux"
import { getTemplateSelector } from "../../redux/selectors"
import { getTemplates } from "../../redux/slices/templateSlice"
import { getFolder } from "../../redux/slices/folderSlice"
import DeleteModal from "../components/DeleteModal"

const erp_url = "/workflow-service"
// const erp_url = ""

function Template_flow_quanly() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemplates())
        dispatch(getFolder())
    }, [dispatch])

    let locale = {
        emptyText: "Không có tài liệu nào.",
    }

    const templateList = useSelector(getTemplateSelector)
    const [searchKey, setSearchKey] = useState("")
    const [tableData, setTableData] = useState(false)
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [modalText, setModalText] = useState("")

    const handleOk = () => {
        setModalText("Tiến trình đang được xử lý, vui lòng đợi !")
        setConfirmLoading(true)
        setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
        }, 1000)
    }
    const handleCancel = () => {
        setOpen(false)
    }

    const toggleDeleteModal = (item) => {
        setOpen(true)
        setModalText(
            'Xác nhận xóa quy trình của tài liệu "' + item.template_name + '"?'
        )
        setItemToDelete(item)
    }

    // Kiểm tra xem template có bị vô hiệu hóa chưa
    const availableList = templateList

    const handleInputSearch = (e) => {
        setSearchKey(e.target.value)
    }

    const handleSearch = () => {
        setTableData(
            availableList.filter((item) => {
                return item.template_name
                    .toLowerCase()
                    .includes(searchKey.toLowerCase())
            })
        )
    }

    const columns = [
        {
            key: "1",
            //   width: 900,
            title: (
                <div className="dsccql-table__title dsccql-table__first-title">
                    Nhóm
                </div>
            ),
            render: (item) => {
                return (
                    <div className="dsccql-table__content dsccql-table__first-content">
                        {item.folder_name}
                    </div>
                )
            },
        },
        {
            key: "2",
            //   width: 900,
            title: <div className="dsccql-table__title">Tên tài liệu</div>,
            render: (item) => {
                return (
                    <div className="dsccql-table__content dsccql-table__bold-content">
                        {item.template_name}
                    </div>
                )
            },
        },

        {
            key: "4",
            title: "",
            render: (item) => {
                return (
                    <div className="dsccql-table__buttons">
                        <Link to={erp_url + "/taoqt"} state={item.template_id}>
                            <Button className="dsccql-table__button-edit">
                                Chỉnh sửa
                            </Button>
                        </Link>
                        <Button
                            className="dsccql-table__button-delete"
                            onClick={() => toggleDeleteModal(item)}
                        >
                            Xóa
                        </Button>
                    </div>
                )
            },
        },
    ]

    const handleEnterSearch = (e) => {
        if (e.keyCode === 13) {
            handleSearch()
        }
    }

    return (
        <div>
            {/* <Breadcrumb className="breadcrumb" separator="»">
                <Breadcrumb.Item>Tài liệu</Breadcrumb.Item>
                <Breadcrumb.Item>Quy trình vận hành</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="dsccql-layout-background">
                <SmallHeader title="Quy trình vận hành">
                    <Link to={erp_url + "/taoqt"}>
                        <AddButton content="Tạo quy trình" />
                    </Link>
                </SmallHeader>

                <div className="dsccql-content">
                    {/* <SearchSection onclick={() => {}} /> */}
                    <div className="dsccql__search search_wkf">
                        <Input
                            className="dsccql__search-input"
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
                    className="dsccql-table"
                    columns={columns}
                    locale={locale}
                    dataSource={tableData || availableList}
                    // lấy trong dataSource cột 'id' để làm key cho từng row
                    rowKey={(item) => item.template_id}
                    rowClassName={"table-row"}
                    scroll={{ x: false }}
                    // pagination={
                    //     templateList.length <= 10
                    //         ? false
                    //         : {
                    //               pageSize: 10,
                    //           }
                    // } // mỗi trang nhiều nhất 10 tasks
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

export default Template_flow_quanly
