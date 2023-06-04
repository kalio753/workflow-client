import { Breadcrumb, Table, Button, Modal, Input } from "antd"
import SmallHeader from "../components/SmallHeader"
import SearchSection from "../components/SearchSection"
import { useEffect, useState } from "react"
import axios from "axios"
import "./main.less"
import {
    getDocsSentByMeSelector,
    getTemplateForUserSelector,
} from "../../redux/selectors"
import { useDispatch, useSelector } from "react-redux"
import { getTemplatesForUser } from "../../redux/slices/templateSlice"
import { getDocsSentByMe, setDocDetail } from "../../redux/slices/documentSlice"
import { useNavigate } from "react-router-dom"
const erp_url = "/workflow-service"
// const erp_url = ""
function Document_quanly_gui() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchKey, setSearchKey] = useState("")
    const [tableData, setTableData] = useState(false)

    const templateList = useSelector(getTemplateForUserSelector)
    const listSentByMe = useSelector(getDocsSentByMeSelector)
    console.log(listSentByMe)

    let locale = {
        emptyText: "Không có văn bản nào.",
    }

    useEffect(() => {
        dispatch(getTemplatesForUser())
        dispatch(getDocsSentByMe())
    }, [dispatch])

    const handleSeeDocDetail = (id) => {
        let decodedCookies = decodeURIComponent(document.cookie)
        let cookies = decodedCookies.split("; ")
        let token
        for (const i of cookies) {
            if (i.startsWith("usertoken")) {
                token = i.split("=")[1]
            }
        }
        axios
            .request({
                method: "post",
                url: `${process.env.HD_EXP_DOMAIN}/me/doc/${id}/detail/`,
                data: {
                    token: token,
                },
            })
            .then((response) => {
                const { data } = response
                if (data.result) {
                    console.log(data)
                    const doc_title = listSentByMe.reduce(
                        (acc, doc) => (doc.doc_id === id ? doc.doc_title : acc),
                        ""
                    )

                    dispatch(setDocDetail({ ...data.data, doc_title }))
                    navigate(erp_url + "/ud")
                }
            })
            .catch((err) => console.log("er", err))
    }

    const columns = [
        {
            key: "1",
            width: 320,
            title: <div className="table_title ml51">Ngày tạo</div>,
            render: (item) => {
                return (
                    <div className="table_title ml51">
                        {item.create_date
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                    </div>
                )
            },
        },
        {
            key: "2",
            width: 303,
            title: <div className="table_title">Tên văn bản</div>,
            render: (item) => {
                return <div className="fw700">{item.doc_title}</div>
            },
        },
        {
            key: "3",
            width: 299,
            title: <div className="table_title">Xử lý</div>,
            render: (item) => {
                let color = "#3699ff"
                if (item.status === "từ chối") {
                    color = "#f23f44"
                }
                return (
                    <div className="fw700">
                        {item.last_action_by.user_name !==
                        item.start_at.user_name
                            ? item.last_action_by.user_name
                            : "Chờ xử lý"}
                        <span style={{ color: color }}> {item.status}</span>
                        {item.last_action_by.user_name ===
                            item.start_at.user_name && (
                            <button className="remind_btn">--Nhắc nhở--</button>
                        )}
                    </div>
                )
            },
        },
        {
            key: "4",
            title: "",
            render: (item) => {
                return (
                    <div className="btn_section">
                        <Button
                            className="table_btn"
                            onClick={() => handleSeeDocDetail(item.doc_id)}
                        >
                            Xem
                        </Button>
                        <Button className="table_btn btn_reject">
                            Thu hồi
                        </Button>
                    </div>
                )
            },
        },
    ]

    const handleSearch = () => {
        setTableData(
            listSentByMe.filter((doc) => {
                return doc.doc_title
                    .toLowerCase()
                    .includes(searchKey.toLowerCase())
            })
        )
    }

    const handleEnterSearch = (e) => {
        if (e.keyCode === 13) {
            handleSearch()
        }
    }

    return (
        <div>
            {/* <Breadcrumb
                style={{
                    margin: "16px 0",
                    color: "#434349",
                }}
                separator="»"
            >
                <Breadcrumb.Item>Văn bản</Breadcrumb.Item>
                <Breadcrumb.Item className="bread-active">
                    Đã gửi
                </Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="dsvb_user_background">
                <SmallHeader title="Đã gửi">
                    {/* <AddButton content="Tạo tài liệu" onclick={showModal} /> */}
                </SmallHeader>

                <div className="dsvb_user_search search_wkf">
                    <Input
                        className="dsvb_user_search-input"
                        placeholder="Tên văn bản"
                        allowClear
                        value={searchKey}
                        onChange={(e) => setSearchKey(e.target.value)}
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

                <Table
                    className="dsvb_user_table"
                    columns={columns}
                    locale={locale}
                    dataSource={tableData || listSentByMe}
                    // lấy trong dataSource cột 'id' để làm key cho từng row
                    rowKey={(item) => item.doc_id}
                    rowClassName={"table-row"}
                    scroll={{ x: false }}
                    // pagination={
                    //     listSentByMe.length <= 10
                    //         ? false
                    //         : {
                    //               pageSize: 10,
                    //           }
                    // } // mỗi trang nhiều nhất 10 tasks
                ></Table>
            </div>
        </div>
    )
}

export default Document_quanly_gui
