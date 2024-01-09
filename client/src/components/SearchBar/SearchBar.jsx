import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [id, setId] = useState('');
    const handleChange = (event) => {
        setId(event.target.value)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(id)
        }
    }

    const handleSearch = (id) => {
        onSearch(id)
        setId('');
    }


    return (
        <div>
            <input type='search' placeholder="Escribe el ID..." onChange={handleChange} onKeyDown={handleKeyDown} value={id} />
            <button onClick={() => handleSearch(id)}>🔎</button>
            <button onClick={() => handleSearch('random')}>❓</button>
        </div>
    );
}

export default SearchBar;