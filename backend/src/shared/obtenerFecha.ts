export function obtenerFechaActual(): string {
    const fecha = new Date();

    const dia = agregarCeroAntes(fecha.getDate());
    const mes = agregarCeroAntes(fecha.getMonth() + 1); // Los meses comienzan desde 0
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}

function agregarCeroAntes(numero: number): string {
    return numero < 10 ? `0${numero}` : `${numero}`;
}