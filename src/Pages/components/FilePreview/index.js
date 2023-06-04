import React from "react"

const FilePreview = ({ index, file, onDelete }) => {
    return (
        <div key={index}>
            <div
                style={{
                    display: "flex",
                    marginTop: 24,
                }}
            >
                <div>
                    {file?.name.split(".")[1] === "pdf" ||
                    file?.name.split(".")[1] === "txt" ? (
                        <object
                            className="vb_user_t_file-section-pdf-preview"
                            data={URL.createObjectURL(file)}
                            type=""
                        ></object>
                    ) : null}
                    {file?.name.split(".")[1] === "png" ||
                    file?.name.split(".")[1] === "jpg" ||
                    file?.name.split(".")[1] === "jpeg" ? (
                        <img
                            className="vb_user_t_file-section-img-preview"
                            src={URL.createObjectURL(file)}
                        />
                    ) : null}
                    {file?.name.split(".")[1] === "doc" ||
                    file?.name.split(".")[1] === "docx" ? (
                        <img
                            className="vb_user_t_file-section-img-preview"
                            src="https://download.logo.wine/logo/Microsoft_Word/Microsoft_Word-Logo.wine.png"
                        />
                    ) : null}
                    {file?.name.split(".")[1] === "xls" ||
                    file?.name.split(".")[1] === "xlsx" ? (
                        <img
                            className="vb_user_t_file-section-img-preview"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg/512px-Microsoft_Office_Excel_%282019%E2%80%93present%29.svg.png?20190925171014"
                        />
                    ) : null}
                    {file?.name.split(".")[1] === "ppt" ||
                    file?.name.split(".")[1] === "pptx" ? (
                        <img
                            className="vb_user_t_file-section-img-preview"
                            src="https://cdn-icons-png.flaticon.com/512/732/732224.png"
                        />
                    ) : null}
                </div>

                <span
                    className="vb_user_t_file-section-clear"
                    onClick={() => onDelete(file?.name)}
                >
                    x
                </span>
            </div>

            <div className="vb_user_t_file-section-title">{file?.name}</div>
        </div>
    )
}

export default FilePreview
