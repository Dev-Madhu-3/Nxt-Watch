import { useNavigate, useParams } from 'react-router-dom'

const withRouter = (Component) => {
    return (props) => {
        const navigate = useNavigate()
        const { id } = useParams
        return <Component {...props} navigate={navigate} id={id} />
    };
};

export default withRouter
