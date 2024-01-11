import styles from './Home.module.scss';
import CardsContainer from '../CardsContainer/CardsContainer.jsx';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions.js';
import Loader from '../Utils/Loader/Loader.jsx';

const Home = () => {
    // spinner
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    // dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogames());
    }, []);

    // const next = () => {
    //     dispatch(GET_VIDEOGAMESNEXT());
    // };
    // const prev = () => {
    //     dispatch(getVideogames());
    // };



    return (
        <>
            {loading ? (

                <Loader />

            ) : (
                <div className={styles.envelop}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Videogames</h1>
                        <CardsContainer />
                    </div>
                </div>
            )
            }
        </>
    );
};

export default Home;