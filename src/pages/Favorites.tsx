import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRecipeById } from '../services/api';
import { Recipe } from '../types/recipe';
import RecipeCard from '../components/RecipeCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const favoriteRecipes = await Promise.all(
          user.favoriteRecipes.map(id => getRecipeById(id))
        );
        setRecipes(favoriteRecipes);
      } catch (err) {
        setError('Failed to fetch favorite recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs currentPage="Favorite Recipes" />
      
      {recipes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            No favorite recipes yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Start exploring recipes and save your favorites!
          </p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            Your Favorite Recipes
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;