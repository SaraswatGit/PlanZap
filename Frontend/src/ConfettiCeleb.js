import React from 'react'
import Confetti from 'react-confetti'

export default function ConfettiCeleb() {
    const confetti = {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
    }

    return (
        <div style={confetti}>
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
              
                opacity={0.9}
                gravity={0.4}
            />
        </div>
    )
}
