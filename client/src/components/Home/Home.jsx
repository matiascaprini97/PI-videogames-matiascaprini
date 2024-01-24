import styles from './Home.module.scss';
import CardsContainer from '../CardsContainer/CardsContainer.jsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres, filterCards, orderCards, resetFilters, filterByOrigin, setTotalPages, getVideogames } from '../../redux/actions.js';
import Loader from '../Utils/Loader/Loader.jsx';
import Pagination from '../Pagination/Pagination.jsx';

const Home = () => {
    // spinner
    const [loading, setLoading] = useState(true);
    const genres = useSelector((state) => state.genres)
    // const currentPage = useSelector((state) => state.currentPage);
    // const gamesPerPage = useSelector((state) => state.gamesPerPage);
    // const games = useSelector((state) => state.videoGames);
    // const totalPages = useSelector((state) => (state.totalPages))
    // const sortOptions = useSelector((state) => state.sortOptions);
    // const genreFilter = useSelector((state) => state.genre);
    // const originFilter = useSelector((state) => state.origin);

    const filterOptions = {
        genreFilter: useSelector((state) => state.genreFilter),
        originFilter: useSelector((state) => state.originFilter),
        sortBy: useSelector((state) => state.sortBy),
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    // dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(fetchGenres())
    }, []);

    // useEffect(() => {
    //     dispatch(setTotalPages(gamesPerPage));
    // }, [currentPage, genreFilter, originFilter, sortOptions, dispatch, totalPages]);

    // const indexOfLastGame = Math.min(currentPage * gamesPerPage, games.length);
    // const indexOfFirstGame = Math.max(0, indexOfLastGame - gamesPerPage);
    // const displayedGames = games.slice(indexOfFirstGame, indexOfLastGame);

    const handleOrder = (event) => {
        const { value } = event.target;
        console.log('sortBy:', name, value);
        if (value === 'resetAll') {
            dispatch(resetFilters());
        } else {
            // Lógica para manejar cambios en el orden de clasificación
            // Puedes agregar dispatch para acciones relacionadas con la clasificación aquí

            dispatch(orderCards(value));
        }
    }


    const handleGenre = (event) => {
        const { name, value } = event.target;

        if (name === 'genre') {
            console.log('filter genre change name:', name);
            dispatch(filterCards(value));
        } else if (name === 'origin') {
            dispatch(filterByOrigin(value));
        }
    }


    return (
        <>
            {loading ? (

                <Loader />

            ) : (
                <div className={styles.envelop}>
                    <select name='genre' value={filterOptions.genreFilter} onChange={handleGenre}>
                        <option value="">Todos los géneros</option>
                        {genres.map((genre) => (
                            <option key={genre.name} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>

                    <select name="origin" value={filterOptions.originFilter} onChange={handleGenre}>
                        <option value="ALL">Todos los orígenes</option>
                        <option value="API">DDBB</option>
                        <option value="DDBB">API</option>
                    </select>
                    <select name="sortBy" value={filterOptions.sortBy} onChange={handleOrder}>
                        <option value="resetAll">Reset All</option>
                        <option value="ORDER_ASC">Ascendente</option>
                        <option value="ORDER_DES">Descendente</option>
                    </select>
                    <div className={styles.container}>
                        <h1 className={styles.title}>Videogames</h1>
                        <CardsContainer />
                    </div>
                    {/* <div>
                        {games.length > 0 && <Pagination totalPages={totalPages} />}
                    </div> */}
                </div>
            )
            }
        </>
    );
};

export default Home;