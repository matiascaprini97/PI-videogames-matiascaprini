import styles from './Card.module.css';
import { Link } from "react-router-dom";

const Card = (props) => {
    const { id, name, image, genres, rating, api } = props;
    const nuevoID = api ? `api_${id}` : `db_${id}`

    return (
        <div className={styles.Container}>
            <Link to={`/detail/${id}`}>
                <button className={styles.button}>{name}</button>
            </Link>
            <img className={styles.image} src={image} alt="" />
            <p className={styles.text}>Genres:  {genres ? genres.join(" - ") : "unknown"}</p>
            <p className={styles.text}>Rating:  {rating}</p>
        </div>
    )
};
export default Card; 