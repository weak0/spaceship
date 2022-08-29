import {
    Enemy
} from './Enemy.js';
import SpaceShip from './Spaceship.js';

class Game {

    spaceShip = new SpaceShip('[data-spaceship]');    
    missilesPositionInterval = null;
    enemiesInterval = null;
    eniemies = [];
    enemyMoveIntreval = null;



    gameInit() {

        this.spaceShip.init()
        this.missilesPositionInterval = setInterval(() => this.getMissilesPosition(), 200)
        this.enemiesInterval = setInterval(() => this.generateEnemies(), 1000)
        this.enemiesPositionInterval = setInterval(() => this.getMissilesPosition(), 200)

    }

    getMissilesPosition() {
        this.spaceShip.missilesArr.forEach((missile, index, arr) => {
            const misilesPosition = {
                top: missile.element.offsetTop,
                bottom: missile.element.offsetTop + missile.element.offsetHeight,
                left: missile.element.offsetLeft,
                right: missile.element.offsetLeft + missile.element.offsetWidth,

            }
            if (missile.element.offsetTop < 0) {

                missile.remove()
                arr.splice(index, 1)

            }
        })
    }

    generateEnemies() {
        const enemy = new Enemy(this.randomClass())
        enemy.init()
        this.eniemies.push(enemy)
        this.enemyMoveIntreval = setInterval(() => enemy.enemyMove(), 50 )
    }

    getMissilesPosition() {
        this.eniemies.forEach((enemy, index, arr) => {

            const enemyPosition = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,

            }
            if (enemy.element.offsetTop > window.innerHeight) {



                enemy.remove()
                arr.splice(index, 1)

            }
        })
    }

    randomClass() {

        const random = Math.floor( Math.random() * 5) + 1

        if (random % 5) {
            return 'enemy'
        }
        else {
            return 'enemy--big'
        }

    }



}

const game = new Game()

game.gameInit();