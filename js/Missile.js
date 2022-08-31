export class Missile {

    container =  document.querySelector('[data-container]')

    constructor(x, y , misileSpeed){

        this.x = x;
        this.y = y ;
        this.element = document.createElement('div'); 
        this.init()
        this.interval = null;
        this.misileSpeed = misileSpeed
        

    }

    init() {

       this.element.classList.add('missile')
       this.element.style.left = `${this.x - this.element.offsetWidth / 2 - 2}px`;
       this.element.style.top = `${this.y - this.element.offsetHeight}px`;
       this.container.appendChild(this.element);
       this.interval = setInterval(() => this.element.style.top = `${this.element.offsetTop - this.misileSpeed}px`, 10)     

    }

    remove() {

        this.element.remove()
        clearInterval(this.interval)

    }

}