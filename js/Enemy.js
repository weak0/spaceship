let speed = 5
let speed_big = 2



export class Enemy {

    container = document.querySelector('[data-container]')
    enemyIncraseSpeedInterval = null
    


    constructor() {

        this.randomizeEnemy = this.randomClass()
        this.element = document.createElement('div')
        this.className = this.randomizeEnemy.className
        this.y = 0;
        this.lives = this.randomizeEnemy.lives;
        this.explosionClassName = this.randomizeEnemy.explosionClassName;
        this.enemySpeedProp = this.randomizeEnemy.enemySpeed
        

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

        this.y = this.element.offsetTop + this.enemySpeedProp
        this.element.style.top = `${this.y}px`        

    }

    removeElement() {

        this.element.remove()
        clearInterval(this.enemyMoveIntreval)

    }

    hit() {

        this.lives--
        if(this.lives === 0) {

        this.element.classList.remove(this.className)
        this.element.classList.add(this.explosionClassName)
        setTimeout( () => this.removeElement(), 600)

        }

    }

    randomClass() {


        const random = Math.floor(Math.random() * 5) + 1

        if (random % 5) {

            const obj = {

                className: 'enemy',
                lives: 1,
                explosionClassName: 'explosion',
                enemySpeed: this.enemySpeed()

            }



            return obj


        } else {
            const obj = {

                className: 'enemy--big',
                lives: 3,
                explosionClassName: 'explosion--big',
                enemySpeed: this.enemySpeedBig()
                
            }

            return obj

        }
    }

    enemySpeedBig() {


    speed_big++
    const newSpeed = speed_big
    return newSpeed


    }

    enemySpeed() {

        speed++
        const newSpeed = speed
        return newSpeed
    }


    

}