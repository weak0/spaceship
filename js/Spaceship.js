const SPACESHIP_PX_MOVE = 10

export default class SpaceShip {

    constructor(element) {

        this.element = element
        this.spaceShip = this.bindToElement()
        this.$init()


    }

    bindToElement() {

        const spaceship = document.querySelector(`${this.element}`);
        return spaceship

    }





    $init() {
        this.setPositon(this.spaceShip)
        window.addEventListener('keydown', (e) => this.steerSpaceShip(e))

    }

    setPositon() {

        this.spaceShip.style.bottom = '10px';
        this.spaceShip.style.left = `${window.innerWidth / 2 - this.spaceShip.offsetWidth / 2}px`

    }

    steerSpaceShip(e) {

        const spaceshipToLeft = parseInt(this.spaceShip.style.left) - (0 - this.spaceShip.offsetWidth / 2);
        const spaceshipToRight = window.innerWidth - spaceshipToLeft;

        switch (e.keyCode) {
            case 37:
                if (spaceshipToLeft > SPACESHIP_PX_MOVE) {
                    this.spaceShip.style.left = `${parseInt(this.spaceShip.style.left) - SPACESHIP_PX_MOVE}px`;
                }
                break
            case 39:
                if (spaceshipToRight > SPACESHIP_PX_MOVE ){ 
                this.spaceShip.style.left = `${parseInt(this.spaceShip.style.left) + SPACESHIP_PX_MOVE}px`;
                }
                break;

        } 

    }






}