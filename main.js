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
const eleccionDeBarcos = document.getElementById("eleccionBarcos");
const detalleBarcos = document.getElementById("barcos");
const horizontal = document.getElementById("horizontal");
const vertical = document.getElementById("vertical");
const direccion = document.getElementById("direccion");

let banderaBarcosEnemigos = "";
let banderaBarcosJugador = "";
let modoJuego = "";
let bandera = false;
let perdido = false;
let hundido = false;
let posicionBarcos = false;
let misil = "";
const barcos = [];
const barcosJugador = [];
const barcosElegidosPc = [];
const disparosRealizados = [];
const verificadorPosiciones = [];
let contadorBarcosHundidos = 0;
let contadorBarcosPerdidos = 0;
let contadorBarcosCreados = 0
let contadorBarcosPc = 0
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
const matrizEnemigo = [
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

/* dibuja en el tablero el barco elegido */
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
/* traduccion matrizEnemigo */
const traduccion = (tipoMatriz, array) => {
    for (let i = 0; i < tipoMatriz.length; i++) {
        for (let j = 0; j < tipoMatriz[i].length; j++) {
            if (tipoMatriz[i][j] === 1) {
                let idPosicion = ""
                if (tipoMatriz === matrizEnemigo) {
                    idPosicion = `${j + 1}x${i + 1}y`
                } else if (tipoMatriz === matriz) {
                    idPosicion = `${i + 1}y${j + 1}x`
                }
                array.push(idPosicion)
            }
        }
    }
}
/* anula los espacios alrededor del barco creado */
const posicionesAlrededor = (coordenada, tipoBarco, tipoLinea, usuario, tipoMatriz) => {
    let y = 0
    let x = 0
    if (usuario === "jugador") {
        const posicion = coordenada.target.id
        let aux = posicion.replace('x', '').replace('y', '');
        y = parseInt(aux[0]) - 1
        x = parseInt(aux[1]) - 1
    } else if (usuario === "pc") {
        y = coordenada[1]
        x = coordenada[0]
    }
    if (tipoBarco === "buque") {
        switch (tipoLinea) {
            case "inferior":
                tipoMatriz[y + 1][x] = 2
                tipoMatriz[y + 1][x + 1] = 2
                tipoMatriz[y + 1][x + 2] = 2
                tipoMatriz[y + 1][x + 3] = 2
                break
            case "inferiorV":
                tipoMatriz[y + 4][x] = 2
                tipoMatriz[y + 4][x - 1] = 2
                tipoMatriz[y + 4][x + 1] = 2
                break
            case "superior":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x + 1] = 2
                tipoMatriz[y - 1][x + 2] = 2
                tipoMatriz[y - 1][x + 3] = 2
                break
            case "superiorV":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y - 1][x + 1] = 2
                break
            case "izquierda":
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                break
            case "izquierdaV":
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                tipoMatriz[y + 2][x - 1] = 2
                tipoMatriz[y + 3][x - 1] = 2
                break
            case "derecha":
                tipoMatriz[y - 1][x + 4] = 2
                tipoMatriz[y][x + 4] = 2
                tipoMatriz[y + 1][x + 4] = 2
                break
            case "derechaV":
                tipoMatriz[y][x + 1] = 2
                tipoMatriz[y + 1][x + 1] = 2
                tipoMatriz[y + 2][x + 1] = 2
                tipoMatriz[y + 3][x + 1] = 2
                break
        }
    } else if (tipoBarco === "submarino") {
        switch (tipoLinea) {
            case "inferior":
                tipoMatriz[y + 1][x] = 2
                tipoMatriz[y + 1][x + 1] = 2
                tipoMatriz[y + 1][x + 2] = 2
                break
            case "inferiorV":
                tipoMatriz[y + 3][x] = 2
                tipoMatriz[y + 3][x - 1] = 2
                tipoMatriz[y + 3][x + 1] = 2
                break
            case "superior":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x + 1] = 2
                tipoMatriz[y - 1][x + 2] = 2
                break
            case "superiorV":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y - 1][x + 1] = 2
                break
            case "izquierda":
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                break
            case "izquierdaV":
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                tipoMatriz[y + 2][x - 1] = 2
                break
            case "derecha":
                tipoMatriz[y - 1][x + 3] = 2
                tipoMatriz[y][x + 3] = 2
                tipoMatriz[y + 1][x + 3] = 2
                break
            case "derechaV":
                tipoMatriz[y][x + 1] = 2
                tipoMatriz[y + 1][x + 1] = 2
                tipoMatriz[y + 2][x + 1] = 2
                break
        }
    } else if (tipoBarco === "crucero") {
        switch (tipoLinea) {
            case "inferior":
                tipoMatriz[y + 1][x] = 2
                tipoMatriz[y + 1][x + 1] = 2
                break
            case "inferiorV":
                tipoMatriz[y + 2][x] = 2
                tipoMatriz[y + 2][x - 1] = 2
                tipoMatriz[y + 2][x + 1] = 2
                break
            case "superior":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x + 1] = 2
                break
            case "superiorV":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y - 1][x + 1] = 2
                break
            case "izquierda":
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                break
            case "izquierdaV":
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                break
            case "derecha":
                tipoMatriz[y - 1][x + 2] = 2
                tipoMatriz[y][x + 2] = 2
                tipoMatriz[y + 1][x + 2] = 2
                break
            case "derechaV":
                tipoMatriz[y][x + 1] = 2
                tipoMatriz[y + 1][x + 1] = 2
                break
        }
    } else if (tipoBarco === "lancha") {
        switch (tipoLinea) {
            case "inferior":
                tipoMatriz[y + 1][x] = 2
                break
            case "inferiorV":
                tipoMatriz[y + 1][x] = 2
                tipoMatriz[y + 1][x - 1] = 2
                tipoMatriz[y + 1][x + 1] = 2
                break
            case "superior":
                tipoMatriz[y - 1][x] = 2
                break
            case "superiorV":
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y - 1][x + 1] = 2
                break
            case "izquierda":
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
                break
            case "izquierdaV":
                tipoMatriz[y][x - 1] = 2
                break
            case "derecha":
                tipoMatriz[y - 1][x + 1] = 2
                tipoMatriz[y][x + 1] = 2
                tipoMatriz[y + 1][x + 1] = 2
                break
            case "derechaV":
                tipoMatriz[y][x + 1] = 2
                break
        }
    }
}
/* creador coordenada aleatoria */
const creadorCoordenada = () => {
    const posicionY = Math.floor(Math.random() * 9);
    const posicionX = Math.floor(Math.random() * 9);
    const coordenadas = [posicionX, posicionY];
    return coordenadas

}
/* crea barcos segun el tipo que se especifique */
const creadorBarcos = (e, x, y, numero, usuario, barco, tipoMatriz, orientacion) => {
    if (orientacion === false) {
        if (x + numero < 8) {
            tipoMatriz[y][x] = 1
            if (numero == 1) {
                tipoMatriz[y][x + 1] = 1
            } else if (numero == 2) {
                tipoMatriz[y][x + 1] = 1
                tipoMatriz[y][x + 2] = 1
            } else if (numero == 3) {
                tipoMatriz[y][x + 1] = 1
                tipoMatriz[y][x + 2] = 1
                tipoMatriz[y][x + 3] = 1
            }
            if (usuario === "jugador") {
                lecturaMatriz();
            }
            if (tipoMatriz[y][x - 1] == undefined) {
                if (tipoMatriz[y - 1] == undefined) {
                    if (usuario === "jugador") {
                        posicionesAlrededor(e, barco, "inferior", "jugador", matriz)
                    } else if (usuario === "pc") {
                        posicionesAlrededor(e, barco, "inferior", "pc", matrizEnemigo)
                    }
                    tipoMatriz[y][x + (numero + 1)] = 2
                    tipoMatriz[y + 1][x + (numero + 1)] = 2
                } else if (tipoMatriz[y + 1] == undefined) {
                    if (usuario === "jugador") {
                        posicionesAlrededor(e, barco, "superior", "jugador", matriz)
                    } else if (usuario === "pc") {
                        posicionesAlrededor(e, barco, "superior", "pc", matrizEnemigo)
                    }
                    tipoMatriz[y - 1][x + (numero + 1)] = 2
                    tipoMatriz[y][x + (numero + 1)] = 2
                } else if (tipoMatriz[y - 1][x] != undefined && tipoMatriz[y + 1][x] != undefined) {
                    if (usuario === "jugador") {
                        posicionesAlrededor(e, barco, "superior", "jugador", matriz)
                        posicionesAlrededor(e, barco, "inferior", "jugador", matriz)
                        posicionesAlrededor(e, barco, "derecha", "jugador", matriz)
                    } else if (usuario === "pc") {
                        posicionesAlrededor(e, barco, "superior", "pc", matrizEnemigo)
                        posicionesAlrededor(e, barco, "inferior", "pc", matrizEnemigo)
                        posicionesAlrededor(e, barco, "derecha", "pc", matrizEnemigo)
                    }

                }
            } else if (tipoMatriz[y][x - 1] != undefined && tipoMatriz[y - 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "inferior", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "inferior", "pc", matrizEnemigo)
                }
                tipoMatriz[y][x + (numero + 1)] = 2
                tipoMatriz[y + 1][x + (numero + 1)] = 2
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
            } else if (tipoMatriz[y][x - 1] != undefined && tipoMatriz[y + 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "superior", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "superior", "pc", matrizEnemigo)
                }
                tipoMatriz[y - 1][x + (numero + 1)] = 2
                tipoMatriz[y][x + (numero + 1)] = 2
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y][x - 1] = 2
            } else {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "superior", "jugador", matriz)
                    posicionesAlrededor(e, barco, "inferior", "jugador", matriz)
                    posicionesAlrededor(e, barco, "derecha", "jugador", matriz)
                    posicionesAlrededor(e, barco, "izquierda", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "superior", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "inferior", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "derecha", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "izquierda", "pc", matrizEnemigo)
                }
            }
            if (usuario === "jugador") {
                contadorBarcosCreados += 1
            }
            return "yes"
        } else if (x + numero == 8) {
            tipoMatriz[y][x] = 1
            if (numero == 1) {
                tipoMatriz[y][x + 1] = 1
            } else if (numero == 2) {
                tipoMatriz[y][x + 1] = 1
                tipoMatriz[y][x + 2] = 1
            } else if (numero == 3) {
                tipoMatriz[y][x + 1] = 1
                tipoMatriz[y][x + 2] = 1
                tipoMatriz[y][x + 3] = 1
            }
            if (usuario === "jugador") {
                lecturaMatriz();
            }
            if (tipoMatriz[y - 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "inferior", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "inferior", "pc", matrizEnemigo)
                }
                tipoMatriz[y][x - 1] = 2
                tipoMatriz[y + 1][x - 1] = 2
            } else if (tipoMatriz[y + 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "superior", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "superior", "pc", matrizEnemigo)
                }
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y][x - 1] = 2
            } else if (tipoMatriz[y - 1][x] != undefined && tipoMatriz[y + 1][x] != undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "superior", "jugador", matriz)
                    posicionesAlrededor(e, barco, "inferior", "jugador", matriz)
                    posicionesAlrededor(e, barco, "izquierda", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "superior", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "inferior", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "izquierda", "pc", matrizEnemigo)
                }
            }
            if (usuario === "jugador") {
                contadorBarcosCreados += 1
            }
            return "yes"
        }
    } else if (orientacion === true) {
        if (y + numero < 8) {
            tipoMatriz[y][x] = 1
            if (numero == 1) {
                tipoMatriz[y + 1][x] = 1
            } else if (numero == 2) {
                tipoMatriz[y + 1][x] = 1
                tipoMatriz[y + 2][x] = 1
            } else if (numero == 3) {
                tipoMatriz[y + 1][x] = 1
                tipoMatriz[y + 2][x] = 1
                tipoMatriz[y + 3][x] = 1
            }
            if (usuario === "jugador") {
                lecturaMatriz();
            }
            if (tipoMatriz[y - 1] == undefined) {
                if (tipoMatriz[y][x - 1] == undefined) {
                    if (usuario === "jugador") {
                        posicionesAlrededor(e, barco, "derechaV", "jugador", matriz)
                    } else if (usuario === "pc") {
                        posicionesAlrededor(e, barco, "derechaV", "pc", matrizEnemigo)
                    }
                    tipoMatriz[y + (numero + 1)][x] = 2
                    tipoMatriz[y + (numero + 1)][x + 1] = 2
                } else if (tipoMatriz[y][x + 1] == undefined) {
                    if (usuario === "jugador") {
                        posicionesAlrededor(e, barco, "izquierdaV", "jugador", matriz)
                    } else if (usuario === "pc") {
                        posicionesAlrededor(e, barco, "izquierdaV", "pc", matrizEnemigo)
                    }
                    tipoMatriz[y + (numero + 1)][x - 1] = 2
                    tipoMatriz[y + (numero + 1)][x] = 2
                } else if (tipoMatriz[y][x - 1] != undefined && tipoMatriz[y][x + 1] != undefined) {
                    if (usuario === "jugador") {
                        posicionesAlrededor(e, barco, "inferiorV", "jugador", matriz)
                        posicionesAlrededor(e, barco, "izquierdaV", "jugador", matriz)
                        posicionesAlrededor(e, barco, "derechaV", "jugador", matriz)
                    } else if (usuario === "pc") {
                        posicionesAlrededor(e, barco, "inferiorV", "pc", matrizEnemigo)
                        posicionesAlrededor(e, barco, "izquierdaV", "pc", matrizEnemigo)
                        posicionesAlrededor(e, barco, "derechaV", "pc", matrizEnemigo)
                    }

                }
            } else if (tipoMatriz[y - 1][x] != undefined && tipoMatriz[x - 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "derechaV", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "derechaV", "pc", matrizEnemigo)
                }
                tipoMatriz[y + (numero + 1)][x] = 2
                tipoMatriz[y + (numero + 1)][x + 1] = 2
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x + 1] = 2
            } else if (tipoMatriz[y - 1][x] != undefined && tipoMatriz[x + 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "izquierdaV", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "izquierdaV", "pc", matrizEnemigo)
                }
                tipoMatriz[y + (numero + 1)][x - 1] = 2
                tipoMatriz[y + (numero + 1)][x] = 2
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y - 1][x] = 2
            } else {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "superiorV", "jugador", matriz)
                    posicionesAlrededor(e, barco, "inferiorV", "jugador", matriz)
                    posicionesAlrededor(e, barco, "derechaV", "jugador", matriz)
                    posicionesAlrededor(e, barco, "izquierdaV", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "superiorV", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "inferiorV", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "derechaV", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "izquierdaV", "pc", matrizEnemigo)
                }
            }
            if (usuario === "jugador") {
                contadorBarcosCreados += 1
                console.log(matriz)
            }
            return "yes"
        } else if (y + numero == 8) {
            tipoMatriz[y][x] = 1
            if (numero == 1) {
                tipoMatriz[y + 1][x] = 1
            } else if (numero == 2) {
                tipoMatriz[y + 1][x] = 1
                tipoMatriz[y + 2][x] = 1
            } else if (numero == 3) {
                tipoMatriz[y + 1][x] = 1
                tipoMatriz[y + 2][x] = 1
                tipoMatriz[y + 3][x] = 1
            }
            if (usuario === "jugador") {
                lecturaMatriz();
            }
            if (tipoMatriz[y][x - 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "derechaV", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "derechaV", "pc", matrizEnemigo)
                }
                tipoMatriz[y - 1][x] = 2
                tipoMatriz[y - 1][x + 1] = 2
            } else if (tipoMatriz[y][x + 1] == undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "izquierdaV", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "izquierdaV", "pc", matrizEnemigo)
                }
                tipoMatriz[y - 1][x - 1] = 2
                tipoMatriz[y - 1][x] = 2
            } else if (tipoMatriz[y][x - 1] != undefined && tipoMatriz[y][x + 1] != undefined) {
                if (usuario === "jugador") {
                    posicionesAlrededor(e, barco, "superiorV", "jugador", matriz)
                    posicionesAlrededor(e, barco, "derechaV", "jugador", matriz)
                    posicionesAlrededor(e, barco, "izquierdaV", "jugador", matriz)
                } else if (usuario === "pc") {
                    posicionesAlrededor(e, barco, "superiorV", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "derechaV", "pc", matrizEnemigo)
                    posicionesAlrededor(e, barco, "izquierdaV", "pc", matrizEnemigo)
                }
            }
            if (usuario === "jugador") {
                contadorBarcosCreados += 1
                console.log(matriz)
            }
            return "yes"
        }
    }
}
/* crea un array de barcos del enemigo */
const barcosEnemigos = () => {
    const verificador = []
    if (modoJuego === "lanchas") {
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
    } else if (modoJuego === "tradicional") {
        for (let i = 0; i < 4; i) {
            let coordenada = creadorCoordenada()
            let x = coordenada[0]
            let y = coordenada[1]
            if (i === 0) {
                if (matrizEnemigo[y][x + 3] != undefined) {
                    creadorBarcos(coordenada, x, y, 3, "pc", "buque", matrizEnemigo, posicionBarcos)
                    i++
                }
            } else if (i === 1) {
                if (matrizEnemigo[y][x] === 0 && matrizEnemigo[y][x + 2] != undefined && matrizEnemigo[y][x + 2] === 0) {
                    creadorBarcos(coordenada, x, y, 2, "pc", "submarino", matrizEnemigo, posicionBarcos)
                    i++
                }
            } else if (i === 2) {
                if (matrizEnemigo[y][x] === 0 && matrizEnemigo[y][x + 1] != undefined && matrizEnemigo[y][x + 1] === 0) {
                    creadorBarcos(coordenada, x, y, 1, "pc", "crucero", matrizEnemigo, posicionBarcos)
                    i++
                }
            } else if (i === 3) {
                if (matrizEnemigo[y][x] === 0 && matrizEnemigo[y][x] != undefined) {
                    creadorBarcos(coordenada, x, y, 0, "pc", "lancha", matrizEnemigo, posicionBarcos)
                    console.log(matrizEnemigo)
                    i++
                }
            }
        }
    }

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
            contadorBarcosHundidos += 1;
            objetivo.style.background = "red";
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
    if (modoJuego === "lanchas") {
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
    } else if (modoJuego === "tradicional") {
        if (banderaBarcosEnemigos) {
            cuadrados.forEach((cuadrado) => {
                if (barcos.includes(cuadrado.id)) {
                    cuadrado.style.border = "3px solid orange";
                }
            })
            mostrarPosicionesPc.innerHTML = "Ocultar posiciones"
        } else {
            cuadrados.forEach(cuadrado => {
                cuadrado.style.border = "1px solid grey"
            })
            mostrarPosicionesPc.innerHTML = "Mostrar posiciones"
        }
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
                contadorBarcosHundidos += 1;
                eliminados.innerHTML = contadorBarcosHundidos;
                defineMensaje("green")
                console.log("suma")

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
        if (contadorBarcosCreados < 4) {
            const coordenada = e.target.id
            let aux = coordenada.replace('x', '').replace('y', '');
            const y = parseInt(aux[0]) - 1
            const x = parseInt(aux[1]) - 1
            if (matriz[y][x] === 0) {
                if (posicionBarcos === false) {
                    if (contadorBarcosCreados === 0) {
                        creadorBarcos(e, x, y, 3, "jugador", "buque", matriz, posicionBarcos)
                    } else if (contadorBarcosCreados === 1) {
                        if (matriz[y][x + 2] === 0) {
                            creadorBarcos(e, x, y, 2, "jugador", "submarino", matriz, posicionBarcos)
                        }
                    } else if (contadorBarcosCreados === 2) {
                        if (matriz[y][x + 1] === 0) {
                            creadorBarcos(e, x, y, 1, "jugador", "crucero", matriz, posicionBarcos)
                        }
                    } else if (contadorBarcosCreados === 3) {
                        creadorBarcos(e, x, y, 0, "jugador", "lancha", matriz, posicionBarcos)
                    }
                }
                else if (posicionBarcos === true) {
                    if (contadorBarcosCreados === 0) {
                        creadorBarcos(e, x, y, 3, "jugador", "buque", matriz, posicionBarcos)
                    } else if (contadorBarcosCreados === 1) {
                        creadorBarcos(e, x, y, 2, "jugador", "submarino", matriz, posicionBarcos)
                    } else if (contadorBarcosCreados === 2) {
                        creadorBarcos(e, x, y, 1, "jugador", "crucero", matriz, posicionBarcos)
                    } else if (contadorBarcosCreados === 3) {
                        creadorBarcos(e, x, y, 0, "jugador", "lancha", matriz, posicionBarcos)
                    }
                }
            }

        }
    }
    if (contadorBarcosCreados === 4) {
        tableroEnemigo.style.display = ""
        instrucciones.style.display = "none"
        instruccionesBarcos.style.display = "none"
        eleccionDeBarcos.style.display = "none"
        puntaje.style.display = ""
        defineMensaje()
        traduccion(matriz, barcosJugador)
        traduccion(matrizEnemigo, barcos)
    } else if (barcosJugador.length === 10) {
        tableroEnemigo.style.display = ""
        instrucciones.style.display = "none"
        instruccionesLanchas.style.display = "none"
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
    barcosEnemigos()
};
/* modo tradicional */
const jugarConTodo = () => {
    instruccionesBarcos.style.display = ""
    opcionesJuego.style.display = "none"
    tableroJugador.style.display = ""
    eleccionDeBarcos.style.display = ""
    modoJuego = "tradicional"
    barcosEnemigos()
};
const seleccionaOrientacion = () => {
    posicionBarcos = !posicionBarcos
}





const eligeBarcos = () => {
    cuadradosJugador.forEach((cuadrado) => {
        cuadrado.addEventListener('click', pintaJugador)
    })

};
cuadrados.forEach((cuadrado) => {
    cuadrado.addEventListener('click', pinta)
});
direccion.addEventListener("change", seleccionaOrientacion)
body.addEventListener("load", eligeBarcos());
mostrarPosicionesPc.addEventListener("click", posicionesPC);
disparar.addEventListener("click", dispararModal);
span.addEventListener("click", cerrarModal);
input.addEventListener("change", capturaValor);
disparaMisil.addEventListener("click", dispararAlBarco)
jugarDeNuevo.addEventListener("click", cargarPagina)
opcionLanchas.addEventListener("click", jugarConLanchas)
opcionFullBarcos.addEventListener("click", jugarConTodo)