import React, { useEffect, useState } from 'react';
import { getRandomRecipes, searchRecipes } from '../services/api';
import { Recipe, CUISINES } from '../types/recipe';
import RecipeCard from '../components/RecipeCard';
import { Search, Filter, Leaf } from 'lucide-react';

const Home = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [isVegetarian, setIsVegetarian] = useState<boolean | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchInitialRecipes = async () => {
      try {
        const data = await getRandomRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Failed to fetch recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (!isSearching) {
      fetchInitialRecipes();
    }
  }, [isSearching]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() && !selectedCuisine && isVegetarian === null) return;

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const results = await searchRecipes(searchQuery, selectedCuisine, isVegetarian);
      setRecipes(results);
    } catch (err) {
      setError('Failed to search recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCuisine('');
    setIsVegetarian(null);
    setIsSearching(false);
  };

  const filteredRecipes = recipes.filter(recipe => {
    if (isVegetarian === null) return true;
    return recipe.isVegetarian === isVegetarian;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Discover Delicious Recipes
        </h1>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="w-full sm:w-auto">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                >
                  <option value="">All Cuisines</option>
                  {CUISINES.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setIsVegetarian(true)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isVegetarian === true
                    ? 'bg-green-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                <Leaf className="w-4 h-4" />
                Vegetarian
              </button>
              <button
                type="button"
                onClick={() => setIsVegetarian(false)}
                className={`px-4 py-2 rounded-lg ${
                  isVegetarian === false
                    ? 'bg-orange-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                }`}
              >
                Non-Vegetarian
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Search
              </button>
              {isSearching && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;