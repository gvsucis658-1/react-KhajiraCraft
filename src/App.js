import React, { useState, useEffect } from 'react';
import GameForm from './components/GameForm';
import GameCard from './components/GameCard';

function App() {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = 'http://localhost:3001/games';
  const fetchOptions = {
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    },
    cache: 'no-store'
  };

  // Fetch all games with cache busting
  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}?_=${Date.now()}`, fetchOptions);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setGames(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (gameData) => {
    try {
      setLoading(true);
      const url = gameData.id ? `${API_URL}/${gameData.id}` : API_URL;
      const method = gameData.id ? 'PUT' : 'POST';
  
      console.log(`[${method}] ${url}`, gameData); // Debug log
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
      });
  
      if (!response.ok) throw new Error(gameData.id ? 'Update failed' : 'Creation failed');
  
      await fetchGames();
      setEditingGame(null);
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      console.log(`[DELETE] ${API_URL}/${id}`); // Debug log
  
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) throw new Error('Delete failed');
  
      setGames(games.filter(game => game.id !== id));
      await fetchGames();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Load games on component mount
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          My Game Collection
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            Error: {error}
          </div>
        )}

        <div className="mb-6 text-center">
          <button
            onClick={() => setEditingGame({})}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Add New Game'}
          </button>
        </div>

        {editingGame && (
          <GameForm
            game={editingGame}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingGame(null);
              setError(null);
            }}
          />
        )}

        {loading && games.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">No games found in your collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={() => setEditingGame(game)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
