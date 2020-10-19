const cuadrados = document.querySelectorAll(".box");
const cuadradosJugador = document.querySelectorAll(".boxJugador");
const body = document.querySelector("body");
const mostrarPosicionesPc = document.getElementById("mostrarEnemigo");
const disparar = document.getElementById("disparar");
const modal = document.getElementById("modalDisparo");
const span = document.getElementsByClassName("cerrar")[0];
const input = document.getElementById("coordenadas");
const disparaMisil = document.getElementById("dispararMisil");
const tableroEnemigo = document.querySelector(".enemigo");
const instrucciones = document.querySelector(".instrucciones");
const puntaje = document.getElementById("puntaje");
const eliminados = document.getElementById("eliminados");
const perdidos = document.getElementById("perdidos");
const modalGanador = document.getElementById("modalGanador");
const tituloGanador = document.getElementById("tituloGanador");
const jugarDeNuevo = document.getElementById("jugarDeNuevo");

let banderaBarcosEnemigos = false;
let banderaBarcosJugador = false;
let bandera = false;
let misil = "";
const barcos = [];
const barcosJugador = [];
const barcosElegidosPc = [];
const disparosRealizados = [];
let contadorBarcosHundidos = 0;
let contadorBarcosPerdidos = 0;

/* crea un array de barcos del enemigo */
const barcosEnemigos = () => {
    for (let i = 1; i <= 10; i) {
        const posicionY = Math.floor(Math.random() * 9) + 1;
        const posicionX = Math.floor(Math.random() * 9) + 1;
        if (!barcos.includes(`${posicionX}x${posicionY}y`)) {
            barcos.push(`${posicionX}x${posicionY}y`)
            i++
        }
    }
    console.log(barcos)
};
const buscaGanador = (contador) =>{
    if(contador == 10){
        if(contador == contadorBarcosHundidos){
            modalGanador.style.display = "block";
            tituloGanador.innerHTML = "Ganaste!"
        }else if(contador == contadorBarcosPerdidos){
            modalGanador.style.display = "block";
            tituloGanador.innerHTML = "Perdiste :("
        }
    }
};
/* elige una posicion aleatoria para disparar un misil */
const pcDisparando = () => {
    const posicionY = Math.floor(Math.random() * 9) + 1;
    const posicionX = Math.floor(Math.random() * 9) + 1;
    if (!barcosElegidosPc.includes(`${posicionY}y${posicionX}x`)) {
        barcosElegidosPc.push(`${posicionY}y${posicionX}x`)
        const barcoElegidoPc = document.getElementById(`${posicionY}y${posicionX}x`)
        if (barcosJugador.includes(`${posicionY}y${posicionX}x`)) {
            barcoElegidoPc.style.background = "red"
            contadorBarcosPerdidos += 1;
            perdidos.innerHTML = contadorBarcosPerdidos;
            buscaGanador(contadorBarcosPerdidos)
        } else {
            barcoElegidoPc.style.background = "gray"
        }
        bandera = true;
    } else {
        bandera = false;
    }
};
/* busca si el casillero elegido corresponde a un barco enemigo o no  y a la vez dispara al tablero del jugador*/
const pinta = (e) => {
    bandera = false
    const objetivo = document.getElementById(e.target.id);

    if (!disparosRealizados.includes(objetivo)) {
        disparosRealizados.push(objetivo)
        if (barcos.includes(objetivo.id)) {
            objetivo.style.background = "red";
            contadorBarcosHundidos += 1;
            eliminados.innerHTML = contadorBarcosHundidos;
            buscaGanador(contadorBarcosHundidos)
        } else {
            objetivo.style.background = "grey";
        }
        while (!bandera) {
            pcDisparando()
        }
    } else {
        alert("Dispara a otra posicion")
    }
};
/* muestra las posiciones de los barcos enemigos */
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
/* muestra el modal */
const dispararModal = () => {
    input.value = ""
    modal.style.display = "block";
};
/* cierra modal */
const cerrarModal = () => {
    modal.style.display = "none";
};
/* captura valor del input coordenadas */
const capturaValor = (e) => {
    misil = e.target.value
};
/* dispara a una posicion especifica mediante coordenadas */
const dispararAlBarco = () => {
    bandera = false
    const barcoHundido = document.getElementById(misil);
    const patron =/[1-9][x][1-9][y]/i;
    const result = barcoHundido.id.match(patron);
    if(result){
        if (!disparosRealizados.includes(barcoHundido)) {
            disparosRealizados.push(barcoHundido)
            if (barcos.includes(barcoHundido)) {
                barcoHundido.style.background = "red";
            } else {
                barcoHundido.style.background = "grey";
            }
            while (!bandera) {
                pcDisparando()
            }
            cerrarModal()
        } else {
            alert("Dispara a otra posicion")
        }
    }
};
/* al iniciar, el jugador elige las posiciones de sus barcos */
const pintaJugador = (e) => {
    if (barcosJugador.length < 10) {
        if (!barcosJugador.includes(e.target.id)) {
            barcosJugador.push(e.target.id);
            const posicion = document.getElementById(e.target.id);
            posicion.style.border = "2px solid black"
        }
    }
    if (barcosJugador.length === 10) {
        tableroEnemigo.style.display = ""
        instrucciones.style.display = "none"
        puntaje.style.display = ""
    }
};
/* recarga la pagina */
const cargarPagina = () =>{
    location.reload()
}

const eligeBarcos = () => {
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
jugarDeNuevo.addEventListener("click", cargarPagina)