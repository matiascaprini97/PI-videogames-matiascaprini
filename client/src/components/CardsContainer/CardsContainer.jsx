import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import { useState } from "react"



const CardsContainer = () => {

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(15)

    const videoGames = useSelector(state => state.videoGames)
    let arrayDividioEn15 = [];
    arrayDividioEn15 = videoGames.slice(min, max)


    const anterior = () => {
        if (min > 0) {
            setMin(min - 15)
            setMax(max - 15)
        }
    }
    const siguiente = () => {
        if (max >= 98) {
            setMin(0)
            setMax(15)
        } else {
            setMin(min + 15)
            setMax(max + 15)
        }
    }


    return (
        <div >
            <div className={style.Container}>
                {arrayDividioEn15.map((videoGame) => {
                    return <Card
                        key={videoGame.api ? `api_${videoGame.id}` : `db_${videoGame.id}`}
                        id={videoGame.id}
                        name={videoGame.name}
                        image={videoGame.image}
                        released={videoGame.released}
                        rating={videoGame.rating}
                        genres={videoGame.genres}
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