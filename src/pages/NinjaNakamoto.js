import React, { useRef, useEffect, useState } from 'react'
import useGame from '../hooks/useGame'
import useUtils from '../hooks/useUtils'

function NinjaNakamoto(props) {

    const canva = useRef(null)

    const [initGame,clearTime,gameClose] = useGame({ canva })

    useEffect(() => {
        initGame()
        return (() => {
            clearTime()
            gameClose()
        })
    })

    return (
        <div style={{height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor: 'black'}}>
            <div style={{position: 'relative',display: 'inline-block', boxSizing: 'border-box'}}>
                <div style={{position: 'absolute',display: 'flex',width: '100%', alignItems: 'center',padding: '20px', boxSizing: 'border-box'}}>

                    {/* Player Health */}
                    <div style={{position:'relative',height: '30px',width: '100%',display: 'flex',justifyContent: 'flex-end', border: '4px solid white', borderRight: 'none'}}>
                        <div style={{backgroundColor: 'red',height: '30px',width: '100%'}}></div>
                        <div id="player-health" style={{position:'absolute',backgroundColor: '#818CF8',height: '30px',top: '0', right: '0', bottom: '0',width: '100%'}}></div>
                    </div>

                    {/* Timer */}
                    <div id="timer" style={{backgroundColor: 'black', color: 'white', width: '100px', height: '50px', flexShrink: '0',display: 'flex',alignItems: 'center',justifyContent: 'center', border: '4px solid white', fontFamily: '"Press Start 2P", cursive'}}>
                        10
                    </div>

                    {/* Enemy Health */}
                    <div style={{position:'relative',height: '30px',width: '100%', border: '4px solid white', borderLeft: 'none'}}>
                        <div style={{backgroundColor: 'red',height: '30px'}}></div>
                        <div id="enemy-health" style={{position:'absolute',backgroundColor: '#818CF8',height: '30px',top: '0',left: '0', right: '0', bottom: '0'}}></div>
                    </div>
                </div>
                <div id="displayText" style={{position:'absolute',color: 'white',display: 'none',alignItems: 'center',justifyContent: 'center',top: '0',left: '0', right: '0', bottom: '0', fontFamily: '"Press Start 2P", cursive', fontSize: '3rem'}}></div>
                <canvas ref={canva}>
                </canvas>
            </div>
        </div>
    )
}

export default NinjaNakamoto