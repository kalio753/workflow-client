import "./main.less"

function SmallHeader({ title, solo, children }) {
    return (
        <div
            className="small-header"
            style={{
                justifyContent: solo ? "center" : "space-between",
            }}
        >
            <h1 className="title">{title}</h1>
            {children}
        </div>
    )
}

export default SmallHeader
