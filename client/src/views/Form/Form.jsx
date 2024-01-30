import { useState, useEffect } from "react";
import axios from 'axios';
import { fetchGenres } from '../../redux/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Form.module.css'
import Validate from "./Validate.js";

const Form = () => {

    const genres = useSelector((state) => state.genres)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenres())
    }, []);

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: "",
        image: "",
        released: "",
        rating: "",
        genre: []
    });

    const [errors, setErrors] = useState({});

    const changeHandler = (event) => {
        if (event.target.name === "genre") {
            const selectedGenres = Array.from(
                event.target.selectedOptions,
                (option) => option.value
            );

            setForm({ ...form, genre: selectedGenres })
        } else {
            const property = event.target.name;
            const value = event.target.value;
            setForm({ ...form, [property]: value });
        }
        const validateError = Validate({ ...form, [event.target.name]: event.target.value });
        setErrors(validateError)
    }

    const resetForm = () => {
        setForm({
            name: "",
            description: "",
            platforms: "",
            image: "",
            released: "",
            rating: "",
            genre: []
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const formularioValido = Object.values(errors).every((value) => value === "")
        if (formularioValido) {

            axios.post("http://localhost:3001/videogames", form)
                .then((res) => {
                    alert("El juego fue creado con éxito!")
                })
                .catch(err => console.log(err.message));
            resetForm()
        } else {
            console.error("Formulario no válido")
        }
    };




    return (
        <div className={styles.Container}>
            <div className={styles.card}>
                <h1 className={styles.text}>Create a new videogame</h1>
                <form className={styles.form} onSubmit={submitHandler}>
                    <div className={styles.input}>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Game title: </label>
                        </div>
                        <div className={styles.lal}>
                            <input type="text" value={form.name} onChange={changeHandler} name="name" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.name && <span className={styles.textt} >{errors.name}</span>}
                    </div>
                    <div className={styles.input}>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Short description: </label>
                        </div>
                        <div className={styles.lal}>
                            <input type="textarea" value={form.description} onChange={changeHandler} name="description" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.description && <span className={styles.textt} >{errors.description}</span>}
                    </div>
                    <div className={styles.input}>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Platforms: </label>
                        </div>
                        <div className={styles.lal}>
                            <input type="text" value={form.platforms} onChange={changeHandler} name="platforms" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.platforms && <span className={styles.textt} >{errors.platforms}</span>}
                    </div>
                    <div className={styles.input}>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Image URL: </label>
                        </div>
                        <div className={styles.lal}>
                            <input type="text" value={form.image} onChange={changeHandler} name="image" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.image && <span className={styles.textt} >{errors.image}</span>}
                    </div>
                    <div className={styles.input}>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Released data: </label>
                        </div>
                        <div className={styles.lal}>
                            <input type="date" value={form.released} onChange={changeHandler} name="released" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.released && <span className={styles.textt} >{errors.released}</span>}
                    </div>
                    <div className={styles.input}>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Rating: </label>
                        </div>
                        <div className={styles.lal}>
                            <select value={form.rating} onChange={changeHandler} name="rating">
                                <option value="">-- Select a rating --</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.rating && <span className={styles.textt} >{errors.rating}</span>}
                    </div>

                    <div>
                        <div className={styles.lal}>
                            <label className={styles.text} htmlFor="">Genre: </label>
                        </div>
                        <div>
                            <select
                                className={styles.miSelect}
                                multiple
                                onChange={changeHandler}
                                name="genre">
                                <option>-- Select a genre --</option>
                                {genres.map((genre) => (
                                    <option key={genre.name} value={genre.name}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.input}>
                        {errors.genre && <span className={styles.textt} >{errors.genre}</span>}
                    </div>
                    <div>
                        <button className={styles.button} type="submit">submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
};

export default Form;