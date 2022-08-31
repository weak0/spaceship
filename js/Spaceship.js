import { Missile } from "./Missile.js"



export class SpaceShip {

    
    leftArrow = false 
    rightArrow = false
    missilesArr = []
    SPACESHIP_SPEED = 5
    MISSILE_SPEED = 1




    constructor(element) {



        this.element = element
        this.spaceShip = this.bindToElement()


    }

    bindToElement() {

        const spaceship = document.querySelector(`${this.element}`);
        return spaceship

    }





    init() {

        this.setPositon(this.spaceShip);
        window.addEventListener('keydown', (e) => this.checkKeyDown(e));
        window.addEventListener('keyup', (e) => this.checkKeyUp(e));
        this.gameLopp()
        

    }

    setPositon() {

        this.spaceShip.style.bottom = '10px';
        this.spaceShip.style.left = `${window.innerWidth / 2 - this.spaceShip.offsetWidth / 2}px`

    }

    checkKeyDown(e) {

        switch (e.keyCode) {
            case 37:
                this.leftArrow = true
                break
            case 39:
                this.rightArrow = true
                break;

        }
    }

    checkKeyUp(e) {

        switch (e.keyCode) {
            case 37:
                this.leftArrow = false          
                break
            case 39:
                this.rightArrow = false           
                break;
            case 32:
                this.shot()       
                break;

        }
    }

    gameLopp  = () => {
        this.steerSpaceship()
        requestAnimationFrame(this.gameLopp)
    }

    steerSpaceship() {

        const spaceshipToLeft = parseInt(this.spaceShip.style.left) + this.spaceShip.offsetWidth / 2;
        const spaceshipToRight = window.innerWidth - spaceshipToLeft;

        if (this.leftArrow && spaceshipToLeft > 0) {
            this.spaceShip.style.left = `${parseInt(this.spaceShip.style.left) - this.SPACESHIP_SPEED}px`;
        }

        if (this.rightArrow && spaceshipToRight > 0){
            this.spaceShip.style.left = `${parseInt(this.spaceShip.style.left) + this.SPACESHIP_SPEED}px`;
        }
    }

    shot() {

        const missile = new Missile(parseInt(this.spaceShip.style.left) + this.spaceShip.offsetWidth/2, this.spaceShip.offsetTop, this.MISSILE_SPEED);
        missile.init();
        this.missilesArr.push(missile)


    }

    reset(){

        this.MISSILE_SPEED = 1
        this.SPACESHIP_SPEED = 5
    }


}