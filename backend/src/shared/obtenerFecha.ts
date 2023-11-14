export function obtenerFechaActual(): string {
    const fecha = new Date();

    const dia = agregarCeroAntes(fecha.getDate());
    const mes = agregarCeroAntes(fecha.getMonth() + 1); // Sumar 1 al mes
    const anio = fecha.getFullYear().toString(); // Convertir el año a cadena

    return `${dia}/${mes}/${anio}`;
}

function agregarCeroAntes(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
}