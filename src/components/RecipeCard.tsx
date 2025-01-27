import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/recipe';
import { Clock, Users, Heart, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Rating from './Rating';

interface Props {
  recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favoriteRecipes.includes(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      toggleFavorite(recipe.id);
    }
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-200 group-hover:scale-105 relative">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {recipe.isVegetarian && (
              <div className="bg-green-500 p-2 rounded-full">
                <Leaf className="w-4 h-4 text-white" />
              </div>
            )}
            <button
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300'
              } hover:scale-110 transition-transform`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
            {recipe.title}
          </h3>
          {recipe.rating && (
            <div className="mb-2">
              <Rating value={recipe.rating} readonly />
            </div>
          )}
          <p 
            className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;