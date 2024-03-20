//-- Clase cronómetro
class Crono {


    constructor(display) {
        this.display = display;

        //-- Tiempo
        this.cent = 0, //-- Centésimas
        this.seg = 0,  //-- Segundos
        this.min = 0,  //-- Minutos
        this.timer = 0;  //-- Temporizador asociado
    }

    //-- Método que se ejecuta cada centésima
    tic() {
        //-- Incrementar en una centesima
        this.cent += 1;

        //-- 100 centésimas hacen 1 segundo
        if (this.cent == 100) {
        this.seg += 1;
        this.cent = 0;
        }

        //-- 60 segundos hacen un minuto
        if (this.seg == 60) {
        this.min = 1;
        this.seg = 0;
        }

        //-- Mostrar el valor actual
        this.display.innerHTML = this.min + ":" + this.seg + ":" + this.cent
    }

    //-- Arrancar el cronómetro
    start() {
       if (!this.timer) {
          //-- Lanzar el temporizador para que llame 
          //-- al método tic cada 10ms (una centésima)
          this.timer = setInterval( () => {
              this.tic();
          }, 10);
        }
    }

    //-- Parar el cronómetro
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    //-- Reset del cronómetro
    reset() {
        this.cent = 0;
        this.seg = 0;
        this.min = 0;

        this.display.innerHTML = "0:0:0";
    }
}

//-- Elementos de la gui
const gui = {
    display : document.getElementById("display"),
    start : document.getElementById("start"),
    stop : document.getElementById("stop"),
    reset : document.getElementById("reset")
}

//-- Definir un objeto cronómetro
const crono = new Crono(gui.display);

//-- Configurar las funciones de retrollamada

//-- Arranque del cronometro
gui.start.onclick = () => {
    console.log("Start!!");
    crono.start();
}

//-- Detener el cronómetro
gui.stop.onclick = () => {
    console.log("Stop!");
    crono.stop();
}

//-- Reset del cronómetro
gui.reset.onclick = () => {
    console.log("Reset!");
    crono.reset();
}

//-- Configurar las funciones de retrollamada para la entrada del teclado
const clave = ['1', '2', '3', '4']; // Define tu clave secreta aquí
const digitosClave = document.querySelectorAll('.digitos');

document.querySelectorAll('.tecla').forEach(tecla => {
    tecla.addEventListener('click', function() {
        const teclaPresionada = this.textContent;
        if (clave.includes(teclaPresionada)) {
            const indice = clave.indexOf(teclaPresionada);
            digitosClave[indice].textContent = teclaPresionada;
            digitosClave[indice].style.color = 'green';
            if (clave.join('') === Array.from(digitosClave).map(digito => digito.textContent).join('')) {
                crono.stop(); // Detener el cronómetro cuando la clave se completa
            }
        }
    });
});
