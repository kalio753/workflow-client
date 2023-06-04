import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import { Modal } from "antd"
import React from "react"
import "./fileModal.less"

function FileModal(props) {
    const { fileUrl, ...restProps } = props
    console.log("fileUrl", fileUrl)

    // console.log("haha", process.env.HD_EXP_DOMAIN + "/" + fileUrl.link)

    const extName = fileUrl.extName
    const imgExt = ["png", "jpg", "jpeg", "PNG"]
    const docExt = ["doc", "docx", "xlsx", "xls"]

    const docs = [
        // This is for multer upload
        // {
        //     uri: process.env.HD_EXP_DOMAIN + "/" + fileUrl.link,
        // },
        // This is for s3 upload
        {
            uri: fileUrl.uri,
            fileType: fileUrl.fileType,
        },
        // uri: "https://haidawng-bucket-wkf.s3.amazonaws.com/word/16709832689274592_doc1.doc?response-content-type=application%2Fmsword&AWSAccessKeyId=AKIAWGJFTTXHQ2XCDPE5&Signature=HpqjNvrki6pNsZpFSx5o3XG5EAk%3D&Expires=1670984737",
    ]

    return (
        <Modal {...restProps}>
            <div
                style={{
                    height: "90vh",
                    width: "100%",
                }}
            >
                {extName === "pdf" ? (
                    // For multer upload
                    // <iframe
                    //     src={process.env.HD_EXP_DOMAIN + "/" + fileUrl.link}
                    //     frameBorder="0"
                    //     className="file-preview"
                    // ></iframe>

                    // For s3 upload
                    <iframe
                        src={fileUrl.uri}
                        frameBorder="0"
                        className="file-preview"
                    ></iframe>
                ) : imgExt.includes(extName) ? (
                    <img
                        src={fileUrl.uri}
                        style={{ height: "100%", width: "100%" }}
                    ></img>
                ) : (
                    <DocViewer
                        pluginRenderers={DocViewerRenderers}
                        documents={docs}
                    />
                )}
            </div>
        </Modal>
    )
}

export default FileModal
