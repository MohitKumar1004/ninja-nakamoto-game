export default function useUtils() {

    let timer = 60
    let timerId

    const clearTime = () => clearTimeout(timerId)

    const rectangleCollision = ({ rectangle1, rectangle2 }) => {
        return (
            // Forward
            rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
            // Backward
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
            // Top
            rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
            // Backward
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
        )
    }

    const determineWinner = ({ player, enemy ,gameRunning }) => {

        clearTimeout(timerId)

        if(!gameRunning) return

        document.querySelector('#displayText').style.display = 'flex';
        
        if(player.health === enemy.health) {
            player.switchSprite('death')
            enemy.switchSprite('death')
            document.querySelector('#displayText').innerHTML = 'Tie';
        } else if(player.health > enemy.health) {
            enemy.switchSprite('death')
            document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
        } else {
            player.switchSprite('death')
            document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
        }
    }

    const decreaseTimer = ({ player, enemy, windowFocus, gameRunning }) => {
        if(timer>0) {
            timer--
            timerId = setTimeout(() => decreaseTimer({ player, enemy, timer, timerId, windowFocus }), 1000)
            if(document.querySelector('#timer')) {
                document.querySelector('#timer').innerHTML = timer;
            }
        }

        if(timer === 0) {
            determineWinner({ player, enemy, gameRunning })
        }
    }

    return [rectangleCollision,determineWinner,decreaseTimer,clearTime]
}
