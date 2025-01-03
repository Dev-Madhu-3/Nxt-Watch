import { Oval } from "react-loader-spinner"

function Loader() {
    return (<Oval
        visible={true}
        height="50"
        width="50"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
    />)
}

export default Loader