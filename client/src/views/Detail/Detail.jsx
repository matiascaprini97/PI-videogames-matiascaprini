import { useSelector, useDispatch } from "react-redux";
import PATHROUTES from '../../helper/PathRoutes.js';
import { useEffect, useState } from 'react';
import { getVideogame } from '../../redux/actions.js';
import { useParams } from "react-router-dom";
import Loader from '../../components/Utils/Loader/Loader.jsx';
import styles from './Detail.module.scss'
import { Link } from "react-router-dom";


const Detail = () => {

    //spinner
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVideogame(id));
    }, [dispatch, id]);

    const videoGame = useSelector(state => state.videoGame)


    return (
        <>
            {loading ? (

                <Loader />

            ) : (

                <>

                    <div className={styles.Container}>
                        <div className={styles.card}>
                            <h1 className={styles.text}>{`${videoGame.name} Details`}</h1>
                            <h2 className={styles.text}>ID: {videoGame.id}</h2>
                            <img className={styles.image} src={videoGame.image} alt="" />

                            <div className={styles.text}>
                                <h2>Description</h2>
                                <article dangerouslySetInnerHTML={{ __html: videoGame.description }} />
                            </div>
                            <div className={styles.card1}>
                                <div>
                                    <h2 className={styles.text}>Platforms</h2>
                                    {videoGame.platforms && (
                                        <ul className={styles.text}>
                                            {videoGame.platforms.map((el) => (
                                                <li key={el}>{el}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <h2 className={styles.text}>Genres</h2>
                                    {videoGame.genres && (
                                        <ul className={styles.text}>
                                            {videoGame.genres.map((el) => (
                                                <li key={el}>{el}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <p className={styles.text}>Release date: {videoGame.released}</p>
                                    <p className={styles.text}>Rating: {videoGame.rating}</p>
                                </div>
                            </div>
                            <div className={styles.Containerbtn}>
                                <Link to={PATHROUTES.HOME}>
                                    <button className={styles.button}>Home</button>
                                </Link>
                            </div>
                        </div>


                    </div>

                </>

            )
            }
        </>
    )
}

export default Detail;