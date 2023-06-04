import { PlusCircleOutlined } from "@ant-design/icons"
import { Button, Select } from "antd"
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

import "./Template_flow.less"
import { useDispatch, useSelector } from "react-redux"
import {
    getFolderSelector,
    getModalCreateStepVisibleSelector,
    getRefreshCreateStepSucceedSelector,
    getStepsByIdSelector,
    getTemplateSelector,
} from "../../redux/selectors"
import { getFolder } from "../../redux/slices/folderSlice"
import ModalCreateStep from "../components/ModalCreateStep"
import { toggleModalCreateStepVisible } from "../../redux/slices/modalVisibleSlice"
import { getTemplates } from "../../redux/slices/templateSlice"
import { getStepsById, setStepsById } from "../../redux/slices/stepsSlice"

const erp_url = "/workflow-service"

function Template_flow() {
    const location = useLocation()
    const dispatch = useDispatch()

    const [folderSelected, setFolderSelected] = useState("")
    const [templateSelected, setTemplateSelected] = useState("")

    const isModalVisible = useSelector(getModalCreateStepVisibleSelector)
    const refresh = useSelector(getRefreshCreateStepSucceedSelector)
    var isDisabled = false

    useEffect(() => {
        dispatch(getFolder())
        dispatch(getTemplates())
        if (location.state) {
            dispatch(getStepsById(location.state))
        }
    }, [dispatch, refresh])

    const workflow = useSelector(getStepsByIdSelector)
    const folderList = useSelector(getFolderSelector)
    const templateList = useSelector(getTemplateSelector)

    if (location.state) {
        isDisabled = true
    }

    const handleSelectFolder = (value, index) => {
        folderList.forEach((folder, index1) => {
            if (folder.name === value) {
                setFolderSelected(folder.id)
            }
        })
    }

    const handleSelectTemplate = (value) => {
        const templateChosed = templateList.find(
            (template) => template.template_name === value
        )
        setTemplateSelected(templateChosed.template_id)
        if (templateChosed) {
            // Disabled 2 dropdown field with this location.state variable via the if statement above
            location.state = templateChosed.template_id
            dispatch(getStepsById(templateChosed.template_id))
        }
    }

    const showModal = () => {
        dispatch(toggleModalCreateStepVisible())
    }

    return (
        <div>
            {/* <Breadcrumb className="breadcrumb" separator="»">
                <Breadcrumb.Item>Tài liệu</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/dscc">Quy trình vận hành</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tạo quy trình tài liệu</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="tqt-layout-background">
                <h3 className="title">Tạo quy trình tài liệu</h3>

                <div className="tqt-content">
                    <div className="tqt-form">
                        <div className="tqt-form__left">
                            <Select
                                // mode="multi"
                                style={{
                                    width: "100%",
                                }}
                                placeholder="Chọn nhóm"
                                onChange={handleSelectFolder}
                                optionLabelProp="label"
                                value={
                                    templateList?.find(
                                        (template) =>
                                            location.state ===
                                            template.template_id
                                    )?.folder_name
                                }
                                disabled={isDisabled}
                                suffixIcon={<div></div>}
                                allowClear
                                listHeight={128}
                                showSearch
                                className="tqt-form__folder"
                            >
                                {folderList &&
                                    folderList?.map((folder, index) => {
                                        return (
                                            <Select.Option
                                                key={folder.id}
                                                value={folder.name}
                                                style={{ fontSize: 18 }}
                                            >
                                                {folder.name}
                                            </Select.Option>
                                        )
                                    })}
                            </Select>
                        </div>
                        <div className="tqt-form__right">
                            <Select
                                // mode="multi"
                                style={{
                                    width: "100%",
                                    height: "44px",
                                }}
                                value={
                                    templateList?.find(
                                        (template) =>
                                            location.state ===
                                            template.template_id
                                    )?.template_name
                                }
                                disabled={
                                    isDisabled
                                    // workflow.length > 0 ||
                                    // templateSelected !== ""
                                    //     ? true
                                    //     : false
                                }
                                placeholder="Chọn tài liệu"
                                onChange={handleSelectTemplate}
                                optionLabelProp="label"
                                suffixIcon={<div></div>}
                                listHeight={128}
                                showSearch
                                className="tqt-form__template"
                            >
                                {folderSelected !== ""
                                    ? templateList
                                          ?.filter(
                                              (template) =>
                                                  template.folder_id ===
                                                  folderSelected
                                          )
                                          ?.map((template, index) => {
                                              return (
                                                  <Select.Option
                                                      key={template.template_id}
                                                      value={
                                                          template.template_name
                                                      }
                                                  ></Select.Option>
                                              )
                                          })
                                    : templateList?.map((template, index) => {
                                          return (
                                              <Select.Option
                                                  key={template.template_id}
                                                  value={template.template_name}
                                                  style={{ fontSize: 18 }}
                                              ></Select.Option>
                                          )
                                      })}
                            </Select>
                        </div>
                    </div>

                    <div className="tqt-add">
                        <Button
                            className="btn btn-add"
                            onClick={showModal}
                            style={{
                                display: isDisabled ? "flex" : "none",
                            }}
                        >
                            <PlusCircleOutlined />
                            Thêm
                        </Button>
                    </div>

                    <div className="tqt-wkf">
                        {workflow.length === 0 ? (
                            !isDisabled ? (
                                <div>Hãy chọn nhóm và tài liệu</div>
                            ) : (
                                <div>Tài liệu chưa có quy trình</div>
                            )
                        ) : (
                            <>
                                <div className="tqt-wkf__title">
                                    <h1 className="tqt-wkf__title-head">STT</h1>
                                    <div className="tqt-wkf__title-position">
                                        Bộ phận phụ trách
                                    </div>
                                </div>
                                {workflow?.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="tqt-wkf__item"
                                        >
                                            <span className="tqt-wkf__item-stepnumber">
                                                {item.step_number}
                                            </span>
                                            <div>
                                                {item.data?.map(
                                                    (objExecute, index) => (
                                                        <div
                                                            key={index}
                                                            className="tqt-wkf__item-person"
                                                        >
                                                            {objExecute.part_name ||
                                                                objExecute.position_name}
                                                        </div>
                                                    )
                                                )}
                                                {/* {item.data?.map(
                                                (objExecute, index) => (
                                                    <div
                                                        key={index}
                                                        className="tqt-wkf__item-person"
                                                    >
                                                        {
                                                            objExecute.position_name
                                                        }
                                                    </div>
                                                )
                                            )} */}
                                            </div>
                                            <div className="tqt-wkf__item-buttons">
                                                <Button className="tqt-wkf__item-edit-btn">
                                                    Chỉnh sửa
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        )}
                    </div>

                    <div className="tqt-actions">
                        <Link to={erp_url + "/dscc"}>
                            <Button
                                className="btn btn_close"
                                type="primary"
                                onClick={() => dispatch(setStepsById([]))}
                            >
                                Đóng
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <ModalCreateStep
                visible={isModalVisible}
                template_id={location.state || templateSelected}
            />
        </div>
    )
}

export default Template_flow
