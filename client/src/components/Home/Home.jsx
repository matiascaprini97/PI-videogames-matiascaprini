import Card from '../Card/Card.jsx'

const Home = ({ games, onClose }) => {
    return (
        <div >
            {games.map((game) => (
                <Card
                    key={game.id}
                    id={game.id}
                    name={game.name}
                    description={game.description}
                    rating={game.rating}
                    plataforms={game.plataforms}
                    released={game.released}
                    image={game.image}
                    onClose={onClose}
                />
            ))}
        </div>
    );
}

export default Home;