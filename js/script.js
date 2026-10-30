document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formPersonalizar");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const deporte = document.getElementById("deporte").value;
    const colorBase = document.getElementById("colorBase").value;
    const colorDetalles = document.getElementById("colorDetalles").value;

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `
        <h3>Tu diseño personalizado</h3>
        <p>Deporte: ${deporte}</p>

        <p>Color base: ${colorBase}</p>
        <div style="
            background-color: ${colorBase};
            width: 150px;
            height: 60px;
            border: 2px solid black;
        "></div>

        <p>Color de los detalles: ${colorDetalles}</p>
        <div style="
            background-color: ${colorDetalles};
            width: 150px;
            height: 60px;
            border: 2px solid black;
        "></div>

        <p>¡Tu combinación está lista!</p>
    `;
});
});
console.log("JavaScript de TeamStyle conectado correctamente");

function verProducto(producto) {
    console.log("Producto seleccionado: " + producto);

    alert("Elegiste: " + producto);
}

let formulario = document.getElementById("formulario");

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        event.preventDefault();

        let equipo = document.getElementById("equipo").value;
        let deporte = document.getElementById("deporte").value;
        let color = document.getElementById("color").value;

        console.log("Equipo: " + equipo);
        console.log("Deporte: " + deporte);
        console.log("Color: " + color);

        if (equipo == "" || color == "") {

            alert("Por favor completa todos los campos");

        } else {

            switch (deporte) {

                case "Fútbol":
                    alert(
                        "Tu uniforme de fútbol para " +
                        equipo +
                        " será de color " +
                        color
                    );
                    break;

                case "Baloncesto":
                    alert(
                        "Tu uniforme de baloncesto para " +
                        equipo +
                        " será de color " +
                        color
                    );
                    break;

                case "Voleibol":
                    alert(
                        "Tu uniforme de voleibol para " +
                        equipo +
                        " será de color " +
                        color
                    );
                    break;

                default:
                    alert("Selecciona un deporte");
            }
        }

    });

}