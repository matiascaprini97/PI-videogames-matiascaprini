import { useState } from "react";
import styles from "./SearchBar.module.scss"
import { useDispatch } from 'react-redux';
import { getVideogame, getVideogames } from '../../redux/actions';

const SearchBar = () => {

    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Llama a la acción getVideogame con el término de búsqueda
        if (!searchTerm) { dispatch(getVideogames()) } else { dispatch(getVideogame(searchTerm.trim())) };
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