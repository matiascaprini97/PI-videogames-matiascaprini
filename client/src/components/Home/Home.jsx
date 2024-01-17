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

    return (
        <>
            {loading ? (

                <Loader />

            ) : (
                <div className={styles.envelop}>
                    <select>
                        <option value="">Todos los géneros</option>
                        {/* {types.map((type) => (
                            // <option key={type.name} value={type.name}>
                            //     {type.name}
                            // </option>
                        ))} */}
                    </select>

                    <select >
                        <option value="">Todos los orígenes</option>
                        <option value="API">API</option>
                        <option value="DB">DB</option>
                    </select>
                    <select>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
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