export class Enemy {

    container = document.querySelector('[data-container]')
   

    constructor(className) {

        this.element = document.createElement('div')
        this.className = className
        this.y = 0;
        this.x = this.drawPosition();
        

    }

    init() {
        this.element.classList.add(this.className)
        this.element.style.left = `${this.x}px`
        this.element.style.top = `${this.y}px`
        this.container.appendChild(this.element)
        console.log(this.element.offsetWidth);

    }

    drawPosition() {

        const random = Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth))

        return random

    }

    enemyMove() {

        this.y = this.element.offsetTop + 5
        this.element.style.top = `${this.y}px`        

    }

    remove() {

        this.element.remove()
        clearInterval(this.enemyMoveIntreval)

    }

    

}