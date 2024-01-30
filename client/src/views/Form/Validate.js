export default function Validate(inputs) {

    console.log("Datos a validar:", inputs);

    let consolas = ["XBOX 360", "PC", "PS1", "PS2", "PS3", "PS4", "PS5", "XBOX 720", "XBOX ONE", "Nintendo", "Nintendo 3DS"]
    let errors = {};
    let RegExpression = /^[a-zA-Z0-9\s]+$/;

    if (!inputs.name || !inputs.name.trim()) {
        errors.name = "Escriba un nombre válido";
    } else if (!RegExpression.test(inputs.name)) {
        errors.name = "No se permiten caractéres especiales";
    } else if (inputs.name.length > 18) {
        errors.name = "El nombre no puede superar los 18 caractéres";
    } else {
        errors.name = "";
    }
    if (!inputs.description) {
        errors.description = "Escribe una breve descrpición"
    } else if (inputs.description.length < 5) {
        errors.description = "Debe escribir al menos 5 caractéres";
    } else if (inputs.description.length > 50) {
        errors.description = "No se admiten más de 50 caractéres"
    } else {
        errors = { ...errors, description: "" }
    };
    if (!inputs.platforms) {
        errors = { ...errors, platforms: "Escribe las plataformas compatibles con el videojuego" }
    } else if (!consolas.includes(inputs.platforms)) {
        errors.platforms = "Escribe una plataforma válida"
    } else {
        errors = { ...errors, platforms: "" }
    };
    if (!inputs.image || !isValidImageUrl(inputs.image)) {
        errors = { ...errors, image: "Ingresa un URL de imagen válida" }

    };
    if (!inputs.released) {
        errors = { ...errors, released: "Ingresa la fecha de lanzamiento" }
    } else {
        errors = { ...errors, released: "" }
    };
    if (!inputs.rating) {
        errors = { ...errors, rating: "Selecciona entre 1 y 10 el rating del juego" }
    } else {
        errors = { ...errors, rating: "" }
    };
    if (!inputs.genre) {
        errors = { ...errors, genre: "Ingresa el género del juego" }
    } else {
        errors = { ...errors, genre: "" }
    };

    return errors;
}
let isValidImageUrl = (url) => {

    return url.startsWith("http://") || url.startsWith("https://");
};

