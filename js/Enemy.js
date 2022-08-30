export class Enemy {

    container = document.querySelector('[data-container]')
   

    constructor({className = 'enemy', lives = 1, explosionClassName = 'explosion', enemySpeed = 5 }) {

        this.element = document.createElement('div')
        this.className = className
        this.y = 0;
        this.lives = lives;
        this.explosionClassName = explosionClassName;
        this.enemySpeed = enemySpeed
        

    }

    init() {
        this.element.classList.add(this.className)
        this.container.appendChild(this.element)
        this.x = this.drawPosition(); 
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
    }

    drawPosition() {

        const random =  Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth))

        return random

    }

    enemyMove() {

        this.y = this.element.offsetTop + this.enemySpeed
        this.element.style.top = `${this.y}px`        

    }

    remove() {

        this.element.remove()
        clearInterval(this.enemyMoveIntreval)

    }

    hit() {

        this.lives--
        if(this.lives === 0) {

        this.element.classList.remove(this.className)
        this.element.classList.add(this.explosionClassName)
        setTimeout( () => this.remove(), 600)

        }

    }

    

}