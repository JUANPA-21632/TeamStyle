document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formulario");
    const mensaje = document.getElementById("mensaje");

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        const equipo = document.getElementById("equipo").value;
        const deporte = document.getElementById("deporte").value;
        const color = document.getElementById("color").value;

        // Mensajes en la consola
        console.log("================================");
        console.log("¡Pedido enviado correctamente! 🎉");
        console.log("Equipo:", equipo);
        console.log("Deporte:", deporte);
        console.log("Color:", color);
        console.log("================================");

        // Mensaje que aparece en la página
        mensaje.innerHTML = `
            <h2>¡Pedido enviado correctamente! 🎉</h2>
            <p><strong>Equipo:</strong> ${equipo}</p>
            <p><strong>Deporte:</strong> ${deporte}</p>
            <p><strong>Color:</strong> ${color}</p>
        `;

        mensaje.style.display = "block";

        formulario.reset();
    });

});