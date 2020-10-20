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
const tableroJugador = document.querySelector(".jugador")
const instrucciones = document.querySelector(".instrucciones")
const instruccionesLanchas = document.getElementById("soloLanchas");
const instruccionesBarcos = document.getElementById("todosLosBarcos")
const puntaje = document.getElementById("puntaje");
const eliminados = document.getElementById("eliminados");
const perdidos = document.getElementById("perdidos");
const modalGanador = document.getElementById("modalGanador");
const tituloGanador = document.getElementById("tituloGanador");
const jugarDeNuevo = document.getElementById("jugarDeNuevo");
const mensaje = document.getElementById("mensaje");
const opcionesJuego = document.getElementById("opcionesJuego")
const opcionLanchas = document.getElementById("opcionSoloLanchas");
const opcionFullBarcos = document.getElementById("opcionFullBarcos");
const detalleBarcos = document.getElementById("barcos");
const horizontal = document.getElementById("horizontal");
const vertical = document.getElementById("vertical");

let banderaBarcosEnemigos = "";
let banderaBarcosJugador = "";
let modoJuego = "";
let bandera = false;
let perdido = false;
let hundido = false;
let misil = "";
const barcos = [];
const barcosJugador = [];
const barcosElegidosPc = [];
const disparosRealizados = [];
const verificadorPosiciones = [];
let contadorBarcosHundidos = 0;
let contadorBarcosPerdidos = 0;
let contador = 0
const matriz = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];


const lecturaMatriz = () => {
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] == 1) {
                const nave = document.getElementById(`${i + 1}y${j + 1}x`)
                nave.style.border = "2px solid black"
            }
        }
    }
};
const posicionesAlrededor = (e, tipoBarco, tipoLinea) => {
    const coordenada = e.target.id
    let aux = coordenada.replace('x', '').replace('y', '');
    const y = parseInt(aux[0]) - 1
    const x = parseInt(aux[1]) - 1
    if(tipoBarco === "buque"){
        if(tipoLinea === "inferior"){
            matriz[y + 1][x] = 2
            matriz[y + 1][x + 1] = 2
            matriz[y + 1][x + 2] = 2
            matriz[y + 1][x + 3] = 2
        }else if(tipoLinea === "superior"){
            matriz[y - 1][x] = 2
            matriz[y - 1][x + 1] = 2
            matriz[y - 1][x + 2] = 2
            matriz[y - 1][x + 3] = 2
        }else if(tipoLinea === "izquierda"){
            matriz[y - 1][x - 1] = 2
            matriz[y][x - 1] = 2
            matriz[y + 1][x - 1] = 2
        }else if (tipoLinea === "derecha"){
            matriz[y - 1][x + 4] = 2
            matriz[y][x + 4] = 2
            matriz[y + 1][x + 4] = 2
        }
    }else if(tipoBarco === "submarino"){
        if(tipoLinea === "inferior"){
            matriz[y + 1][x] = 2
            matriz[y + 1][x + 1] = 2
            matriz[y + 1][x + 2] = 2
        }else if(tipoLinea === "superior"){
            matriz[y - 1][x] = 2
            matriz[y - 1][x + 1] = 2
            matriz[y - 1][x + 2] = 2
        }else if(tipoLinea === "izquierda"){
            matriz[y - 1][x - 1] = 2
            matriz[y][x - 1] = 2
            matriz[y + 1][x - 1] = 2
        }else if (tipoLinea === "derecha"){
            matriz[y - 1][x + 3] = 2
            matriz[y][x + 3] = 2
            matriz[y + 1][x + 3] = 2
        }
    }else if(tipoBarco === "crucero"){
        if(tipoLinea === "inferior"){
            matriz[y + 1][x] = 2
            matriz[y + 1][x + 1] = 2
        }else if(tipoLinea === "superior"){
            matriz[y - 1][x] = 2
            matriz[y - 1][x + 1] = 2
        }else if(tipoLinea === "izquierda"){
            matriz[y - 1][x - 1] = 2
            matriz[y][x - 1] = 2
            matriz[y + 1][x - 1] = 2
        }else if (tipoLinea === "derecha"){
            matriz[y - 1][x + 2] = 2
            matriz[y][x + 2] = 2
            matriz[y + 1][x + 2] = 2
        }
    }else if(tipoBarco === "lancha"){
        if(tipoLinea === "inferior"){
            matriz[y + 1][x] = 2
        }else if(tipoLinea === "superior"){
            matriz[y - 1][x] = 2
        }else if(tipoLinea === "izquierda"){
            matriz[y - 1][x - 1] = 2
            matriz[y][x - 1] = 2
            matriz[y + 1][x - 1] = 2
        }else if (tipoLinea === "derecha"){
            matriz[y - 1][x + 1] = 2
            matriz[y][x + 1] = 2
            matriz[y + 1][x + 1] = 2
        }
    }
}


/* crea un array de barcos del enemigo */
const barcosEnemigos = () => {
    const verificador = []
    for (let i = 1; i <= 10; i) {
        const posicionY = Math.floor(Math.random() * 9) + 1;
        const posicionX = Math.floor(Math.random() * 9) + 1;
        const coordenada = `${posicionX}x${posicionY}y`
        if (!verificador.includes(coordenada)) {
            if (!barcos.includes(coordenada)) {
                barcos.push(coordenada)
                verificador.push(coordenada, `${posicionX}x${posicionY - 1}y`, `${posicionX + 1}x${posicionY - 1}y`, `${posicionX + 1}x${posicionY}y`, `${posicionX + 1}x${posicionY + 1}y`)
                verificador.push(`${posicionX}x${posicionY + 1}y`, `${posicionX - 1}x${posicionY + 1}y`, `${posicionX - 1}x${posicionY}y`, `${posicionX - 1}x${posicionY - 1}y`)
                i++
            }
        }
    }
    console.log(barcos)
};
/* busca el ganador */
const buscaGanador = (contador) => {
    if (contador == 10) {
        if (contador == contadorBarcosHundidos) {
            modalGanador.style.display = "block";
            tituloGanador.innerHTML = "Ganaste!"
        } else if (contador == contadorBarcosPerdidos) {
            modalGanador.style.display = "block";
            tituloGanador.innerHTML = "Perdiste :("
        }
    }
};
/* mensaje que muestra */
const defineMensaje = (estado) => {
    if (disparosRealizados.length === 0) {
        mensaje.style.color = "red";
        mensaje.innerHTML = "Realiza tu primer disparo!!"
    } else if (estado === "red") {
        mensaje.style.color = "red";
        mensaje.innerHTML = "Has perdido un barco!"
    } else if (estado == "green") {
        mensaje.style.color = "green";
        mensaje.innerHTML = "Hundiste un barco!!"
    } else {
        mensaje.style.color = "rgb(234, 234, 241)";
        mensaje.innerHTML = "d"
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
            defineMensaje("red")
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
            defineMensaje("green")
        } else {
            objetivo.style.background = "grey";
            defineMensaje("")
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
    const patron = /[1-9][x][1-9][y]/i;
    const result = barcoHundido.id.match(patron);
    if (result) {
        if (!disparosRealizados.includes(barcoHundido)) {
            disparosRealizados.push(barcoHundido)
            if (barcos.includes(barcoHundido.id)) {
                barcoHundido.style.background = "red";
                defineMensaje("green")
            } else {
                barcoHundido.style.background = "grey";
                defineMensaje("")
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
    if (modoJuego === "lanchas") {
        if (barcosJugador.length < 10) {
            const coordenada = e.target.id
            const aux = coordenada.replace('x', '').replace('y', '');
            if (verificadorPosiciones.length === 0) {
                barcosJugador.push(e.target.id);
                const posicion = document.getElementById(e.target.id);
                posicion.style.border = "2px solid black"
                verificadorPosiciones.push(coordenada, `${aux[0] - 1}y${aux[1]}x`, `${aux[0]}y${parseInt(aux[1]) + 1}x`, `${parseInt(aux[0]) + 1}y${aux[1]}x`, `${aux[0]}y${aux[1] - 1}x`)
                verificadorPosiciones.push(`${aux[0] - 1}y${parseInt(aux[1]) + 1}x`, `${parseInt(aux[0]) + 1}y${parseInt(aux[1]) + 1}x`, `${parseInt(aux[0]) + 1}y${parseInt(aux[1]) - 1}x`, `${aux[0] - 1}y${parseInt(aux[1]) - 1}x`)
            } else {
                if (!verificadorPosiciones.includes(coordenada)) {
                    verificadorPosiciones.push(coordenada, `${aux[0] - 1}y${aux[1]}x`, `${aux[0]}y${parseInt(aux[1]) + 1}x`, `${parseInt(aux[0]) + 1}y${aux[1]}x`, `${aux[0]}y${aux[1] - 1}x`)
                    verificadorPosiciones.push(`${aux[0] - 1}y${parseInt(aux[1]) + 1}x`, `${parseInt(aux[0]) + 1}y${parseInt(aux[1]) + 1}x`, `${parseInt(aux[0]) + 1}y${parseInt(aux[1]) - 1}x`, `${aux[0] - 1}y${parseInt(aux[1]) - 1}x`)
                    if (!barcosJugador.includes(e.target.id)) {
                        barcosJugador.push(e.target.id);
                        const posicion = document.getElementById(e.target.id);
                        posicion.style.border = "2px solid black"
                    }
                }
            }
        }
    } else if (modoJuego === "tradicional") {
        console.log(matriz)
        if (barcosJugador.length < 10) {
            const coordenada = e.target.id
            let aux = coordenada.replace('x', '').replace('y', '');
            const y = parseInt(aux[0]) - 1
            const x = parseInt(aux[1]) - 1
            if (contador === 0) {
                if (x + 3 < 8) {
                    matriz[y][x] = 1
                    matriz[y][x + 1] = 1
                    matriz[y][x + 2] = 1
                    matriz[y][x + 3] = 1
                    lecturaMatriz();
                    if (matriz[y][x - 1] == undefined) {
                        if (matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "buque", "inferior")
                            matriz[y][x + 4] = 2
                            matriz[y + 1][x + 4] = 2
                        } else if (matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "buque", "superior")
                            matriz[y - 1][x + 4] = 2
                            matriz[y][x + 4] = 2
                        } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                            posicionesAlrededor(e, "buque", "superior")
                            posicionesAlrededor(e, "buque", "inferior")
                            posicionesAlrededor(e, "buque", "derecha")

                        }
                    } else if (matriz[y][x - 1] != undefined && matriz[y - 1] == undefined) {
                        posicionesAlrededor(e, "buque", "inferior")
                        matriz[y][x + 4] = 2
                        matriz[y + 1][x + 4] = 2
                        matriz[y][x - 1] = 2
                        matriz[y + 1][x - 1] = 2
                    } else if (matriz[y][x - 1] != undefined && matriz[y + 1] == undefined) {
                        posicionesAlrededor(e, "buque", "superior")
                        matriz[y - 1][x + 4] = 2
                        matriz[y][x + 4] = 2
                        matriz[y - 1][x - 1] = 2
                        matriz[y][x - 1] = 2
                    }else{

                        posicionesAlrededor(e, "buque", "superior")
                        posicionesAlrededor(e, "buque", "inferior")
                        posicionesAlrededor(e, "buque", "derecha")
                        posicionesAlrededor(e, "buque", "izquierda")
                    }
                    contador += 1
                } else if (x + 3 == 8) {
                    matriz[y][x] = 1
                    matriz[y][x + 1] = 1
                    matriz[y][x + 2] = 1
                    matriz[y][x + 3] = 1
                    lecturaMatriz();
                    if (matriz[y - 1] == undefined) {
                        posicionesAlrededor(e, "buque", "inferior")
                        matriz[y][x - 1] = 2
                        matriz[y + 1][x - 1] = 2
                    } else if (matriz[y + 1] == undefined) {
                        posicionesAlrededor(e, "buque", "superior")
                        matriz[y - 1][x - 1] = 2
                        matriz[y][x - 1] = 2
                    } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                        posicionesAlrededor(e, "buque", "superior")
                        posicionesAlrededor(e, "buque", "inferior")
                        posicionesAlrededor(e, "buque", "izquierda")
                    }
                    contador += 1
                }

                
            }else if (contador === 1){
                if(x + 2 <8){
                    if(matriz[y][x] == 0 && matriz[y][x+3] == 0){
                        matriz[y][x] = 1
                        matriz[y][x + 1] = 1
                        matriz[y][x + 2] = 1
                        lecturaMatriz();
                        if(matriz[y][x - 1] == undefined){
                            if (matriz[y - 1] == undefined) {
                                posicionesAlrededor(e, "submarino", "inferior")
                                matriz[y][x + 3] = 2
                                matriz[y + 1][x + 3] = 2
                            } else if (matriz[y + 1] == undefined) {
                                posicionesAlrededor(e, "submarino", "superior")
                                matriz[y - 1][x + 3] = 2
                                matriz[y][x + 3] = 2
                            } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                                posicionesAlrededor(e, "submarino", "superior")
                                posicionesAlrededor(e, "submarino", "inferior")
                                posicionesAlrededor(e, "submarino", "derecha")
    
                            }
                        } else if (matriz[y][x - 1] != undefined && matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "submarino", "inferior")
                            matriz[y][x + 3] = 2
                            matriz[y + 1][x + 3] = 2
                            matriz[y][x - 1] = 2
                            matriz[y + 1][x - 1] = 2
                        } else if (matriz[y][x - 1] != undefined && matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "submarino", "superior")
                            matriz[y - 1][x + 3] = 2
                            matriz[y][x + 3] = 2
                            matriz[y - 1][x - 1] = 2
                            matriz[y][x - 1] = 2
                        }else{
                            posicionesAlrededor(e, "submarino", "superior")
                            posicionesAlrededor(e, "submarino", "inferior")
                            posicionesAlrededor(e, "submarino", "derecha")
                            posicionesAlrededor(e, "submarino", "izquierda")
                        }
                        contador += 1
                    }
                } else if (x + 2 == 8) {
                    if(matriz[y][x] == 0){
                        matriz[y][x] = 1
                        matriz[y][x + 1] = 1
                        matriz[y][x + 2] = 1
                        lecturaMatriz();
                        if (matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "submarino", "inferior")
                            matriz[y][x - 1] = 2
                            matriz[y + 1][x - 1] = 2
                        } else if (matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "submarino", "superior")
                            matriz[y - 1][x - 1] = 2
                            matriz[y][x - 1] = 2
                        } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                            posicionesAlrededor(e, "submarino", "superior")
                            posicionesAlrededor(e, "submarino", "inferior")
                            posicionesAlrededor(e, "submarino", "izquierda")
                        }
                        contador += 1
                    }
                }


            }else if (contador === 2){
                if(x + 1 <8){
                    if(matriz[y][x] == 0 && matriz[y][x+1] == 0){
                        matriz[y][x] = 1
                        matriz[y][x + 1] = 1
                        lecturaMatriz();
                        if(matriz[y][x - 1] == undefined){
                            if (matriz[y - 1] == undefined) {
                                posicionesAlrededor(e, "crucero", "inferior")
                                matriz[y][x + 2] = 2
                                matriz[y + 1][x + 2] = 2
                            } else if (matriz[y + 1] == undefined) {
                                posicionesAlrededor(e, "crucero", "superior")
                                matriz[y - 1][x + 2] = 2
                                matriz[y][x + 2] = 2
                            } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                                posicionesAlrededor(e, "crucero", "superior")
                                posicionesAlrededor(e, "crucero", "inferior")
                                posicionesAlrededor(e, "crucero", "derecha")
    
                            }
                        } else if (matriz[y][x - 1] != undefined && matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "crucero", "inferior")
                            matriz[y][x + 2] = 2
                            matriz[y + 1][x + 2] = 2
                            matriz[y][x - 1] = 2
                            matriz[y + 1][x - 1] = 2
                        } else if (matriz[y][x - 1] != undefined && matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "crucero", "superior")
                            matriz[y - 1][x + 2] = 2
                            matriz[y][x + 2] = 2
                            matriz[y - 1][x - 1] = 2
                            matriz[y][x - 1] = 2
                        }else{
                            posicionesAlrededor(e, "crucero", "superior")
                            posicionesAlrededor(e, "crucero", "inferior")
                            posicionesAlrededor(e, "crucero", "derecha")
                            posicionesAlrededor(e, "crucero", "izquierda")
                        }
                        contador += 1
                    }
                } else if (x + 1 == 8) {
                    console.log("si")
                    if(matriz[y][x] == 0){
                        matriz[y][x] = 1
                        matriz[y][x + 1] = 1
                        lecturaMatriz();
                        if (matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "crucero", "inferior")
                            matriz[y][x - 1] = 2
                            matriz[y + 1][x - 1] = 2
                        } else if (matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "crucero", "superior")
                            matriz[y - 1][x - 1] = 2
                            matriz[y][x - 1] = 2
                        } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                            posicionesAlrededor(e, "crucero", "superior")
                            posicionesAlrededor(e, "crucero", "inferior")
                            posicionesAlrededor(e, "crucero", "izquierda")
                        }
                        contador += 1
                    }
                }
            
            
            }else if (contador === 3){
                if(x <8){
                    if(matriz[y][x] == 0){
                        matriz[y][x] = 1
                        lecturaMatriz();
                        if(matriz[y][x - 1] == undefined){
                            if (matriz[y - 1] == undefined) {
                                posicionesAlrededor(e, "lancha", "inferior")
                                matriz[y][x + 1] = 2
                                matriz[y + 1][x + 1] = 2
                            } else if (matriz[y + 1] == undefined) {
                                posicionesAlrededor(e, "lancha", "superior")
                                matriz[y - 1][x + 1] = 2
                                matriz[y][x + 1] = 2
                            } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                                posicionesAlrededor(e, "lancha", "superior")
                                posicionesAlrededor(e, "lancha", "inferior")
                                posicionesAlrededor(e, "lancha", "derecha")
    
                            }
                        } else if (matriz[y][x - 1] != undefined && matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "lancha", "inferior")
                            matriz[y][x + 1] = 2
                            matriz[y + 1][x + 1] = 2
                            matriz[y][x - 1] = 2
                            matriz[y + 1][x - 1] = 2
                        } else if (matriz[y][x - 1] != undefined && matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "lancha", "superior")
                            matriz[y - 1][x + 1] = 2
                            matriz[y][x + 1] = 2
                            matriz[y - 1][x - 1] = 2
                            matriz[y][x - 1] = 2
                        }else{
                            posicionesAlrededor(e, "lancha", "superior")
                            posicionesAlrededor(e, "lancha", "inferior")
                            posicionesAlrededor(e, "lancha", "derecha")
                            posicionesAlrededor(e, "lancha", "izquierda")
                        }
                        contador += 1
                    }
                } else if (x == 8) {
                    if(matriz[y][x] == 0){
                        matriz[y][x] = 1
                        lecturaMatriz();
                        if (matriz[y - 1] == undefined) {
                            posicionesAlrededor(e, "lancha", "inferior")
                            matriz[y][x - 1] = 2
                            matriz[y + 1][x - 1] = 2
                        } else if (matriz[y + 1] == undefined) {
                            posicionesAlrededor(e, "lancha", "superior")
                            matriz[y - 1][x - 1] = 2
                            matriz[y][x - 1] = 2
                        } else if (matriz[y - 1][x] != undefined && matriz[y + 1][x] != undefined) {
                            posicionesAlrededor(e, "lancha", "superior")
                            posicionesAlrededor(e, "lancha", "inferior")
                            posicionesAlrededor(e, "lancha", "izquierda")
                        }
                        contador += 1
                    }
                }
            }

        }
    }
    if (contador === 4) {
        tableroEnemigo.style.display = ""
        instrucciones.style.display = "none"
        puntaje.style.display = ""
        defineMensaje()
    }
};

/* recarga la pagina */
const cargarPagina = () => {
    location.reload()
    modoJuego = ""
};
/* modo lanchas */
const jugarConLanchas = () => {
    instruccionesLanchas.style.display = "block"
    opcionesJuego.style.display = "none"
    tableroJugador.style.display = ""
    modoJuego = "lanchas"
};
/* modo tradicional */
const jugarConTodo = () => {
    instruccionesBarcos.style.display = ""
    opcionesJuego.style.display = "none"
    tableroJugador.style.display = ""
    modoJuego = "tradicional"
};





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
opcionLanchas.addEventListener("click", jugarConLanchas)
opcionFullBarcos.addEventListener("click", jugarConTodo)