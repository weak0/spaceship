import {
    Enemy
} from './Enemy.js';
import {
    Player
} from './Player.js';
import {
    SpaceShip
} from './Spaceship.js';


export const  container = document.querySelector('[data-container]')


class Game {


    positionInterval = null;
    enemiesInterval = null;
    eniemies = [];
    enemyMoveIntreval = null;
    incraseEnemySpeed = 0;
    generateEnemyTime = 1000;


    modal = document.querySelector('[data-modal]')
    modalScore = document.querySelector('[data-score-info]')
    modalButton = document.querySelector('[data-button]')
  
    upgradeSpaceshipBtn = document.querySelector('[data-upgrade-spaceship]')
    upgradeMissileBtn = document.querySelector('[data-upgrade-missile]')
    

    player = new Player();
    spaceShip = new SpaceShip('[data-spaceship]')




    gameInit() {


        this.newGame();
        this.modalButton.addEventListener('click', () => this.newGame())
        window.addEventListener('keyup', (e) => e.key === 'x' ? this.upgradeSpaceship() : () => {});
        window.addEventListener('keyup',  (e) => e.key === 'z' ?  this.upgradeMissile() : () => {});
        this.spaceShip.init();



    }

    newGame() {

        this.modal.classList.add('hide')
        this.spaceShip.reset()
        this.player.updateText();
        this.generateEnemyTime = 1000;
        this.enemiesInterval = setInterval(() => this.generateEnemies(), this.generateEnemyTime);
        this.positionInterval = setInterval(() => this.getPosition(), 50);

    }

    getPosition() {

        this.eniemies.forEach((enemy, indexEnemy) => {

            const enemyPosition = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft - container.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth - container.offsetLeft,
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

        if (enemyPosition.top > container.offsetHeight) {

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

        if(!(this.player.score % 25) && this.player.score != 0 ) {

            clearInterval(this.enemiesInterval)
            this.generateEnemyTime =  this.generateEnemyTime * 0.75
            this.enemiesInterval = setInterval(() => this.generateEnemies(), this.generateEnemyTime);
        }

        if( !(this.player.score % 10) && this.player.score != 0){
            this.incraseEnemySpeed++
        }
        const enemy = new Enemy(this.incraseEnemySpeed)
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
        this.incraseEnemySpeed = 0;
        this.eniemies.forEach(element => {
            element.removeElement()
        })
        this.eniemies.splice(0);
        this.spaceShip.missilesArr.forEach(element => element.remove())
        this.spaceShip.missilesArr.splice(0)
        this.player.reset()
        
    }

    upgradeMissile(e) {


        if(this.player.score >= 20) {

            this.player.score = this.player.score - 20;
            this.player.updateText()
            this.spaceShip.MISSILE_SPEED++

        }

    }
    upgradeSpaceship(e) {


        if(this.player.score >= 20) {

            this.player.score = this.player.score-20;
            this.player.updateText()
            this.spaceShip.SPACESHIP_SPEED = this.spaceShip.SPACESHIP_SPEED+ 2
        }



    }

}

const game = new Game()

game.gameInit();