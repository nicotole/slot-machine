document.addEventListener('DOMContentLoaded', () => {
    
    const audio = new Audio("./sounds/win.mp3");

    const minValueResult = 1,
    maxValueResult = 9;

    let $reels = document.querySelectorAll(".reel img");
    
    let $handle = document.querySelector(".handle");
    $handle.addEventListener("click", play);

    let $fakeButtons = document.querySelectorAll(".fake-button");

    console.log($fakeButtons)

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    function play(){
        let result1, result2, result3;
        result1 = getRandomInt(minValueResult, maxValueResult);
        result2 = getRandomInt(minValueResult, maxValueResult);
        result3 = getRandomInt(minValueResult, maxValueResult);

        // result1=3; for debug and testing
        // result2=3;
        // result3=3; 
        
        $reels[0].src = "./img/" + result1 + ".png";
        $reels[1].src = "./img/" + result2 + ".png";
        $reels[2].src = "./img/" + result3 + ".png";

        if ((result1 == result2) && (result2 == result3)){
            console.log("ganaste pa");
            audio.play();
            $fakeButtons.forEach((e)=> {
                console.log("hola")
                e.classList.add("shine");
            });
            $handle.removeEventListener("click", play);
            setTimeout( function() {
                $fakeButtons.forEach((e) => {
                    e.classList.remove("shine");
                });
                $handle.addEventListener("click", play);
            }, 4500);
        }
    }





    
});