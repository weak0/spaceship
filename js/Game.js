import SpaceShip from './Spaceship.js';

class Game {

    spaceShip = new SpaceShip('[data-spaceship]')

    gameInit() {

        this.spaceShip.init()
        this.getPositionInterval = setInterval( () => this.getPosition(), 200)

    }

    getPosition ()  {



        this.spaceShip.missilesArr.forEach((missile, index) => {

       let misilesPosition = {
                top: missile.element.offsetTop,
                bottom: missile.element.offsetTop + missile.element.offsetHeight,
                left:missile.element.offsetLeft,
                right:missile.element.offsetLeft + missile.element.offsetWidth,
    
            }

            console.log(misilesPosition)

            if(missile.element.offsetTop < 0 ){

                missile.remove()
                this.spaceShip.missilesArr.splice(index , 1)

            } 

        })

        }

    

}

const game = new Game()

game.gameInit();