const StepHead = ({ step, isChild }) => {
    const date = step.update_date.replace("T", " lúc ")

    return (
        <>
            {!isChild ? <div className="step_divide"></div> : null}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="step_user">
                    {step.user_name || step.position_name || step.part_name}
                </div>
                <div className="step_name">({step.action_name})</div>
            </div>
            <div className="step_date">
                {step.update_date ? "Đã tạo: " + date : ""}
            </div>
        </>
    )
}

export default StepHead
