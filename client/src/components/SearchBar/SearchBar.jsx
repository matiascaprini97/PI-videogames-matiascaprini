import { useState } from "react";
import styles from "./SearchBar.module.scss"
import { useDispatch } from 'react-redux';
import { fetchGames } from '../../redux/actions';

const SearchBar = () => {

    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        // Llama a la acción fetchGames con el término de búsqueda
        dispatch(fetchGames(searchTerm.trim()));
    };


    return (
        <div className={styles.container}>
            <form>
                <input type="search" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch} className={styles.button}>go</button>
            </form>
        </div>
    )
}

export default SearchBar;