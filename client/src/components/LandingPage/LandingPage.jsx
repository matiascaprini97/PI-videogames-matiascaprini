import { Link } from "react-router-dom"
import PATHROUTES from "../../helper/PathRoutes";

const LandingPage = () => {
    return (
        <div>
            <Link to={PATHROUTES.HOME}>
                <span>Bienvenido</span>
            </Link>
        </div>
    )
}

export default LandingPage;