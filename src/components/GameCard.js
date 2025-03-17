import React from 'react';

const GameCard = ({ game, onEdit, onDelete }) => {
  const ratingColor = game.rating >= 4.5 ? 'bg-green-500' :
                     game.rating >= 4.0 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-800">{game.title}</h2>
          <span className={`${ratingColor} text-white text-sm px-3 py-1 rounded-full`}>
            {game.rating}/5
          </span>
        </div>

        <div className="space-y-2 text-gray-600">
          <p><span className="font-semibold">Genre:</span> {game.genre}</p>
          <p><span className="font-semibold">Released:</span> {game.releaseYear}</p>
          <p><span className="font-semibold">Platforms:</span> {game.platforms.join(', ')}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm ${
              game.multiplayer ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {game.multiplayer ? 'Multiplayer' : 'Single Player'}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${
              game.completed ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {game.completed ? 'Completed' : 'In Progress'}
            </span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(game)}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit
            </button>
            <button 
              onClick={() => onDelete(game.id)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;