import Card from "../Card/Card";
import style from "./CardsContainer.module.scss";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { getVideogamesNext, getVideogames } from '../../redux/actions.js';


const CardsContainer = () => {
    const videoGames = useSelector(state => state.videoGames)
    let arrayDividioEn15 = [];

    useEffect(() => {
        if (videoGames.length > 1) {
            arrayDividioEn15 = videoGames.slice(0, 15)
        } else {
            arrayDividioEn15 = videoGames
        }
    }, []);


    const dispatch = useDispatch();

    const anterior = () => {
        dispatch(getVideogames())
    }
    const siguiente = () => {
        dispatch(getVideogamesNext())
    }

    return (
        <div >
            <div className={style.Container}>
                {videoGames.map((videoGame) => {
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