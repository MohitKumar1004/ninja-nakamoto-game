import Sprite from "./Sprite"

class Fighter extends Sprite{
    constructor({ position, velocity, color = "red", attackBox, gravity, can, draw_, imageSrc, scale = 1, framesMax = 1, framesHold = 10, frameoffset = { x: 0, y: 0 }, sprites }) {
        super({ position, imageSrc, can, draw_, scale, framesMax, framesHold ,frameoffset})
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey = ''
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking = false
        this.health = 100
        this.gravity = gravity
        this.sprites = sprites
        this.dead = false

        for(const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    // draw() {
    //     // drawing players
    //     this.draw_.fillStyle = this.color;
    //     this.draw_.fillRect(this.position.x,this.position.y,this.width,this.height);

    //     // attack box
    //     if(this.isAttacking) {
    //         this.draw_.fillStyle = 'green';
    //         this.draw_.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
    //     }
    //     super.draw()
    // }


    update() {

        this.draw()

        if(!this.dead) this.animateFrame()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // player moving
        this.position.x += this.velocity.x;

        // players falling to ground
        this.position.y += this.velocity.y;
        // gravity function
        if(this.position.y + this.height + this.velocity.y >= this.can.height - 96){
            // players inertia after fall
            // this.velocity.y = - Math.floor(this.velocity.y/2)
            this.velocity.y = 0
            this.position.y = 330
        } else {
            this.velocity.y += this.gravity;
        }
    }

    attack() {
        this.isAttacking = true
        this.switchSprite('attack1')
    }

    takeHit(damage) {
        this.health -= damage
        if(this.health <= 0) {
            this.switchSprite('death')
        } else {
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite) {
        // Overiding all animations with Daeth animation
        if(
            this.image === this.sprites.death.image
        ) {
            if(this.framesCurrent === this.sprites.death.framesMax - 1)
            {
                this.dead = true
            }
            return
        }

        // Overiding all animations with Attack animation
        if(
            this.image === this.sprites.attack1.image &&
            this.framesCurrent < this.sprites.attack1.framesMax - 1
        ) return

        // Overiding all animations with Take Hit animation
        if(
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        ) return

        switch(sprite) {
            case 'idle':
                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'attack1':
                if(this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break;
            case 'death':
                if(this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break;
        }
    }
}

export default Fighter