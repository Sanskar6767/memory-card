import './card-wrapper.css';

export default function CardWrapper({
    cards,
    handleScore
}) {
    return (
        <div className='card-wrapper'>
            {cards.map((card) => (
                <Card key={card.id} card={card} onClick={handleScore}/>
            ))}
        </div>
    )
}

function Card({
    card,
    onClick
}) {
    return (
        <div className='card' onClick={() => onClick(card.id)}>
                <img src={card.image} alt={card.name} />
                <div className='card-name'>
                    <h3>{card.name}</h3>
                </div>
        </div>
    )
}
