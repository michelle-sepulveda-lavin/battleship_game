const cuadrados = document.querySelectorAll(".box");
const cuadradosJugador = document.querySelectorAll(".boxJugador");
const body = document.querySelector("body");
const mostrarPosicionesPc = document.getElementById("mostrarEnemigo");
const disparar = document.getElementById("disparar");
const modal = document.getElementById("modalDisparo");
const span = document.getElementsByClassName("cerrar")[0];
const input = document.getElementById("coordenadas");
const disparaMisil = document.getElementById("dispararMisil");
const tableroEnemigo = document.querySelector(".enemigo")

const barcos = [];
let banderaBarcosEnemigos = false;
let misil = "";
const barcosJugador = [];
let banderaBarcosJugador = false;
const barcosElegidosPc = [];


const barcosEnemigos = () => {
    for (let i = 1; i <= 10; i++) {
        const posicionY = Math.floor(Math.random() * 9) + 1;
        const posicionX = Math.floor(Math.random() * 9) + 1;
        if (!barcos.includes(`${posicionX}x${posicionY}y`)) {
            barcos.push(`${posicionX}x${posicionY}y`)
        } else {
            const posicionY = Math.floor(Math.random() * 9) + 1;
            const posicionX = Math.floor(Math.random() * 9) + 1;
            barcos.push(`${posicionX}x${posicionY}y`)
        }
    }
    console.log(barcos)
}

const pinta = (e) => {
    const objetivo = document.getElementById(e.target.id);
    if (barcos.includes(objetivo.id)) {
        objetivo.style.background = "red";
    } else {
        objetivo.style.background = "grey";
    }

    const posicionY = Math.floor(Math.random() * 9) + 1;
    const posicionX = Math.floor(Math.random() * 9) + 1;
    if (!barcosElegidosPc.includes(`${posicionY}y${posicionX}x`)) {
        barcosElegidosPc.push(`${posicionY}y${posicionX}x`)
        const barcoElegidoPc = document.getElementById(`${posicionY}y${posicionX}x`)
        if(barcosJugador.includes(`${posicionY}y${posicionX}x`)){
            barcoElegidoPc.style.background = "red" 
        }else{
            barcoElegidoPc.style.background = "gray"
        }
    }else{
        posicionY = Math.floor(Math.random() * 9) + 1;
        posicionX = Math.floor(Math.random() * 9) + 1;
        barcosElegidosPc.push(`${posicionY}y${posicionX}x`)
        const barcoElegidoPc = document.getElementById(`${posicionY}y${posicionX}x`)
        if(barcosJugador.includes(`${posicionY}y${posicionX}x`)){
            barcoElegidoPc.style.background = "red" 
        }else{
            barcoElegidoPc.style.background = "gray"
        }
    }

}

const posicionesPC = () => {
    banderaBarcosEnemigos = !banderaBarcosEnemigos;
    if (banderaBarcosEnemigos) {
        cuadrados.forEach((cuadrado) => {
            if (barcos.includes(cuadrado.id)) {
                cuadrado.style.border = "3px solid orange";
            }
        })
        mostrarPosicionesPc.innerHTML = "Ocultar posiciones"
    } else {
        cuadrados.forEach((cuadrado) => {
            if (barcos.includes(cuadrado.id)) {
                cuadrado.style.border = "1px solid grey";
            }
        })
        mostrarPosicionesPc.innerHTML = "Mostrar posiciones"
    }
};

const dispararModal = () => {
    input.value = ""
    modal.style.display = "block";
};

const cerrarModal = () => {
    modal.style.display = "none";
};

const capturaValor = (e) => {
    misil = e.target.value
};

const dispararAlBarco = () => {
    const barcoHundido = document.getElementById(misil);
    barcoHundido.style.background = "red";
    cerrarModal()
};

const pintaJugador = (e) => {
    if (barcosJugador.length < 10) {
        barcosJugador.push(e.target.id);
        const posicion = document.getElementById(e.target.id);
        posicion.style.border = "3px solid green"
    }
    if (barcosJugador.length === 10) {
        tableroEnemigo.style.display = ""
    }

}

const eligeBarcos = () => {
    /* alert("Elige la posicion de tus barcos") */
    cuadradosJugador.forEach((cuadrado) => {
        cuadrado.addEventListener('click', pintaJugador)
    })

};

cuadrados.forEach((cuadrado) => {
    cuadrado.addEventListener('click', pinta)
});
body.addEventListener("load", barcosEnemigos());
body.addEventListener("load", eligeBarcos());
mostrarPosicionesPc.addEventListener("click", posicionesPC);
disparar.addEventListener("click", dispararModal);
span.addEventListener("click", cerrarModal);
input.addEventListener("change", capturaValor);
disparaMisil.addEventListener("click", dispararAlBarco)