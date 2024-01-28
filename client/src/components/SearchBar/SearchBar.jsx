import { useState } from "react";
import styles from "./SearchBar.module.css"
import { useDispatch } from 'react-redux';
import { fetchGenres, getVideogame, getVideogames } from '../../redux/actions';

const SearchBar = () => {

    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Llama a la acción getVideogame con el término de búsqueda
        if (!searchTerm) { dispatch(getVideogames()) } else {
            const searchTermArray = searchTerm.split(" ");
            const joinedSearchTerm = searchTermArray.join("-");
            dispatch(getVideogame(joinedSearchTerm));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }


    return (
        <div className={styles.container}>

            <input type="search" placeholder="Search..." onKeyDown={handleKeyDown} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch} className={styles.button}>go</button>

        </div>
    )
}

export default SearchBar;