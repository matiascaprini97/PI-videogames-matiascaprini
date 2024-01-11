import { Link } from "react-router-dom"
import style from "./Nav.module.scss";
import SearchBar from "../SearchBar/SearchBar.jsx";
import PATHROUTES from "../../helper/PathRoutes"

const Nav = () => {
    return (
        <div className={style.envelop}>
            <div className={style.Container}>
                <SearchBar className={style.SearchBar} />
                <Link to={PATHROUTES.HOME}>
                    <button className={style.button}>Home</button>
                </Link>
                <div></div>
                <Link to={PATHROUTES.FORM}>
                    <button className={style.button}>Create Videogame</button>
                </Link>
            </div>
        </div>
    )
}

export default Nav;