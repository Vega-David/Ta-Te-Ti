/*CONSTANTES*/
const display=document.querySelector(".notificaciones")
Estado=['','','','','','','','',''],
Ganadoras=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [2,4,6]
    ],
    MGanador=()=>"El jugador "+jActual+" es el ganador!",
    MEmpate=()=>"El juego termino en empate!",
    MTurno=()=>"Turno del jugador "+jActual

/*Variables*/
let juegoActivo=true
let jActual="O"

/*Funciones*/
function menu(){
    mostrarResultado(MTurno())
    oyentes()
}

menu()

function mostrarResultado(mensaje){
    display.innerHTML=mensaje
}

function oyentes(){
    document.querySelector(".tablero").addEventListener("click",verificadorClick)
    document.querySelector(".reiniciar").addEventListener("click",verificadorReinicio)
}

function verificadorClick(clickEvent){
    const celdaClick=clickEvent.target
    if(celdaClick.classList.contains("celda")){
        const celdaClickIndex=Array.from(celdaClick.parentNode.children).indexOf(celdaClick)
        console.log(celdaClickIndex)
        if(Estado[celdaClickIndex]!=="" || !juegoActivo){
            return

        }
        verificadorCeldaJugador(celdaClick,celdaClickIndex)
        verificadorPartida()
    }
    
}
function verificadorReinicio(){
    juegoActivo=true
    jActual="O",
    reiniciarJuego()
    mostrarResultado(MTurno())
    document.querySelectorAll(".celda").forEach(cell=>cell.innerText="")
}
function reiniciarJuego(){
    let i = Estado.length
    while(i--){
        Estado[i]=""
    }
}
function verificadorCeldaJugador(celdaClick,celdaClickIndex){
    Estado[celdaClickIndex]=jActual
    celdaClick.innerText=jActual
}

function verificadorPartida(){
    let Victoria=false
    for(let i=0;i<Ganadoras.length;i++){
        const condicionVictoria=Ganadoras[i]
        let posicion1=Estado[condicionVictoria[0]]
        let posicion2=Estado[condicionVictoria[1]]
        let posicion3=Estado[condicionVictoria[2]]
        if(posicion1===""||posicion2===""||posicion3===""){
            continue
        }
        if(posicion1===posicion2 && posicion1===posicion3){
            Victoria=true
            break
        }
    }
    if(Victoria){
        mostrarResultado(MGanador())
        juegoActivo=false
        return
    }
    let empate=!Estado.includes("")
    if(empate){
        mostrarResultado(MEmpate())
        juegoActivo=false
        return
    }

    cambiarJugador()
}

function cambiarJugador(){
    jActual=(jActual==="X") ? "O" : "X"
    mostrarResultado(MTurno())
}