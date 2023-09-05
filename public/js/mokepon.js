

const sectionSeleccionar_ataque=document.getElementById("Seleccionar_ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const Boton_mascota= document.getElementById("Boton_mascota")
sectionReiniciar.style.display='none'
let botonfuego 
let botonAgua 
let botontierra 
 

const sectionSeleccionar_Mascota=document.getElementById("Seleccionar_Mascota")

const spanMascotaJugador=document.getElementById("Mascota_jugador")

const spanMascota_enemigo = document.getElementById("Mascota_enemigo")

const spanVidas_Jugador = document.getElementById("Vidas_Jugador")
const spanVidas_Enemigo = document.getElementById("Vidas_Enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataquesDelJugador")
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo")
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const boton_Reiniciar = document.getElementById("Reiniciar_Juego")
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver_mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones =[]
let mokeponesEnemigos = []

let ataqueJugador=[]
let ataqueEnemigo =[]
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotajugador
let mascotaJugadorObjeto
let Vidas_Jugador = 0
let Vidas_Enemigo = 0
let ataquesMokepon
let botones = []
let ataquesMokeponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackGround = new Image()
mapaBackGround.src = './Imagenes/mokemap.png'
let alturaQueBuscamos
let anchoDeMapa = window.innerWidth-40
const anchoMaximoDelMapa = 600

if (anchoDeMapa>anchoMaximoDelMapa){
    anchoDeMapa = anchoMaximoDelMapa-40
}
alturaQueBuscamos = anchoDeMapa*600/800

mapa.width = anchoDeMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor (nombre, foto, vida,fotoMapa, id= null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataque = []
        this.ancho=80
        this.alto=80
        this.x = Aleatorio(0,mapa.width-this.ancho)
        this.y = Aleatorio(0,mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let Hipodoge=new Mokepon('Hipodoge', './Imagenes/EOAN4279.JPG',5,'./Imagenes/EOAN4279.JPG')
let Capipepo=new Mokepon('Capipepo', './Imagenes/ESZU0982.JPG',5,'./Imagenes/ESZU0982.JPG')
let Ratigueya=new Mokepon('Ratigueya', './Imagenes/HWSM5382.JPG',5,'./Imagenes/HWSM5382.JPG')

// let HipodogeEnemigo=new Mokepon('Hipodoge', './Imagenes/EOAN4279.JPG',5,'./Imagenes/EOAN4279.JPG')
// let CapipepoEnemigo=new Mokepon('Capipepo', './Imagenes/ESZU0982.JPG',5,'./Imagenes/ESZU0982.JPG')
// let RatigueyaEnemigo=new Mokepon('Ratigueya', './Imagenes/HWSM5382.JPG',5,'./Imagenes/HWSM5382.JPG')

const HIPODOGE_ATAQUES = [
    {nombre: '💧',id:'Boton_agua'},
    {nombre: '💧',id:'Boton_agua'},
    {nombre: '💧',id:'Boton_agua'},
    {nombre: '🔥',id:'Boton_fuego'},
    {nombre: '🌱',id:'Boton_tierra'}
]


Hipodoge.ataque.push(...HIPODOGE_ATAQUES)

const RATIGUEYA_ATAQUES = [
{nombre: '🔥',id:'Boton_fuego'},
{nombre: '🔥',id:'Boton_fuego'},
{nombre: '🔥',id:'Boton_fuego'},
{nombre: '💧',id:'Boton_agua'},
{nombre: '🌱',id:'Boton_tierra'}]

Ratigueya.ataque.push(...RATIGUEYA_ATAQUES)

const CAPIPEPO_ATAQUES = [
{nombre: '🌱',id:'Boton_tierra'},
{nombre: '🌱',id:'Boton_tierra'},
{nombre: '🌱',id:'Boton_tierra'},
{nombre: '💧',id:'Boton_agua'},
{nombre: '🔥',id:'Boton_fuego'}]

Capipepo.ataque.push(...CAPIPEPO_ATAQUES)

mokepones.push(Hipodoge,Ratigueya,Capipepo)


function IniciarJuego(){

    sectionSeleccionar_ataque.style.display = 'none'
    sectionVerMapa.style.display ='none'

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `  
        <input type="radio" name="mascota" id=${Mokepon.nombre}>
        <label class="tarjetaMokepon" for=${Mokepon.nombre}> 
            <p>${Mokepon.nombre}</p>
            <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipodoge = document.getElementById("Hipodoge")
        inputCapipepo = document.getElementById("Capipepo")
        inputRatigueya = document.getElementById("Ratigueya")

    })

    

    Boton_mascota.addEventListener("click", SeleccionarMascotaJugador)
    
    boton_Reiniciar.addEventListener("click",reiniciar_juego)

    unirseAlJuego()

}

function unirseAlJuego() {
    fetch ("http://192.168.1.2:8080/unirme")
       .then(function (res) {
        if (res.ok){
            res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

function SeleccionarMascotaJugador(){
    
    
    
    
    
    if (inputHipodoge.checked){
        //alert("Seleccionaste Hipodogue")
        spanMascotaJugador.innerHTML=inputHipodoge.id
        mascotajugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        //alert("Seleccionaste Capipepo")
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotajugador = inputCapipepo.id
    } else if (inputRatigueya.checked){
        //alert("Seleccionaste Ratigueya")
        spanMascotaJugador.innerHTML=inputRatigueya.id
        mascotajugador = inputRatigueya.id
    } else {
        alert("selecciona una mascota")
        return 
    }

    sectionSeleccionar_Mascota.style.display = 'none'
    seleccionarMokepon(mascotajugador)

    extraerAtaques(mascotajugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function seleccionarMokepon(mascotajugador){
    fetch (`http://192.168.1.2:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
            mokepon: mascotajugador
        })
    })
}


function extraerAtaques (mascotajugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotajugador == mokepones[i].nombre){
            ataques = mokepones[i].ataque
        }
    }
    
    mostrarAtaques(ataques)
    
}

function mostrarAtaques(ataques){

    ataques.forEach((ataques) => {
        ataquesMokepon = `<button id=${ataques.id} class="boton-de-ataque BAtaque">${ataques.nombre}</button>`
        contenedorAtaques.innerHTML +=  ataquesMokepon    
          
    })

    botonfuego = document.getElementById("Boton_fuego")
    botonAgua = document.getElementById("Boton_agua")
    botontierra = document.getElementById("Boton_tierra")

    botones = document.querySelectorAll('.BAtaque')

}

function secuenciaAtaque (){
    
    botones.forEach((boton) => {
        boton.addEventListener('click',(e)=>{
            
            console.log("boton",e)
            if (e.target.textContent == '🔥'){
                ataqueJugador.push('FUEGO')
                
                boton.style.background = '#112f58'
                boton.disabled=true
            } else if (e.target.textContent == '💧'){
                ataqueJugador.push('AGUA')
                
                boton.style.background = '#112f58'
                boton.disabled=true
            } else {
                ataqueJugador.push('TIERRA')
                
                
                boton.style.background = '#112f58'
                boton.disabled=true
            }
            console.log("ataqueJugador",ataqueJugador)
            if (ataqueJugador.length==5){
                enviarAtaques()
            }
            
            
        })
    })
}

function enviarAtaques(){
    console.log("ataqueJugador",ataqueJugador)
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/ataques`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques,50)
}

function obtenerAtaques(){
    
    fetch(`http://192.168.1.2:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res){
            
            if (res.ok){
                res.json()
                    .then(function({ataques}){
                        
                        if (ataques.length===5){
                            ataqueEnemigo = ataques
                            combate()
                            console.log("COMBATE")
                        }
                    })
            }
        })
}

function SeleccionarMascotaEnemigo(enemigo){
        // let mascotaAleatorio = Aleatorio(mokepones.length-1+.9,0)
        // spanMascota_enemigo.innerHTML = mokepones [mascotaAleatorio].nombre
        // ataquesMokeponEnemigo = mokepones [mascotaAleatorio].ataque

        
        spanMascota_enemigo.innerHTML = enemigo.nombre
        ataquesMokeponEnemigo = enemigo.ataque
       
        secuenciaAtaque () 
      
    }

function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = Aleatorio(ataquesMokeponEnemigo.length-1+.9,0)

    

    if (ataqueAleatorio == 0 || ataqueAleatorio == Math.floor(ataquesMokeponEnemigo.length/3)){
        ataqueEnemigo.push("FUEGO")
    }else if (ataqueAleatorio== Math.ceil(ataquesMokeponEnemigo.length/3)|| ataqueAleatorio==Math.floor(ataquesMokeponEnemigo.length/3*2)){
        ataqueEnemigo.push("AGUA")
    }else {
        ataqueEnemigo.push("TIERRA")
    }
    
    iniciarPelea()
}

function iniciarPelea(){
    if (ataqueJugador.length == mokepones[0].ataque.length){
        combate()
    }
}


function Aleatorio(min,max){
    return (Math.floor(Math.random()*((max-min))+(min)))
}

function indexAmbosOponentes (jugador,enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index]==ataqueEnemigo[index]){
            indexAmbosOponentes (index,index)
            crearMensaje("Empate")
        } else if ((ataqueJugador[index]=="FUEGO" && ataqueEnemigo[index]=="TIERRA") || (ataqueJugador[index]=="AGUA" && ataqueEnemigo[index]=="FUEGO") || (ataqueJugador[index]=="TIERRA" && ataqueEnemigo[index]=="AGUA")){
            indexAmbosOponentes (index,index)
            crearMensaje("Ganas tu")
            
            Vidas_Jugador=Vidas_Jugador+1
        } else {
            indexAmbosOponentes (index,index)
            crearMensaje("Perdiste")
            Vidas_Enemigo=Vidas_Enemigo+1
        }
        
    }
   
    spanVidas_Jugador.innerHTML = Vidas_Jugador
    spanVidas_Enemigo.innerHTML = Vidas_Enemigo
    revisarVidas()
}

function revisarVidas(){
    if (Vidas_Enemigo<Vidas_Jugador){
        //GANASTE
        crearMensajeFinal(" GANASTE")
        
    } else if (Vidas_Enemigo==Vidas_Jugador){
        //EMPATE
        crearMensajeFinal("EMPATE")
        
    } else {
        //PERDISTE
        crearMensajeFinal(" PERDISTE")
    }
    
}

function crearMensaje(resultado){
    
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
    
}

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    
    sectionReiniciar.style.display="block"
}

function reiniciar_juego (){
    location.reload()
}


function pintarCanva() {

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage (
        mapaBackGround,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    mascotaJugadorObjeto.pintarMokepon()
    
    enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        if (mokepon != undefined){
            mokepon.pintarMokepon()
            revisarColision(mokepon)
        }
        
    })
    
    
}

function enviarPosicion(x,y){
    
    fetch(`http://192.168.1.2:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
            
        })
    })
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function({enemigos}){
            

                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        
                        if (enemigo.mokepon != undefined)
                        {
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            
                            if (mokeponNombre==='Hipodoge'){
                                mokeponEnemigo=new Mokepon('Hipodoge', './Imagenes/EOAN4279.JPG',5,'./Imagenes/EOAN4279.JPG', enemigo.id)
                            } else if (mokeponNombre === 'Capipepo'){
                                mokeponEnemigo=new Mokepon('Capipepo', './Imagenes/ESZU0982.JPG',5,'./Imagenes/ESZU0982.JPG',enemigo.id)
                            } else if (mokeponNombre === 'Ratigueya'){
                                mokeponEnemigo=new Mokepon('Ratigueya', './Imagenes/HWSM5382.JPG',5,'./Imagenes/HWSM5382.JPG',enemigo.id)
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }
                        return mokeponEnemigo
                    })

                } ) 
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
    //pintarCanva()
    //intervalo = setInterval(pintarCanva,50)
    
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
    //pintarCanva()
    //intervalo = setInterval(pintarCanva,50)
}
function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
    //pintarCanva()
    //intervalo = setInterval(pintarCanva,50)
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
    //pintarCanva()
    //intervalo = setInterval(pintarCanva,50)
}

function detenerMovimiento() {
    
    mascotaJugadorObjeto.velocidadX=0
    mascotaJugadorObjeto.velocidadY=0
    
    //clearInterval(intervalo)
    
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            //clearInterval(intervalo)
            break

        case 'ArrowDown':
            moverAbajo()
            //clearInterval(intervalo)
            break

        case 'ArrowLeft':
            moverIzquierda()
            //clearInterval(intervalo)
            break

        case 'ArrowRight':
            moverDerecha()
            //clearInterval(intervalo)
            break
    
        default:
            break
    }
}

function iniciarMapa(){
    //mapa.width =800
    //mapa.height = 600
    mascotaJugadorObjeto = obtenerObjetoMascota()
    
    intervalo = setInterval(pintarCanva,50)
    
    //pintarCanva()
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup',detenerMovimiento)
}

function obtenerObjetoMascota () {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotajugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo || 
        izquierdaMascota > derechaEnemigo 
    ) {
        return;
    }
    // alert ("Hay colision " + enemigo.nombre)
    detenerMovimiento()
    console.log ("COLISION ",enemigo.nombre)
    enemigoId = enemigo.id
    clearInterval(intervalo)
    sectionSeleccionar_ataque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    SeleccionarMascotaEnemigo(enemigo)
}

window.addEventListener("load",IniciarJuego)