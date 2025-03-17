import React, { useState, useEffect } from 'react';

const GameForm = ({ game, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: 'Action',
    platforms: [],
    releaseYear: new Date().getFullYear(),
    rating: 3.0,
    completed: false,
    multiplayer: false
  });

  useEffect(() => {
    if (game) {
      setFormData(game);
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlatformChange = (e) => {
    const platform = e.target.value;
    setFormData(prev => ({
      ...prev,
      platforms: e.target.checked
        ? [...prev.platforms, platform]
        : prev.platforms.filter(p => p !== platform)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      rating: parseFloat(formData.rating)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        {game ? 'Edit Game' : 'Add New Game'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Game Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option>Action</option>
              <option>Adventure</option>
              <option>RPG</option>
              <option>Strategy</option>
              <option>Sports</option>
            </select>
          </div>

          {/* Release Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Release Year</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1970"
              max={new Date().getFullYear()}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              {[3.0, 3.5, 4.0, 4.5, 5.0].map(value => (
                <option key={value} value={value}>{value}/5</option>
              ))}
            </select>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium mb-2">Platforms</label>
            <div className="flex flex-wrap gap-3">
              {['PC', 'PS5', 'Xbox', 'Switch'].map(platform => (
                <label key={platform} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={platform}
                    checked={formData.platforms.includes(platform)}
                    onChange={handlePlatformChange}
                    className="h-4 w-4"
                  />
                  <span>{platform}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Completed
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="multiplayer"
                checked={formData.multiplayer}
                onChange={handleChange}
                className="h-4 w-4"
              />
              Multiplayer
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {game ? 'Update Game' : 'Add Game'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameForm;