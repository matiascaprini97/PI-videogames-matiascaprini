import Card from "../Card/Card";
import style from "./CardsContainer.module.scss";
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
        if (arrayDividioEn15.length === 15) {
            setMin(min + 15)
            setMax(max + 15)
        }
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