import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar"
import PATHROUTES from "../../helper/PathRoutes"

const Nav = ({ onSearch }) => {
    return (
        <div >
            <div>
                <div>
                    <Link to={PATHROUTES.HOME}>
                        <span>Home</span>
                    </Link>
                    <Link to={PATHROUTES.ABOUT} >
                        <span>About</span>
                    </Link>
                    <Link to={PATHROUTES.FORM} >
                        <span>Crear Nuevo Juego</span>
                    </Link>
                </div>
                <SearchBar onSearch={onSearch} />
            </div>
        </div>
    )
}

export default Nav