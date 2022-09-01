
import { container } from "./Game.js";

export class Player {

    scoreInfo = document.querySelector('[data-score]')
    livesInfo = document.querySelector('[data-lives]')

    constructor() {

        this.lives  = 3;
        this.score = 0;

    }


    updateLives() {

        this.lives--
        this.updateText()
        container.classList.add('hit')
        setTimeout(() => container.classList.remove('hit') ,200)
    }

    updateScore() {

        this.score++
        this.updateText()

    }

    updateText() {

        this.livesInfo.textContent = `Lives: ${this.lives}`;
        this.scoreInfo.textContent = `Score: ${this.score}`;
        
    }


    reset(){

        this.lives = 3;
        this.score = 0;

    }


    

}