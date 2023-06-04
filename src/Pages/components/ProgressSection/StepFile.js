import { message } from "antd"
import axios from "axios"
import React from "react"
import { getFileExtName } from "../../../../utils/helper"

const StepFile = ({ file, setFileUrl, setFileModalOpen }) => {
    return (
        <a
            // Multer Upload
            // onClick={() => {
            //     setFileUrl({
            //         // link: `${process.env.HD_EXP_DOMAIN}${file.fileToDirect}`,
            //         link: `${file.fileToDirect}`,
            //         extName: re.exec(
            //             `${process.env.HD_EXP_DOMAIN}${file.fileToDirect}`
            //         )[1],
            //     })
            //     setFileModalOpen(true)
            // }}

            // S3 Edit cho nay
            onClick={() => {
                axios
                    .post(
                        `${process.env.S3_SERVICE_DOMAIN}/workflow/get_presigned_url`,
                        {
                            file_name: file.fileToDirect,
                            expires_time: 60,
                        }
                    )
                    .then((res) => {
                        if (res.data.result) {
                            console.log(res.data.data)
                            setFileUrl({
                                uri: `${res.data.data.uri}`,
                                fileType: `${res.data.data.fileType}`,
                                extName: getFileExtName(file.fileToDirect),
                            })
                            setFileModalOpen(true)
                        } else {
                            message.error("Không tồn tại file này")
                        }
                    })
            }}
            className="step_file"
        >
            {file.fileToShow}
        </a>
    )
}

export default StepFile
