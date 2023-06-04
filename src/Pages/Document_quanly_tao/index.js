import { Breadcrumb, Button, Modal, Table } from "antd"
import "./main.less"
import SmallHeader from "../components/SmallHeader"
import SearchSection from "../components/SearchSection"
import AddButton from "../components/AddButton"
import { Arr_Down, Arr_Up, Close } from "../../assets/images"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    getTemplateForUserSelector,
    getDocsSentByMeSelector,
} from "../../redux/selectors"
import {
    setNewDocJsonData,
    setJsonData,
} from "../../redux/slices/globalVariableSlice"
import { useNavigate } from "react-router-dom"
import { getTemplatesForUser } from "../../redux/slices/templateSlice"
import { getDocsSentByMe } from "../../redux/slices/documentSlice"
const erp_url = "/workflow-service"
// const erp_url = ""
function Document_quanly_tao() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const templateList = useSelector(getTemplateForUserSelector)
    const docsSentByMe = useSelector(getDocsSentByMeSelector)

    useEffect(() => {
        dispatch(getTemplatesForUser())
        dispatch(getDocsSentByMe())
    }, [dispatch])

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isFolder, setIsFolder] = useState(1)

    const folderIds = []
    const folderL = templateList?.reduce((acc, template) => {
        if (!folderIds.includes(template.folder_id)) {
            folderIds.push(template.folder_id)
            return [
                ...acc,
                {
                    id: template.folder_id,
                    name: template.folder_name,
                },
            ]
        }
        return [...acc]
    }, [])

    const combineList = folderL?.reduce((acc, folder) => {
        const templates = templateList.filter(
            (template) => template.folder_id === folder.id
        )
        return [...acc, { ...folder, templates }]
    }, [])
    // Format của obj trong modal: {folder_id, folder_name, templates:[]}

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const locale = {
        emptyText: "Chưa có văn bản được lưu",
    }

    const columns = [
        {
            key: "1",
            width: 320,
            title: <div className="table_title ml51">Ngày tạo</div>,
            render: (item) => {
                return (
                    <div className="table_title ml51">
                        {item.create_date.split("T")[0]}
                    </div>
                )
            },
        },
        {
            key: "2",
            width: 303,
            title: (
                <div className="table_title" style={{ fontSize: 18 }}>
                    Tên văn bản
                </div>
            ),
            render: (item) => {
                return <div className="fw700">{item.doc_title}</div>
            },
        },
        // {
        //     key: "3",
        //     width: 299,
        //     title: <div className="table_title">Xử lý</div>,
        //     render: (item) => {
        //         return <div className="table_title"></div>
        //     },
        // },

        {
            key: "4",
            title: "",
            render: (item) => {
                return (
                    <div className="btn_section">
                        <Button className="table_btn">Xem</Button>
                        <Button className="table_btn btn_reject">
                            Thu hồi
                        </Button>
                    </div>
                )
            },
        },
    ]

    const handleSelectTemplate = (template) => {
        dispatch(setNewDocJsonData(template))
        dispatch(setJsonData(template.jsondata))
        navigate(erp_url + "/ut")
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
                    Tạo mới
                </Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="dsvb_user_background">
                <SmallHeader title="Tạo mới">
                    <AddButton content="Tạo văn bản" onclick={showModal} />
                    <Modal
                        // title="Basic Modal"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        centered
                        className="dsvb_user_modal"
                        footer={null}
                        closeIcon={
                            <img src={Close} style={{ marginTop: -5 }} />
                        }
                    >
                        <div className="modal_header">
                            <h1 style={{ fontSize: 32 }}>Chọn loại văn bản</h1>
                        </div>
                        <div className="modal_body">
                            {combineList?.length === 0 ? (
                                <h1 className="modal_none">
                                    Chưa có văn bản, liên hệ Admin để tạo
                                </h1>
                            ) : (
                                combineList?.map((folder, index) => (
                                    <div className="modal_item" key={index}>
                                        <div
                                            className="modal_folder"
                                            onClick={() => {
                                                folder.id !== isFolder
                                                    ? setIsFolder(folder.id)
                                                    : setIsFolder(0)
                                            }}
                                        >
                                            <span style={{ flex: 1 }}>
                                                {folder.name}
                                            </span>
                                            <img
                                                src={
                                                    folder.id === isFolder
                                                        ? Arr_Up
                                                        : Arr_Down
                                                }
                                                alt=""
                                            />
                                        </div>
                                        {folder.id === isFolder && (
                                            <div className={`modal_content`}>
                                                {folder.id === isFolder &&
                                                folder.templates?.length !==
                                                    0 ? (
                                                    folder.templates?.map(
                                                        (template, index) => (
                                                            <div
                                                                key={index}
                                                                className={`modal_template`}
                                                                onClick={() =>
                                                                    handleSelectTemplate(
                                                                        template
                                                                    )
                                                                }
                                                            >
                                                                {
                                                                    template.template_name
                                                                }
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <div
                                                        className={`modal_template_none`}
                                                    >
                                                        Chưa có tài liệu
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </Modal>
                </SmallHeader>

                <div className="content">
                    <SearchSection
                        onclick={() => {}}
                        placeholder="Tên văn bản"
                    />
                </div>

                <Table
                    locale={locale}
                    className="dsvb_user_table"
                    columns={columns}
                    dataSource={[]}
                    // lấy trong dataSource cột 'id' để làm key cho từng row
                    rowKey={(item) => item.id}
                    rowClassName={"table-row"}
                    pagination={
                        docsSentByMe?.length <= 10
                            ? false
                            : {
                                  pageSize: 10,
                              }
                    } // mỗi trang nhiều nhất 10 tasks
                ></Table>
            </div>
        </div>
    )
}

export default Document_quanly_tao
