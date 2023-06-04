import { Button } from "antd"
import { Plus } from "../../../assets/images/"
import "./main.less"

function AddButton({ content, onclick }) {
    return (
        <Button
            type="primary"
            className="add-btn wobble-hor-bottom"
            onClick={onclick}
        >
            <img src={Plus} alt="" />
            {content}
        </Button>
    )
}

export default AddButton
