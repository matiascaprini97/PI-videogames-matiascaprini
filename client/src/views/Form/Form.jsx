import { useState, useEffect } from "react";
import axios from 'axios';
import { fetchGenres } from '../../redux/actions.js';
import { useDispatch, useSelector } from 'react-redux';


import styles from './Form.module.scss'

const Form = () => {

    const genres = useSelector((state) => state.genres)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenres())
    }, []);

    const [form, setForm] = useState({
        // id: generator.uuid(),
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genre: ""
    });

    const [errors, setErrors] = useState({
        // id: generator.uuid(),
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genre: ""
    });
    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [property]: value })
        validate({ ...form, [property]: value })
    }
    const validate = (form) => {
        let errors = {};
        if (!form.name) {
            errors.name = "Por favor escribe el nombre del juego"
        } else {
            errors = { ...errors, name: "" }
        };

        if (!form.description) {
            errors.description = "Escribe una breve descrpición"
        } else {
            errors = { ...errors, description: "" }
        };
        if (!form.platforms) {
            errors = { ...errors, platforms: "Escribe las plataformas compatibles con el videojuego" }
        } else {
            errors = { ...errors, platforms: "" }
        };
        if (!form.image) {
            errors = { ...errors, image: "Ingresa un URL de imagen" }
        } else {
            errors = { ...errors, image: "" }
        };
        if (!form.released) {
            errors = { ...errors, released: "Ingresa la fecha de lanzamiento" }
        } else {
            errors = { ...errors, released: "" }
        };
        if (!form.rating) {
            errors = { ...errors, rating: "Selecciona entre 1 y 10 el rating del juego" }
        } else {
            errors = { ...errors, rating: "" }
        };
        if (!form.genre) {
            errors = { ...errors, genre: "Ingresa el género del juego" }
        } else {
            errors = { ...errors, genre: "" }
        };

        setErrors(errors);
    };
    const submitHandler = (event) => {
        event.preventDefault()
        axios.post("http://localhost:3001/videogames", form)
            .then((res) => {
                alert("El juego fue creado con éxito!")
                window.location.reload()
            })
            .catch(err => console.log(err.message));
    }


    return (
        <div className={styles.Container}>
            <div className={styles.card}>
                <h1 className={styles.text}>Create a new videogame</h1>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div>
                        <label className={styles.text} htmlFor="">Game title: </label>
                        <input type="text" value={form.name} onChange={changeHandler} name="name" />
                    </div>
                    {errors.name && <span className={styles.textt} >{errors.name}</span>}
                    <div>
                        <label className={styles.text} htmlFor="">Short description: </label>
                        <input type="textarea" value={form.description} onChange={changeHandler} name="description" />
                    </div>
                    {errors.description && <span className={styles.textt} >{errors.description}</span>}
                    <div>
                        <label className={styles.text} htmlFor="">Platforms: </label>
                        <input type="text" value={form.platforms} onChange={changeHandler} name="platforms" />
                    </div>
                    {errors.platforms && <span className={styles.textt} >{errors.platforms}</span>}
                    <div>
                        <label className={styles.text} htmlFor="">Image URL: </label>
                        <input type="text" value={form.image} onChange={changeHandler} name="image" />
                    </div>
                    {errors.image && <span className={styles.textt} >{errors.image}</span>}
                    <div>
                        <label className={styles.text} htmlFor="">Released data: </label>
                        <input type="date" value={form.released} onChange={changeHandler} name="released" />
                    </div>
                    {errors.released && <span className={styles.textt} >{errors.released}</span>}
                    <div>
                        <label className={styles.text} htmlFor="">Rating: </label>
                        <select value={form.rating} onChange={changeHandler} name="rating">
                            <option value="">-- Select a rating --</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    {errors.rating && <span className={styles.textt} >{errors.rating}</span>}

                    <div>
                        <label className={styles.text} htmlFor="">Genre: </label>
                        <select value={form.genre} onChange={changeHandler} name="genre">
                            <option>-- Select a genre --</option>
                            {genres.map((genre) => (
                                <option key={genre.name} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.genre && <span className={styles.textt} >{errors.genre}</span>}

                    {/* <div>
                        <label className={styles.text} htmlFor="">Genre: </label>
                        <input type="text" value={form.genre} onChange={changeHandler} name="genre" />
                    </div> */}
                    <div>
                        <button className={styles.button} type="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default Form;