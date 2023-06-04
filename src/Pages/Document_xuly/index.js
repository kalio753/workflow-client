import { Breadcrumb, Button, Modal } from "antd"
import SmallHeader from "../components/SmallHeader"
import "./main.less"
import { useSelector } from "react-redux"
import { getDocDetailSelector } from "../../redux/selectors"
import { Link } from "react-router-dom"
import { createRef, useEffect, useState } from "react"
import ActionSection from "./ActionSection"
import ProgressSection from "../components/ProgressSection"

window.jQuery = $ // JQuery alias
window.$ = $

require("jquery-ui-sortable")
require("formBuilder")
require("formBuilder/dist/form-render.min.js")

function Document_xuly() {
    const docData = useSelector(getDocDetailSelector)
    // Lưu ghi chú của người dùng (owner & data) lấy để show trong modal

    // Hàm này để lấy các mảng id của user có đính kèm file
    let resByUser = docData.doc_resources.reduce((acc, res) => {
        if (!acc.includes(res.user_id)) {
            return [...acc, res.user_id]
        }
        return acc
    }, [])
    resByUser = resByUser?.map((res) => {
        return {
            user_id: res,
            files: docData.doc_resources
                ?.filter((doc) => doc.user_id === res)
                ?.map((doc) => {
                    if (doc.user_id === res) {
                        // This is code for Multer upload
                        // const tmp = doc.path.split("/")
                        // const fileName = tmp[tmp.length - 1]
                        // console.log(
                        //     "etest",
                        //     fileName.substring(fileName.indexOf("-") + 1)
                        // )
                        // // console.log("tes", tmp[tmp.length - 1])
                        // return {
                        //     // Tên file để hiển thị lên UI
                        //     fileToShow: fileName.substring(
                        //         fileName.indexOf("-") + 1
                        //     ),
                        //     // Tên file để trỏ đến file trong server Express
                        //     fileToDirect: tmp.slice(2).join("/"),
                        //     // Để biết thuộc bước thứ mấy của người đó
                        //     fromStep: doc.step_action_id,
                        // }

                        // This is code for S3
                        console.log("log", doc)
                        const i = doc.path.indexOf("_")
                        let tmp = [doc.path.slice(0, i), doc.path.slice(i + 1)]
                        const fileName = tmp[1]
                        return {
                            // Tên file để hiển thị lên UI
                            fileToShow: fileName,
                            // Tên file để trỏ đến file trong server Express
                            fileToDirect: doc.path,
                            // Để biết thuộc bước thứ mấy của người đó
                            fromStep: doc.step_action_id,
                        }
                    }
                }),
        }
    })

    const fb = createRef()
    let formData

    useEffect(() => {
        const config = {
            formData: docData.doc_data.doc_content,
        }
        formData = $(fb.current).formRender(config)
    })

    const availableStep = docData.doc_sa?.filter(
        (step) => step.action_name !== null
    )

    const parentStep = availableStep.filter((step) => step.parent_id === null)
    const childStep = availableStep.filter((step) => step.parent_id !== null)

    return (
        <div>
            {/* <Breadcrumb
                style={{
                    margin: "16px 0",
                    color: "#434349",
                }}
                separator="»"
            >
                <Breadcrumb.Item>
                    <Link>Tài liệu</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={"/guiden"}>Gửi đến</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className="bread-active">
                    {docData.doc_title}
                </Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="vb_user_duyet_background">
                <SmallHeader title={docData.doc_title}></SmallHeader>
                <div className="vb_user_d_container">
                    <div className="input_section">
                        <div className="fb-editor form_disabled" ref={fb}></div>
                    </div>
                    <div className="progress_section_xuly">
                        {parentStep?.map((step, index) => {
                            const res = resByUser.filter(
                                (res) => res.user_id === step.user_id
                            )[0]?.files
                            // if (index < docData.doc_sa.length - 1)
                            return (
                                <ProgressSection
                                    index={index}
                                    step={step}
                                    res={resByUser}
                                    childStep={childStep}
                                />
                            )
                        })}
                        <div className="extra_section">
                            <ActionSection doc_id={docData.doc_id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Document_xuly
