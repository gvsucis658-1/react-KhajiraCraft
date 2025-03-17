import React, { useState } from 'react';
import GameForm from './components/GameForm';
import GameCard from './components/GameCard';


const initialGames = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    genre: "Action-Adventure",
    platforms: ["Switch"],
    releaseYear: 2017,
    rating: 4.2,
    completed: true,
    multiplayer: false
  },
  {
    id: 2,
    title: "Elden Ring",
    genre: "Action RPG",
    platforms: ["PS5", "Xbox", "PC"],
    releaseYear: 2022,
    rating: 4.8,
    completed: false,
    multiplayer: true
  },
  {
    id: 3,
    title: "Stardew Valley",
    genre: "Simulation",
    platforms: ["Switch", "PC", "PS4", "Xbox", "Mobile"],
    releaseYear: 2016,
    rating: 4.7,
    completed: true,
    multiplayer: true
  },
  {
    id: 4,
    title: "Resident Evil 4",
    genre: "Survival Horror",
    platforms: ["PS5", "Xbox", "PC"],
    releaseYear: 2023,
    rating: 4.6,
    completed: false,
    multiplayer: false
  },
  {
    id: 5,
    title: "Hollow Knight",
    genre: "Metroidvania",
    platforms: ["Switch", "PC", "PS4", "Xbox"],
    releaseYear: 2017,
    rating: 3.8,
    completed: true,
    multiplayer: false
  },
  {
    id: 6,
    title: "Sid Meier’s Civilization VI",
    genre: "Strategy",
    platforms: ["PC", "Switch", "PS4", "Xbox"],
    releaseYear: 2016,
    rating: 4.5,
    completed: false,
    multiplayer: true
  },
  {
    id: 7,
    title: "Rocket League",
    genre: "Sports",
    platforms: ["PS4", "Xbox", "PC", "Switch"],
    releaseYear: 2015,
    rating: 4.3,
    completed: false,
    multiplayer: true
  },
  {
    id: 8,
    title: "Undertale",
    genre: "RPG",
    platforms: ["PC", "PS4", "Switch"],
    releaseYear: 2015,
    rating: 4.9,
    completed: true,
    multiplayer: false
  },
];


function App() {
  const [games, setGames] = useState(initialGames);
  const [editingGame, setEditingGame] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Add or Update game
  const handleSubmit = (gameData) => {
    if (gameData.id) {
      // Update existing game
      setGames(games.map(game => 
        game.id === gameData.id ? gameData : game
      ));
    } else {
      // Add new game
      setGames([...games, { ...gameData, id: Date.now() }]);
    }
    setShowForm(false);
    setEditingGame(null);
  };

  // Delete game
  const handleDelete = (id) => {
    setGames(games.filter(game => game.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          GameHorizon
        </h1>

        <div className="mb-6 text-center">
          <button 
            onClick={() => setShowForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Add New Game
          </button>
        </div>

        {(showForm || editingGame) && (
          <GameForm
            game={editingGame}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingGame(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              onEdit={setEditingGame}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;