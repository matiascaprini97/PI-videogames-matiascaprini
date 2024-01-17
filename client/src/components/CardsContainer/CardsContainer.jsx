import Card from "../Card/Card";
import style from "./CardsContainer.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getVideogamesNext, getVideogames } from '../../redux/actions.js';


const CardsContainer = () => {
    const videoGames = useSelector(state => state.videoGames)

    const dispatch = useDispatch();
    const arrayDividioEn15 = videoGames.slice(0, 15)

    const anterior = () => {
        dispatch(getVideogames())
    }
    const siguiente = () => {
        dispatch(getVideogamesNext())
    }

    return (
        <div >
            <div className={style.Container}>
                {arrayDividioEn15.map((videoGame) => {
                    return <Card
                        key={self.crypto.randomUUID()}
                        id={videoGame.id}
                        name={videoGame.name}
                        image={videoGame.background_image}
                        released={videoGame.released}
                        rating={videoGame.rating}
                        genres={videoGame.genres[0].name}
                    />
                })}
            </div>
            <div className={style.Con}>
                <button className={style.button} onClick={anterior}>anterior</button>
                <button className={style.button} onClick={siguiente}>siguiente</button>
            </div>
        </div>
    )
};
export default CardsContainer;