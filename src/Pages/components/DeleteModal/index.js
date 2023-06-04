import { Button, Modal, Spin } from "antd"
import "./deleteModal.less"

function DeleteModal({
    open,
    confirmLoading,
    handleCancel,
    handleOk,
    modalText,
}) {
    return (
        <Modal
            className="delete-modal"
            open={open}
            centered={true}
            footer={
                confirmLoading ? (
                    <Spin
                        style={{ justifyContent: "end", gap: 16 }}
                        tip="Đang tải ..."
                    ></Spin>
                ) : (
                    [
                        <Button
                            key="1"
                            onClick={handleCancel}
                            className="modal_btn modal_btn--cancel"
                        >
                            Hủy
                        </Button>,
                        <Button
                            key="2"
                            onClick={handleOk}
                            className="modal_btn modal_btn--delete"
                        >
                            Xác nhận
                        </Button>,
                    ]
                )
            }
            onCancel={handleCancel}
            confirmLoading={confirmLoading}
        >
            <p style={{ fontSize: 18 }}>{modalText}</p>
        </Modal>
    )
}

export default DeleteModal
