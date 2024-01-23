import styles from './Home.module.scss';
import CardsContainer from '../CardsContainer/CardsContainer.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, fetchGenres, orderCards, filterCards } from '../../redux/actions.js';
import Loader from '../Utils/Loader/Loader.jsx';

const Home = () => {
    // spinner
    const [loading, setLoading] = useState(true);
    const genres = useSelector((state) => state.genres)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    // dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogames());
        dispatch(fetchGenres())
    }, []);

    const handleOrder = (event) => {
        const { value } = event.target;
        dispatch(orderCards(value));
    }


    const handleGenre = (event) => {
        const { value } = event.target;
        dispatch(filterCards(value))
    };

    return (
        <>
            {loading ? (

                <Loader />

            ) : (
                <div className={styles.envelop}>
                    <select onChange={handleGenre}>
                        <option value="">Todos los géneros</option>
                        {genres.map((genres) => (
                            <option key={genres.name} value={genres.name}>
                                {genres.name}
                            </option>
                        ))}
                    </select>

                    <select >
                        <option value="">Todos los orígenes</option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                    <select onChange={handleOrder}>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                    </select>
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