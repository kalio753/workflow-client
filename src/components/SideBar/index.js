import React from "react"
import { Layout, Menu } from "antd"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
    Logo,
    Paper,
    Paper_Negative,
    Star,
    User,
    Work,
} from "../../assets/images"
import "./Sidebar.less"
import { getToken, parseJwt } from "../../../utils/helper"
const { Sider } = Layout

function Sidebar() {
    const userData = parseJwt(getToken("_ttoauth"))

    // const [collapsed, setCollapsed] = useState(false)
    // const [isOpenKey, setIsOpenKey] = useState("")
    // const [isSelectedKey, setIsSelectedKey] = useState("")

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
            className: key,
        }
    }
    let uri =
        window.location.href.includes("workflowfe") === true
            ? ""
            : "/workflow-service"
    const items = [
        getItem(
            <Link
                to={`${uri}/guiden`}
                onClick={() => {
                    // setIsSelectedKey("11")
                }}
            >
                Công việc của tôi
            </Link>,
            "menu-item-11",
            <img alt="" className="icon second-icon" src={Work}></img>
        ),
        getItem(
            "Tài liệu của tôi",
            "menu-item-2",
            <img alt="" className="icon second-icon" src={Paper}></img>,
            [
                getItem(
                    <Link
                        to={`${uri}/u`}
                        onClick={() => {
                            // setIsOpenKey("2")
                            // setIsSelectedKey("9")
                        }}
                    >
                        Tạo mới
                    </Link>,
                    "menu-item-9"
                ),
                getItem(
                    <Link
                        to={`${uri}/dagui`}
                        onClick={() => {
                            // setIsOpenKey("2")
                            // setIsSelectedKey("10")
                        }}
                    >
                        Đã gửi
                    </Link>,
                    "menu-item-10"
                ),
                // getItem(
                //     <Link
                //         to={`${uri}/guiden`}
                //         onClick={() => {
                //             setIsOpenKey("2")
                //             setIsSelectedKey("11")
                //         }}
                //     >
                //         Gửi đến
                //     </Link>,
                //     "menu-item-11"
                // ),
            ]
        ),
        userData.user_id == 1 &&
            getItem(
                "Quản lý tài liệu",
                "menu-item-4",
                <img
                    alt=""
                    className="icon second-icon"
                    src={Paper_Negative}
                ></img>,
                [
                    getItem(
                        <Link
                            to={`${uri}/quanly_template`}
                            onClick={() => {
                                // setIsOpenKey("4")
                                // setIsSelectedKey("7")
                            }}
                        >
                            Danh sách tài liệu
                        </Link>,
                        "menu-item-7"
                    ),
                    getItem(
                        <Link
                            to={`${uri}/dscc`}
                            onClick={() => {
                                // setIsOpenKey("4")
                                // setIsSelectedKey("8")
                            }}
                        >
                            Quy trình vận hành
                        </Link>,
                        "menu-item-8"
                    ),
                ]
            ),
    ]
    const renderMenu = () => {
        // Check if is admin
        if (userData.user_id == 1)
            return [
                getItem(
                    "Quản lý tài liệu",
                    "menu-item-4",
                    <img
                        alt=""
                        className="icon second-icon"
                        src={Paper_Negative}
                    ></img>,
                    [
                        getItem(
                            <Link
                                to={`${uri}/quanly_template`}
                                onClick={() => {
                                    // setIsOpenKey("4")
                                    // setIsSelectedKey("7")
                                }}
                            >
                                Danh sách tài liệu
                            </Link>,
                            "menu-item-7"
                        ),
                        getItem(
                            <Link
                                to={`${uri}/dscc`}
                                onClick={() => {
                                    // setIsOpenKey("4")
                                    // setIsSelectedKey("8")
                                }}
                            >
                                Quy trình vận hành
                            </Link>,
                            "menu-item-8"
                        ),
                    ]
                ),
            ]
        else
            return [
                getItem(
                    <Link
                        to={`${uri}/guiden`}
                        onClick={() => {
                            // setIsSelectedKey("11")
                        }}
                    >
                        Công việc của tôi
                    </Link>,
                    "menu-item-11",
                    <img alt="" className="icon second-icon" src={Work}></img>
                ),
                getItem(
                    "Tài liệu của tôi",
                    "menu-item-2",
                    <img alt="" className="icon second-icon" src={Paper}></img>,
                    [
                        getItem(
                            <Link
                                to={`${uri}/u`}
                                // onClick={() => {
                                //     setIsOpenKey("2")
                                //     setIsSelectedKey("9")
                                // }}
                            >
                                Tạo mới
                            </Link>,
                            "menu-item-9"
                        ),
                        getItem(
                            <Link
                                to={`${uri}/dagui`}
                                // onClick={() => {
                                //     setIsOpenKey("2")
                                //     setIsSelectedKey("10")
                                // }}
                            >
                                Đã gửi
                            </Link>,
                            "menu-item-10"
                        ),
                        // getItem(
                        //     <Link
                        //         to={`${uri}/guiden`}
                        //         onClick={() => {
                        //             setIsOpenKey("2")
                        //             setIsSelectedKey("11")
                        //         }}
                        //     >
                        //         Gửi đến
                        //     </Link>,
                        //     "menu-item-11"
                        // ),
                    ]
                ),
            ]
    }

    return renderMenu()

    return (
        <>
            {window.location.href.includes("erp") === true ? (
                renderMenu()
            ) : (
                <Sider
                    width="266px"
                    // collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={[`menu-item-3`]}
                        defaultOpenKeys={[`menu-item-2`, `menu-item-4`]}
                        mode="inline"
                        items={items}
                    />
                    {/* {renderMenu()} */}
                </Sider>
            )}
        </>
    )
}

export default Sidebar
