import React, { useState } from "react"
import FileModal from "../FileModal"
import StepFile from "./StepFile"
import StepHead from "./StepHead"
import StepNote from "./StepNote"

const ProgressSection = ({ index, step, res, childStep }) => {
    const [filemodalOpen, setFileModalOpen] = useState(false)
    const [fileUrl, setFileUrl] = useState({})

    return (
        <div
            className={`step`}
            key={index}
            // style={
            //     !step.isActive ? { display: "none" } : {}
            // }
        >
            <div className={"step_num"}>{index + 1}</div>
            <div className="step_info">
                <StepHead step={step} />

                {step.note ? <StepNote step={step} /> : null}

                {res?.map((tmp) =>
                    tmp.files?.map((file) => {
                        if (file.fromStep === step.id) {
                            return (
                                <div key={index}>
                                    <StepFile
                                        file={file}
                                        setFileUrl={setFileUrl}
                                        setFileModalOpen={setFileModalOpen}
                                    />
                                </div>
                            )
                        }
                    })
                )}
                {/* {res?.map((files) =>
                    files?.map((file, index) => {
                        if (file.fromStep === step.id) {
                            return (
                                <div key={index}>
                                    <StepFile
                                        file={file}
                                        setFileUrl={setFileUrl}
                                        setFileModalOpen={setFileModalOpen}
                                    />
                                </div>
                            )
                        }
                    })
                )} */}
                {childStep?.map((child_step, i2) => {
                    // console.log("child_step", childStep)
                    return child_step.parent_id === step.id ? (
                        <div className={"step step_child"} key={child_step.id}>
                            <div className="step_num">-</div>
                            <div className="step_info">
                                <StepHead step={child_step} isChild />

                                {child_step.note ? (
                                    <StepNote step={child_step} />
                                ) : null}
                                {res?.map((tmp) =>
                                    tmp.files?.map((file) => {
                                        if (file.fromStep === child_step.id) {
                                            return (
                                                <div key={index}>
                                                    <StepFile
                                                        file={file}
                                                        setFileUrl={setFileUrl}
                                                        setFileModalOpen={
                                                            setFileModalOpen
                                                        }
                                                    />
                                                </div>
                                            )
                                        }
                                    })
                                )}
                            </div>
                        </div>
                    ) : null
                })}
            </div>

            <FileModal
                className="file-modal"
                style={{}}
                fileUrl={fileUrl}
                centered
                // closable={false}
                header={null}
                footer={null}
                visible={filemodalOpen}
                onCancel={() => {
                    setFileModalOpen(false)
                    setFileUrl({})
                }}
            />
        </div>
    )
}

export default ProgressSection
