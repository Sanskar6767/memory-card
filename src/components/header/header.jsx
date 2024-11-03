import './header.css';

export default function Header({ score, bestScore }) {
    return (
        <div className='header'>
            <h1>Memory Game</h1>
            <div className= 'score-container'>
                <p>Score: {score}</p>
                <p>Best Score: {bestScore}</p>
            </div>
        </div>
    )
}
