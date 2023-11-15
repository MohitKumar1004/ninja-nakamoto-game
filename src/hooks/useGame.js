import { gsap } from 'gsap'

// Classes
import Fighter from '../classes/Fighter';
import Sprite from '../classes/Sprite';

// Background Images
import backSrc from '../img/background.png'
import shopSrc from '../img/shop.png'

// Player Animations
import idlePlayerSrc from '../img/samuraiMack/Idle.png'
import runPlayerSrc from '../img/samuraiMack/Run.png'
import jumpPlayerSrc from '../img/samuraiMack/Jump.png'
import fallPlayerSrc from '../img/samuraiMack/Fall.png'
import deathPlayerSrc from '../img/samuraiMack/Death.png'
import attack1PlayerSrc from '../img/samuraiMack/Attack1.png'
import takeHitPlayerSrc from '../img/samuraiMack/TakeHit.png'

// Enemy Animations
import idleEnemySrc from '../img/kenji/Idle.png'
import runEnemySrc from '../img/kenji/Run.png'
import jumpEnemySrc from '../img/kenji/Jump.png'
import fallEnemySrc from '../img/kenji/Fall.png'
import deathEnemySrc from '../img/kenji/Death.png'
import attack1EnemySrc from '../img/kenji/Attack1.png'
import takeHitEnemySrc from '../img/kenji/TakeHit.png'

import useUtils from './useUtils';

export default function useGame({ canva }) {

    const [rectangleCollision,determineWinner,decreaseTimer,clearTime] = useUtils()

    let gameRunning = true

    const gameClose = () => gameRunning = false

    const initGame = () => {
        canva.current.width = 1024;
        canva.current.height = 576;

        const gravity = .7;

        const can = canva.current;
        const draw_ = can.getContext("2d");

        const background = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: backSrc,
            can,
            draw_
        })

        const shop = new Sprite({
            position: {
                x: 600,
                y: 128
            },
            imageSrc: shopSrc,
            can,
            draw_,
            scale: 2.75,
            framesMax: 6,
            framesHold: 5
        })

        // Creating player
        const player = new Fighter({
            position: {
                x: can.width/4-75,
                y: 100
            },
            velocity: {
                x: 0,
                y: 0
            },
            color: 'blue',
            attackBox: {
                offset: {
                    x: 30,
                    y: -25
                },
                width: 225,
                height: 175
            },
            imageSrc: idlePlayerSrc,
            framesMax: 8,
            framesHold: 20,
            scale: 2.5,
            frameoffset: {
                x: 215,
                y: 152
            },
            sprites: {
                idle: {
                    imageSrc: idlePlayerSrc,
                    framesMax: 8,
                },
                run: {
                    imageSrc: runPlayerSrc,
                    framesMax: 8,
                },
                jump: {
                    imageSrc: jumpPlayerSrc,
                    framesMax: 2    ,
                },
                death: {
                    imageSrc: deathPlayerSrc,
                    framesMax: 6,
                },
                fall: {
                    imageSrc: fallPlayerSrc,
                    framesMax: 2,
                },
                attack1: {
                    imageSrc: attack1PlayerSrc,
                    framesMax: 6,
                },
                takeHit: {
                    imageSrc: takeHitPlayerSrc,
                    framesMax: 4
                }
            },
            gravity,
            can,
            draw_
        });

        // Creating enemy
        const enemy = new Fighter({
            position: {
                x: 3*can.width/4,
                y: 100
            },
            velocity: {
                x: 0,
                y: 0
            },
            color: 'red',
            attackBox: {
                offset: {
                    x: -175,
                    y: 0
                },
                width: 215,
                height: 150
            },
            imageSrc: idleEnemySrc,
            framesMax: 4,
            framesHold: 20,
            scale: 2.5,
            frameoffset: {
                x: 215,
                y: 166
            },
            sprites: {
                idle: {
                    imageSrc: idleEnemySrc,
                    framesMax: 4,
                },
                run: {
                    imageSrc: runEnemySrc,
                    framesMax: 8,
                },
                jump: {
                    imageSrc: jumpEnemySrc,
                    framesMax: 2,
                },
                death: {
                    imageSrc: deathEnemySrc,
                    framesMax: 7,
                },
                fall: {
                    imageSrc: fallEnemySrc,
                    framesMax: 2,
                },
                attack1: {
                    imageSrc: attack1EnemySrc,
                    framesMax: 4,
                },
                takeHit: {
                    imageSrc: takeHitEnemySrc,
                    framesMax: 3
                }
            },
            gravity,
            can,
            draw_
        });

        const keys = {
            a: {
                pressed: false
            },
            d: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            }
        }

        decreaseTimer({ player, enemy });

        // Creating function for animation frames
        const animate = () => {
            if(!gameClose) return
            window.requestAnimationFrame(animate);
            draw_.fillStyle = 'black'
            draw_.fillRect(0, 0, can.width, can.height);
            background.update()
            shop.update()
            draw_.fillStyle = 'rgba(255, 255, 255, 0.15)';
            draw_.fillRect(0, 0, can.width, can.height)
            player.update()
            enemy.update()
            player.velocity.x = 0
            enemy.velocity.x = 0

            // Player Movements
            
            if(keys.a.pressed && player.lastKey === 'a') {
                player.velocity.x = -5;
                player.switchSprite('run')
            } else if(keys.d.pressed && player.lastKey === 'd') {
                player.velocity.x = 5;
                player.switchSprite('run')
            } else {
                player.switchSprite('idle')
            }

            if(player.velocity.y > 0) {
                player.switchSprite('jump')
            } else if(player.velocity.y < 0) {
                player.switchSprite('fall')
            }

            // Enemy Movements
            if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
                enemy.velocity.x = -5;
                enemy.switchSprite('run')
            } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
                enemy.velocity.x = 5;
                enemy.switchSprite('run')
            } else {
                enemy.switchSprite('idle')
            }

            if(enemy.velocity.y > 0) {
                enemy.switchSprite('jump')
            } else if(enemy.velocity.y < 0) {
                enemy.switchSprite('fall')
            }

            // Player Detect for collision
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: enemy
                }) &&
                // Attack State
                player.isAttacking && player.framesCurrent === 4
                ) {
                    enemy.takeHit(8)
                    player.isAttacking = false
                    // document.querySelector('#enemy-health').style.width = `${enemy.health}%`;
                    gsap.to('#enemy-health', {
                        width: `${enemy.health}%`
                    })
            }

            if(player.isAttacking && player.framesCurrent === 4) {
                player.isAttacking = false
            }

            // Enemy Detect for collision
            if(
                rectangleCollision({
                    rectangle1: enemy,
                    rectangle2: player
                }) &&
                // Attack State
                enemy.isAttacking && enemy.framesCurrent === 1
                ) {
                    player.takeHit(4)
                    enemy.isAttacking = false
                    // document.querySelector('#player-health').style.width = `${player.health}%`;
                    gsap.to('#player-health', {
                        width: `${player.health}%`
                    })
            }

            if(enemy.isAttacking && enemy.framesCurrent === 2) {
                enemy.isAttacking = false
            }

            if(enemy.health<=0 || player.health<=0) {
                determineWinner({ player, enemy, gameRunning })
            }
        }

        // Calling animation frames
        animate()

        window.addEventListener('keydown', (evt) => {
            if(!player.dead) {
                switch(evt.key) {
                    // Start Player Movement
                    case 'a':
                        keys.a.pressed = true;
                        player.lastKey = evt.key;
                        break;
                    case 'd': 
                        keys.d.pressed = true;
                        player.lastKey = evt.key;
                        break;
                    case 'w': 
                        player.velocity.y = -15;
                        break;
                    case 'x':
                        if(player.image !== player.sprites.attack1.image) {
                            player.attack()
                        }
                        break;
                }
            }
            if(!enemy.dead) {
                switch(evt.key) {
                    // Start Enemy Movement
                    case 'ArrowRight':
                        keys.ArrowRight.pressed = true;
                        enemy.lastKey = evt.key;
                        break;
                    case 'ArrowLeft': 
                        keys.ArrowLeft.pressed = true;
                        enemy.lastKey = evt.key;
                        break;
                    case 'ArrowUp': 
                        enemy.velocity.y = -15;
                        break;
                    case ' ': 
                        if(enemy.image !== enemy.sprites.attack1.image) {
                            enemy.attack()
                        }
                        break;
                }
            }
        })
        window.addEventListener('keyup', (evt) => {
            switch(evt.key) {
                // Stop Player Movement
                case 'a':
                    keys.a.pressed = false;
                    break;
                case 'd': 
                    keys.d.pressed = false;
                    break;

                // Stop Enemy Movement
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false;
                    break;
                case 'ArrowLeft': 
                    keys.ArrowLeft.pressed = false;
                    break;
            }
        })
    }

    return [initGame,clearTime,gameClose]
}