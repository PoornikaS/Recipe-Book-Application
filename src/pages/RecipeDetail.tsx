import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import { RecipeDetail as RecipeDetailType, Review } from '../types/recipe';
import { Clock, Users, ChevronLeft, Heart, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Rating from '../components/Rating';
import Breadcrumbs from '../components/Breadcrumbs';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleFavorite } = useAuth();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  const isFavorite = user?.favoriteRecipes.includes(Number(id));

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const data = await getRecipeById(parseInt(id));
        setRecipe(data);
        // In a real app, we would fetch reviews from the backend
        setReviews(data.reviews || []);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !recipe) return;

    const newReview: Review = {
      id: Date.now().toString(),
      userId: user.id,
      recipeId: recipe.id,
      rating: userRating,
      comment,
      createdAt: new Date().toISOString(),
      user: {
        name: user.name
      }
    };

    setReviews([newReview, ...reviews]);
    setUserRating(0);
    setComment('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs currentPage={recipe.title} />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-80 object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {recipe.isVegetarian && (
              <div className="bg-green-500 p-2 rounded-full">
                <Leaf className="w-5 h-5 text-white" />
              </div>
            )}
            {user && (
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className={`p-3 rounded-full ${
                  isFavorite 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300'
                } hover:scale-110 transition-transform`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{recipe.title}</h1>

          <div className="flex items-center space-x-6 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-5 h-5 mr-2" />
              <span>{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 mr-2" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Description</h2>
            <div 
              className="text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: recipe.summary }} 
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="text-gray-600 dark:text-gray-300">
                  {ingredient.original}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Instructions</h2>
            <div
              className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </div>

          {/* Reviews Section */}
          <div className="border-t dark:border-gray-700 pt-8">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Reviews</h2>
            
            {user ? (
              <form onSubmit={handleSubmitReview} className="mb-8">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Rating
                  </label>
                  <Rating value={userRating} onChange={setUserRating} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    rows={4}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Please <a href="/login" className="text-orange-500 hover:text-orange-600">login</a> to leave a review.
              </p>
            )}

            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b dark:border-gray-700 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-800 dark:text-white">
                      {review.user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <Rating value={review.rating} readonly />
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;