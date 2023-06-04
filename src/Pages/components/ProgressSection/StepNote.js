import { Modal } from "antd"
import { useState } from "react"

const StepNote = ({ step }) => {
    const [note, setNote] = useState({})
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <div className="step_note">
                <div className="step_note_title">Ghi chú:</div>
                {step.note.length >= 70 ? (
                    <>
                        {step.note.slice(0, 55)}
                        <span className="step_note_fade">
                            {step.note.slice(55, 69) + "..."}
                        </span>
                        <div
                            className="step_note_more"
                            onClick={() => {
                                setModalOpen(true)
                                setNote({
                                    owner:
                                        step.user_name ||
                                        step.position_name ||
                                        step.part_name,
                                    data: step.note,
                                })
                            }}
                        >
                            Xem thêm
                        </div>
                    </>
                ) : (
                    step.note
                )}
            </div>
            <Modal
                title={`${note.owner} đã ghi chú:`}
                centered
                footer={null}
                visible={modalOpen}
                onCancel={() => setModalOpen(false)}
                className="note-modal"
            >
                <div style={{ textAlign: "center" }}>{note.data}</div>
            </Modal>
        </>
    )
}

export default StepNote
