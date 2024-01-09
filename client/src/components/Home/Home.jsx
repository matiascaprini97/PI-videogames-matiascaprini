import Card from '../Card/Card.jsx'

const Home = ({ games, onClose }) => {
    return (
        <div >
            {games.map((games) => (
                <Card
                    key={games.id}
                    id={games.id}
                    name={games.name}
                    description={games.description}
                    rating={games.rating}
                    plataforms={games.plataforms}
                    released={game.released}
                    image={games.image}
                    onClose={onClose}
                />
            ))}
        </div>
    );
}

export default Home;