import Card from "../Card/Card";
import style from "./CardsContainer.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";

const CardsContainer = () => {
    const videoGames = useSelector(state => state.videoGames)
    let uuid = self.crypto.randomUUID();

    const [min, setMin] = useState(0)
    const [max, setMax] = useState(15)

    const arrayDividioEn8 = videoGames.slice(min, max)

    return (
        <div className={style.Container}>
            {arrayDividioEn8.map(videoGame => {
                return <Card
                    key={uuid}
                    id={videoGame.id}
                    name={videoGame.name}
                    image={videoGame.background_image}
                    released={videoGame.released}
                    rating={videoGame.rating}
                    genres={videoGame.genres[0].name}
                />
            })}
        </div>
    )
};
export default CardsContainer;