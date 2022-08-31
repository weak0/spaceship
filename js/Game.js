import {
    Enemy
} from './Enemy.js';
import {
    Player
} from './Player.js';
import {
    SpaceShip
} from './Spaceship.js';



class Game {

    spaceShip = new SpaceShip('[data-spaceship]');
    positionInterval = null;
    enemiesInterval = null;
    eniemies = [];
    enemyMoveIntreval = null;

    modal = document.querySelector('[data-modal]')
    modalScore = document.querySelector('[data-score-info]')
    modalButton = document.querySelector('[data-button]')
    container = document.querySelector('[data-container]')





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
        this.positionInterval = setInterval(() => this.getPosition(), 50);

    }

    getPosition() {

        this.eniemies.forEach((enemy, indexEnemy) => {

            const enemyPosition = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
            }

            this.enemyHit(enemyPosition, enemy, indexEnemy)


            this.spaceShip.missilesArr.forEach((missile, indexMissiles) => {
                const misilesPosition = {
                    top: missile.element.offsetTop,
                    bottom: missile.element.offsetTop + missile.element.offsetHeight,
                    left: missile.element.offsetLeft,
                    right: missile.element.offsetLeft + missile.element.offsetWidth,
                }
                this.missileOutCheck(missile, indexMissiles)
                this.colisionCheck(enemy, missile, enemyPosition, misilesPosition, indexEnemy, indexMissiles)
            })
        })
    }

    enemyHit(enemyPosition, enemy, index) {

        if (enemyPosition.top > window.innerHeight) {

            enemy.removeElement()
            this.player.updateLives();
            this.endGameCheck();
            this.eniemies.splice(index, 1)

        }

    }

    colisionCheck(enemy, missile, misilesPosition, enemyPosition, indexEnemy, indexMissiles) {

        if (misilesPosition.bottom >= enemyPosition.top &&
            misilesPosition.top <= enemyPosition.bottom &&
            misilesPosition.right >= enemyPosition.left &&
            misilesPosition.left <= enemyPosition.right) {
            enemy.hit()
            if (enemy.lives === 0) {
                this.player.updateScore()
                this.eniemies.splice(indexEnemy, 1)
            }

            missile.remove()
            this.spaceShip.missilesArr.splice(indexMissiles, 1)

        }

    }

    missileOutCheck(missile, indexMissiles) {

        if (missile.element.offsetTop < 0) {

            missile.remove()
            this.spaceShip.missilesArr.splice(indexMissiles, 1)

        }

    }

    generateEnemies() {
        const enemy = new Enemy()
        enemy.init()
        this.eniemies.push(enemy)
        this.enemyMoveIntreval = setInterval(() => enemy.enemyMove(), 50)
    }

    endGameCheck() {

        if (!this.player.lives) {
            this.modal.classList.remove('hide');
            this.modalScore.textContent = `You lose! Score: ${this.player.score}`;
            this.clean();
        }

    }

    clean() {
        this.spaceShip.setPositon();
        clearInterval(this.enemiesInterval);
        clearInterval(this.enemyMoveIntreval);
        clearInterval(this.positionInterval);
        this.eniemies.forEach(element => {
            element.removeElement()
        })
        this.eniemies.splice(0)
    }

}

const game = new Game()

game.gameInit();