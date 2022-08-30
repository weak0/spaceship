import { Enemy} from './Enemy.js';
import { Player } from './Player.js';
import { SpaceShip } from './Spaceship.js';



class Game {

    spaceShip = new SpaceShip('[data-spaceship]');
    positionInterval = null;
    enemiesInterval = null;
    eniemies = [];
    enemyMoveIntreval = null;

    modal = document.querySelector('[data-modal]')
    modalScore = document.querySelector('[data-score-info]')
    modalButton= document.querySelector('[data-button]')





    gameInit() {

        this.spaceShip.init();
        this.newGame();
        this.modalButton.addEventListener('click', () => this.newGame())

    }

    newGame() {

        this.modal.classList.add('hide')
        this.player = new Player();
        this.player.updateLivesText();
        this.player.updateScoreText();
        this.enemiesInterval = setInterval(() => this.generateEnemies(), 1000);
        this.positionInterval = setInterval(() => this.getPosition(), 200);

    }

    getPosition(){

            this.eniemies.forEach((enemy, index, arr) => {

                const enemyPosition = {
                    top: enemy.element.offsetTop,
                    bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                    left: enemy.element.offsetLeft,
                    right: enemy.element.offsetLeft + enemy.element.offsetWidth,

                }

                if (enemy.element.offsetTop > window.innerHeight) {

                    enemy.remove()
                    this.player.updateLives();
                    this.endGameCheck();
                    arr.splice(index, 1)

                }

                    this.spaceShip.missilesArr.forEach((missile, index, arrMissiles) => {
            const misilesPosition = {
                top: missile.element.offsetTop,
                bottom: missile.element.offsetTop + missile.element.offsetHeight,
                left: missile.element.offsetLeft,
                right: missile.element.offsetLeft + missile.element.offsetWidth,

            }
            if (missile.element.offsetTop < 0) {

                missile.remove()
                arrMissiles.splice(index, 1)

            }    

                if (misilesPosition.bottom >= enemyPosition.top &&
                    misilesPosition.top <= enemyPosition.bottom &&
                    misilesPosition.right >= enemyPosition.left &&
                     misilesPosition.left <= enemyPosition.right){
                        enemy.hit()
                        if(enemy.lives === 0){
                        this.player.updateScore()
                        arr.splice(index, 1)
                        }

                        missile.remove()
                        arrMissiles.splice(index, 1)

                    }


            })

        })

    }

    generateEnemies() {
        const obj = this.randomClass()
        const enemy = new Enemy(obj)
        enemy.init()
        this.eniemies.push(enemy)
        this.enemyMoveIntreval = setInterval(() => enemy.enemyMove(), 50)
    }


    randomClass() {

        const random = Math.floor(Math.random() * 5) + 1

        if (random % 5) {

            const obj = {}

            return obj


        } else {
            const obj = {

                className: 'enemy--big',
                lives: 3,
                explosionClassName: 'explosion--big',
                enemySpeed: 2 
                
            }

            return obj

        }

    }

    endGameCheck() {

        if(!this.player.lives) {

            this.modal.classList.remove('hide');
            this.modalScore.textContent = `You lose! Score: ${this.player.score}`;
            this.clean();
            


        }

    }

    clean() {

        clearInterval(this.enemiesInterval);
        clearInterval(this.enemyMoveIntreval);
        clearInterval(this.positionInterval);
        this.eniemies.forEach((enemy) => enemy.remove());
        this.spaceShip.missilesArr.forEach(missile => missile.remove())
        this.spaceShip.setPositon();

    }



}

const game = new Game()

game.gameInit();