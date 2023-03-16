document.addEventListener('DOMContentLoaded', () => {
    
    const win_sound = new Audio("./sounds/win.mp3");
    const machine_sound = new Audio("./sounds/machine.mp3");
    

    const minValueResult = 1,
    maxValueResult = 9;

    let $reels = document.querySelectorAll(".reel img");
    
    let $handleBall = document.querySelector(".handle-ball"),
        $handleStick = document.querySelector(".handle-stick"),
        $handle = document.querySelector(".handle");
    $handle.addEventListener("click", play);

    let $fakeButtons = document.querySelectorAll(".fake-button");

    

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    

    function sumbutrule(){
        //esta funcion hace el efecto de randomizado en el dom

        aux1 = getRandomInt(minValueResult, maxValueResult);
        aux2 = getRandomInt(minValueResult, maxValueResult);
        aux3 = getRandomInt(minValueResult, maxValueResult);

        $reels[0].src = "./img/" + aux1 + ".png";
        $reels[1].src = "./img/" + aux2 + ".png";
        $reels[2].src = "./img/" + aux3 + ".png";
    };

    
    

    function play(){
        let result1, result2, result3;
        //se calculan los resultados de la tirada
        result1 = getRandomInt(minValueResult, maxValueResult); 
        result2 = getRandomInt(minValueResult, maxValueResult);
        result3 = getRandomInt(minValueResult, maxValueResult);

        $handleBall.classList.add("handle-ball-active");
        $handleStick.classList.add("handle-stick-active");
        
        machine_sound.play();

        $handle.removeEventListener("click", play);//para que el usuario no pueda tirar la palanca a lo loco. le quitamos el control de la palanca

        var intervalId = setInterval(sumbutrule, 150);//cada Xms cambia lo que se ve en visor

        setTimeout(function(){ //set time out se queda esperando a que pasen los 2000ms para detener la aminacion de randomizado
            clearInterval(intervalId);//detiene el intervalo en el que se ejecuta sumbutrule
            
            //a partir de aca ya estan los valores seteados y se completo con la animacion de sumbutrule

            //muestro el resultado de la jugada
            $reels[0].src = "./img/" + result1 + ".png";
            $reels[2].src = "./img/" + result3 + ".png";
            $reels[1].src = "./img/" + result2 + ".png";



            if ((result1 == result2) && (result2 == result3)){
                win_sound.play();
                $fakeButtons.forEach((e)=> {
                    e.classList.add("shine");
                });
                setTimeout( function() {
                    $fakeButtons.forEach((e) => {
                        e.classList.remove("shine");
                    });
                    $handle.addEventListener("click", play);
                }, 4500);
            }

            setTimeout( function() { //retornamos el control al usuario al terminar la jugada
                $handle.addEventListener("click", play);
            }, 4000)
            $handleBall.classList.remove("handle-ball-active");
            $handleStick.classList.remove("handle-stick-active");
        }, 2000);
    }
});