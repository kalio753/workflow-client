const defaultConfig = (dfValueJsonData) => ({
    defaultFields: dfValueJsonData,
    i18n: {
        override: {
            "en-US": {
                // getStarted: 'Kéo một trường từ bên phải vào vùng này',
                addOption: "Thêm tùy chọn",
                allFieldsRemoved: "Tất cả các trường đã bị gỡ bỏ.",
                allowSelect: "Cho phép chọn",
                cannotBeEmpty: "Trường này không thể để trống",
                class: "Class",
                clearAllMessage: "Bạn có chắc muốn xóa tất cả các trường?",
                clear: "Xóa",
                close: "Đóng",
                content: "Nội dung",
                copy: "Sao chép vào bộ nhớ",
                dateField: "Trường thời gian",
                description: "Văn bản trợ giúp",
                descriptionField: "Mô tả",
                devMode: "Chế độ nhà phát triển",
                editNames: "Sửa tên",
                editorTitle: "Các phần tử biểu mẫu",
                editXML: "Sửa XML",
                fieldVars: "Field Variables",
                fieldNonEditable: "Trường này không thể sửa",
                fieldRemoveWarning: "Bạn có chắc muốn xóa trường này?",
                fileUpload: "Tải lên tập tin",
                formUpdated: "Biểu mẫu đã cập nhật",
                getStarted: "Kéo một trường từ bên phải vào vùng này",
                header: "Tiêu đề",
                hide: "Sửa",
                hidden: "Input ẩn",
                label: "Nhãn",
                labelEmpty: "Nhãn không thể để trống",
                limitRole: "Giới hạn truy cập vào một trong những quyền sau:",
                mandatory: "Bắt buộc",
                maxlength: "Độ dài tối đa",
                minOptionMessage: "Trường này yêu cầu tối thiểu 2 tùy chọn",
                name: "Tên",
                no: "Không",
                off: "Tắt",
                on: "Bật",
                option: "Tùy chọn",
                optional: "tùy chọn",
                optionEmpty: "Giá trị của tùy chọn là bắt buộc",
                paragraph: "Đoạn văn bản",
                placeholder: "Placeholder",
                preview: "Xem trước",
                radioGroup: "Nhóm Radio",
                radio: "Radio",
                removeMessage: "Gỡ bỏ phần tử",
                remove: "&#215;",
                required: "Bắt buộc",
                richText: "Trình soạn thảo văn bản có định dạng",
                roles: "Truy cập",
                save: "Lưu lại",
                selectOptions: "Các tùy chọn",
                select: "Chọn",
                selectColor: "Chọn màu",
                selectionsMessage: "Cho phép nhiều lựa chọn",
                size: "Kích cỡ",
                sizes: "Kích cỡ",
                style: "Style",
                styles: "Styles",
                subtype: "Loại",
                text: "Trường văn bản",
                textArea: "Vùng văn bản",
                toggle: "Bật tắt",
                warning: "Cảnh báo!",
                viewJSON: "{ }",
                viewXML: "</>",
                yes: "Đồng ý",
            },
        },
    },
    controlOrder: ["header", "text", "textarea", "date", "number", "file"],
    replaceFields: [
        {
            type: "text",
            label: "Trường văn bản",
        },
        {
            type: "header",
            label: "Tiêu đề",
        },
        {
            type: "textarea",
            label: "Vùng văn bản",
        },
        {
            type: "date",
            label: "Chọn ngày tháng",
        },
        // {
        //     type: "select",
        //     label: "Lựa chọn",
        // },
        // {
        //     type: "checkbox-group",
        //     label: "Các lựa chọn",
        // },
        // {
        //     type: "file",
        //     label: "Đính kèm tập tin",
        // },
        {
            type: "number",
            label: "Số",
        },
    ],
    disableFields: [
        "autocomplete",
        "button",
        "radio-group",
        "paragraph",
        "hidden",
        "select",
        "checkbox-group",
        "file",
    ],
    disabledActionButtons: ["clear", "save", "data"],
})

export default defaultConfig
