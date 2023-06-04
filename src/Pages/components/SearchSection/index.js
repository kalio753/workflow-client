import { Button, Input } from "antd"
import "./main.less"

function SearchSection({ onclick, placeholder = "Tên tài liệu" }) {
    return (
        <div className="search_wkf">
            <Input style={{ paddingLeft: 19 }} placeholder={placeholder} />
            <Button
                className="search-btn"
                style={{
                    marginLeft: 39,
                    width: 151,
                    height: 44,
                    backgroundColor: "#3699ff",
                    color: "#ffffff",
                }}
                onClick={onclick}
            >
                Tìm kiếm
            </Button>
        </div>
    )
}

export default SearchSection
