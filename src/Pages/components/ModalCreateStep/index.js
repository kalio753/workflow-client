import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Button,
    Input,
    Modal,
    Checkbox,
    InputNumber,
    Tabs,
    Select,
    message,
} from "antd"
import axios from "axios"

import "./ModalCreateStep.less"
import { Close } from "../../../assets/images"
import { toggleModalCreateStepVisible } from "../../../redux/slices/modalVisibleSlice"
import { toggleCreateStepSucceed } from "../../../redux/slices/refreshVariableSlice"
import { getToken } from "../../../../utils/helper"

let timeout, currentValue

function ModalCreateStep({ visible, template_id }) {
    const dispatch = useDispatch()
    const [stepInputName, setStepInputName] = useState([])
    const [stepInputPart, setStepInputPart] = useState([])
    const [stepInputPosition, setStepInputPosition] = useState([])
    const [currentTab, setCurrentTab] = useState(1)
    const [checkboxValue, setCheckboxValue] = useState(false)
    const stepNumberRef = useRef()
    const { Option } = Select

    function getData(name, value) {
        const token = getToken("usertoken")
        return axios.request({
            method: "post",
            url:
                process.env.HD_EXP_DOMAIN +
                `/sampledata/${name}/list?kw=${value}`,
            data: {
                token: token,
            },
        })
    }

    const tabPanels = [
        {
            id: 1,
            tabName: "Tên",
            // placeholder: "Nhập tên",
            // value: stepInputName,
        },
        {
            id: 2,
            tabName: "Phòng ban",
            // placeholder: "Nhập phòng ban",
            // value: stepInputPart,
        },
        {
            id: 3,
            tabName: "Chức danh",
            // placeholder: "Nhập vị trí",
            // value: stepInputPosition,
        },
    ]

    const handleChangeTab = (key) => {
        setCurrentTab(key)
    }

    const handleCheckbox = (e) => {
        setCheckboxValue(e.target.checked)
    }

    const handleCreateStep = () => {
        if (!stepNumberRef.current.value) {
            message.warn("Hãy nhập số thứ tự bước")
        } else {
            if (currentTab == 1 && stepInputName.length === 0) {
                message.warn("Hãy nhập tên người")
            } else if (currentTab == 2 && stepInputPart.length === 0) {
                message.warn("Hãy nhập tên phòng ban")
            } else if (currentTab == 3 && stepInputPosition.length === 0) {
                message.warn("Hãy nhập tên chức danh")
            } else {
                const idList = (
                    currentTab == 1
                        ? stepInputName
                        : currentTab == 2
                        ? stepInputPart
                        : stepInputPosition
                ).map((step) => step.id)

                const apiRequestBody = {
                    template_ID: template_id,
                    is_start: checkboxValue,
                    step_number: stepNumberRef.current.value,
                }
                const key =
                    currentTab == 1
                        ? "user_id"
                        : currentTab == 2
                        ? "part_id"
                        : "position_id"
                apiRequestBody[key] = idList

                const token = getToken("usertoken")
                axios
                    .post(`${process.env.HD_EXP_DOMAIN}/step/create`, {
                        ...apiRequestBody,
                        token,
                    })
                    .then((response) => {
                        if (response.data.result) {
                            // handleReturnMessage(response)
                            setCheckboxValue(false)
                            setStepInputName([])
                            setStepInputPart([])
                            setStepInputPosition([])
                            dispatch(toggleModalCreateStepVisible())
                            dispatch(toggleCreateStepSucceed())
                            message.success(response.data.data)
                        } else {
                            message.error(response.data.data)
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }

    // Tùy theo tab mà chọn link request khác nhau
    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }

        currentValue = value

        const fake = () => {
            if (currentTab == 1) {
                getData("user", value).then((res) => callback(res.data))
            }
            if (currentTab == 2) {
                getData("part", value).then((res) => callback(res.data))
            }
            if (currentTab == 3) {
                getData("position", value).then((res) => callback(res.data))
            }
        }

        timeout = setTimeout(fake, 1000)
    }

    const SearchInput = (props) => {
        const [data, setData] = useState([])
        const [value, setValue] = useState()

        const handleSearch = (newValue) => {
            if (newValue) {
                fetch(newValue, setData)
            } else {
                setData([])
            }
        }

        const handleChange = (newValue) => {
            setValue(newValue)
            currentTab == 1
                ? setStepInputName((prev) =>
                      prev.find((value) => value.id == newValue)
                          ? [...prev]
                          : [...prev, data.find((d) => d.id == newValue)]
                  )
                : currentTab == 2
                ? setStepInputPart((prev) =>
                      prev.find((value) => value.id == newValue)
                          ? [...prev]
                          : [...prev, data.find((d) => d.id == newValue)]
                  )
                : setStepInputPosition((prev) =>
                      prev.find((value) => value.id == newValue)
                          ? [...prev]
                          : [...prev, data.find((d) => d.id == newValue)]
                  )
        }

        return (
            <Select
                showSearch
                value={value}
                placeholder={props.placeholder}
                style={props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
                className="tqt__search-input"
                allowClear
            >
                {data.map((d) => (
                    <Option key={d.id} style={{ fontSize: 18 }}>
                        {d.name}
                    </Option>
                ))}
            </Select>
        )
    }

    const handleClearData = (id) => {
        console.log(id)

        currentTab == 1
            ? setStepInputName((prev) =>
                  prev.filter((value) => value.id !== id)
              )
            : currentTab == 2
            ? setStepInputPart((prev) =>
                  prev.filter((value) => value.id !== id)
              )
            : setStepInputPosition((prev) =>
                  prev.filter((value) => value.id !== id)
              )
    }

    return (
        <Modal
            visible={visible}
            onOk={handleCreateStep}
            onCancel={() => {
                dispatch(toggleModalCreateStepVisible())
            }}
            centered={true}
            className="tqt__modal"
            footer={null}
            closeIcon={<img src={Close} />}
        >
            <h3 className="tqt__modal-title">Thêm quy trình</h3>

            <div className="tqt__modal-body">
                <Tabs
                    defaultActiveKey="1"
                    onChange={handleChangeTab}
                    className="tqt__modal-tabs"
                >
                    {tabPanels.map((item) => {
                        return (
                            <Tabs.TabPane tab={item.tabName} key={item.id}>
                                {/* <div className="tqt__modal-search-icon">
                                    <img src={Search_ic} />
                                </div> */}
                                <SearchInput placeholder="Tìm kiếm" />
                                <div className="tqt__modal-list">
                                    {(currentTab == 1
                                        ? stepInputName
                                        : currentTab == 2
                                        ? stepInputPart
                                        : stepInputPosition
                                    ).map((step) => (
                                        <div
                                            key={step.id}
                                            className="tqt__modal-item"
                                        >
                                            <div className="tqt__modal-item-name">
                                                {step.name}
                                            </div>
                                            <div
                                                className="tqt__modal-item-clear"
                                                onClick={() =>
                                                    handleClearData(step.id)
                                                }
                                            >
                                                Clear
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tabs.TabPane>
                        )
                    })}

                    <Tabs.TabPane tab="Phòng ban/Chức danh" key="4">
                        Content of Tab Pane 4
                    </Tabs.TabPane>
                </Tabs>
            </div>

            <div className="tqt__modal-footer">
                <div className="tqt__modal-step-info">
                    <div className="tqt__modal-step-number">
                        <span>Số thứ tự: </span>
                        <InputNumber
                            size="medium"
                            min={1}
                            className="tqt__modal-step-number-input"
                            placeholder="..."
                            ref={stepNumberRef}
                        />
                    </div>
                    <Checkbox
                        onChange={handleCheckbox}
                        checked={checkboxValue}
                        className="tqt__modal-checkbox"
                    >
                        Bước bắt đầu
                    </Checkbox>
                </div>
                <Button
                    className="btn btn_create"
                    type="primary"
                    onClick={handleCreateStep}
                >
                    Hoàn thành
                </Button>
            </div>
        </Modal>
    )
}

export default ModalCreateStep
