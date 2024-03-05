import "./spinner.css"
function Spinner({ size, color }) {
    return (
        <div className="spinner icon-spinner-5" aria-hidden="true" style={{ fontSize: size || "1em", color: color }}></div>
    )
}

export default Spinner