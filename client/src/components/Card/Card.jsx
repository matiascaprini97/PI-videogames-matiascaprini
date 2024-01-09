import { Link } from "react-router-dom";

const Card = (props) => {
    const { name, plataforms, description, released, id, rating, image, onClose, } = props;
    return (
        <div>
            <button onClick={() => onClose(id)}>☠️</button>
            <Link to={`/detail/${id}`}>
                <h2>Name: {name}</h2>
            </Link>
            <img src={image} alt=" " />
            <h2>Descripción: {description}</h2>
            <h2>Rating: {rating}</h2>
            <h2>Plataformas: {plataforms}</h2>
            <h2>Realizado: {released}</h2>
        </div>
    );
}


export default Card;