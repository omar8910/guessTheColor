window.onload = () =>{
    tituloH1 = document.querySelector("h1");
    mostrarRGB = document.getElementById("showRGB");
    botonResetear = document.getElementById("reset");
    mensajeJuego = document.getElementById("message");
    cuadrados = document.querySelectorAll(".square");
    botonesDificultad = document.querySelectorAll(".mode");

    colores = []; // Array de colores
    colorElegido; // Color que se debe adivinar
    numCuadrados = 6; // Cantidad de cuadrados que se muestran

    botonResetear.addEventListener("click", resetearJuego);

    for(var i = 0; i < botonesDificultad.length; i++){
        botonesDificultad[i].addEventListener("click", cambiarDificultad);
    }

    resetearJuego();
}

var tituloH1;
var mostrarRGB;
var botonResetear;
var mensajeJuego;
var cuadrados;
var botonesDificultad;

var colores; // Array de colores
var colorElegido; // Color que se debe adivinar
var numCuadrados; // Cantidad de cuadrados que se muestran

// Inicia el juego, muestra los colores en los cuadrados y agrega el evento click a cada cuadrado.
    function iniciarJuego(){
        mostrarRGB.textContent = colorElegido;
        for(var i = 0; i < cuadrados.length; i++){
            cuadrados[i].style.backgroundColor = colores[i];
            cuadrados[i].addEventListener("click", function(){
                var colorClickeado = this.style.backgroundColor;
                if(colorClickeado === colorElegido){
                    mensajeJuego.style.color = colorClickeado;
                    mensajeJuego.textContent = "!Correcto!";
                    botonResetear.textContent = "¿Jugar de nuevo?";
                    cambiarColorTodosCuadrados(colorClickeado);
                    tituloH1.style.backgroundColor = colorClickeado;
                }else{
                    this.style.backgroundColor = "#232323"; // Si no acierta el color, el cuadrado se pone de color negro
                    mensajeJuego.style.color = colorClickeado;
                    mensajeJuego.textContent = "Incorrecto";
                }
            });
        }
    }

    // Cambia el color de todos los cuadrados al color que se le pase por parametro.
    function cambiarColorTodosCuadrados(color){
        for(var i = 0; i < cuadrados.length; i++){
            cuadrados[i].style.backgroundColor = color;
        }
    }

    // Genera un color aleatorio y lo devuelve en un array.
    function generarColores(num){
        var arr = [];
        for(var i = 0; i < num; i++){
            arr.push(generarColor());
        }
        return arr;
    }

    // Genera un color aleatorio y lo devuelve en formato rgb.
    function generarColor(){
        var r = Math.floor(Math.random() * 256); // 0 - 255
        var g = Math.floor(Math.random() * 256); // 0 - 255
        var b = Math.floor(Math.random() * 256); // 0 - 255
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

    // Resetea el juego, genera nuevos colores y los asigna a los cuadrados.
    function resetearJuego(){
        colores = generarColores(numCuadrados);
        colorElegido = colores[Math.floor(Math.random() * colores.length)];
        iniciarJuego();
        botonResetear.textContent = "Nuevos colores";
        mensajeJuego.textContent = "";
    }

    // Cambia la dificultad segun el boton que se presione, si es facil se muestran 3 cuadrados, si es dificil se muestran 6.   
    function cambiarDificultad(){
        this.classList.add("selected");
        if(this.textContent === "Fácil"){ // this hace referencia al boton que se presiono o al que se le hizo click
            numCuadrados = 3; 
            botonesDificultad[1].classList.remove("selected"); // .classList permite agregar o quitar clases de un elemento
            for(var i = 3; i < cuadrados.length; i++){
                cuadrados[i].style.display = "none";
            }
        }
        else{
            numCuadrados = 6;
            botonesDificultad[0].classList.remove("selected");
            for(var i = 3; i < cuadrados.length; i++){
                cuadrados[i].style.display = "block";
            }
        }
        resetearJuego();
    }
