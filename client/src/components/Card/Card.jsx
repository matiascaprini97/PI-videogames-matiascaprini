import styles from './Card.module.css';
import { Link } from "react-router-dom";

const Card = (props) => {
    const id = props.id
    return (
        <div className={styles.Container}>
            <Link to={`/detail/${id}`}>
                <button className={styles.button}>{props.name}</button>
            </Link>
            <img className={styles.image} src={props.image} alt="" />
            <p className={styles.text}>Genres: {props.genres}</p>
        </div>
    )
};
export default Card; 