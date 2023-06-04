import { Breadcrumb, Table, Button, Input } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import "./main.less"
import SearchSection from "../components/SearchSection"
import { getDocsSentToMe, setDocDetail } from "../../redux/slices/documentSlice"
import { getDocsSentToMeSelector } from "../../redux/selectors"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { getActions } from "../../redux/slices/actionsSlice"
import SmallHeader from "../components/SmallHeader"
import { setIsTrienKhai } from "../../redux/slices/globalVariableSlice"

const erp_url = "/workflow-service"
// const erp_url = ""

function Document_quanly_den() {
    const [searchKey, setSearchKey] = useState("")
    const [tableData, setTableData] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDocsSentToMe())
    }, [dispatch])
    const listSentToMe = useSelector(getDocsSentToMeSelector)

    let locale = {
        emptyText:
            // isLoading ? (
            //     <Spin size="large"></Spin>
            // ) : (
            "Không có văn bản nào.",
        // ),
    }

    const columns = [
        {
            key: "1",
            width: 310,
            title: <div className="table_title ml51">Người tạo</div>,
            render: (item) => {
                return (
                    <div className="fw700 ml51">{item.start_at.user_name}</div>
                )
            },
        },
        {
            key: "2",
            width: 300,
            title: <div className="table_title">Loại văn bản</div>,
            render: (item) => {
                return <div className="table_content">{item.doc_title}</div>
            },
        },
        {
            key: "3",
            width: 320,

            title: <div className="table_title">Xử lý</div>,
            render: (item) => {
                let color = "#3699ff"
                if (item.status === "Đã duyệt") color = "#35794a"
                else if (item.status === "Chưa xem") color = "#f23f44"
                return (
                    <div className="table_content" style={{ color: color }}>
                        {item.last_action_by.action_name}
                    </div>
                )
            },
        },
        {
            key: "4",
            width: 216,
            title: <div className="table_title">Ngày tạo</div>,
            render: (item) => {
                return (
                    <div className="table_title">
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
            key: "5",
            title: "",
            render: (item) => {
                return (
                    <div className="btn_section">
                        <Button
                            className="table_btn"
                            onClick={() => handleGetDocDetail(item)}
                        >
                            Xem
                        </Button>
                    </div>
                )
            },
        },
    ]

    const handleGetDocDetail = (item) => {
        // console.log(item)
        dispatch(getActions(item.doc_id))
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
                // headers: {
                //     Authorization: `Bearer ${token}`
                // },
                url: `${process.env.HD_EXP_DOMAIN}/me/doc/${item.doc_id}/detail/`,
                data: {
                    token: token,
                },
            })
            .then((response) => {
                const { data } = response
                if (data.result) {
                    const doc_title = listSentToMe.reduce(
                        (acc, doc) =>
                            doc.doc_id === item.doc_id ? doc.doc_title : acc,
                        ""
                    )

                    dispatch(
                        setDocDetail({
                            ...data.data,
                            doc_title,
                            doc_id: item.doc_id,
                        })
                    )
                    navigate(erp_url + "/ue")
                }
            })
            .catch((err) => console.log("er", err))
    }

    const handleSearch = () => {
        setTableData(
            listSentToMe.filter((doc) => {
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
                    Gửi đến
                </Breadcrumb.Item>
            </Breadcrumb> */}

            <div className="dsvb_user_d_background">
                {/* <SmallHeader title="Tài liệu của tôi"></SmallHeader> */}
                <SmallHeader title="Gửi đến">
                    {/* <AddButton content="Tạo tài liệu" onclick={showModal} /> */}
                </SmallHeader>
                <div className="dsvb_den_search search_wkf">
                    <Input
                        className="dsvb_den_search-input"
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
                    dataSource={tableData || listSentToMe}
                    // lấy trong dataSource cột 'id' để làm key cho từng row
                    rowKey={(item) => item.doc_id}
                    rowClassName={"table-row"}
                    scroll={{ x: false }}
                    // pagination={
                    //     // listSentToMe.length <= 10
                    //     // ? false
                    //     {
                    //         // current: 1,
                    //         pageSize: 10,
                    //     }
                    // } // mỗi trang nhiều nhất 10 tasks
                ></Table>
            </div>
        </div>
    )
}

export default Document_quanly_den
