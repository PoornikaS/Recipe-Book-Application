import axios from 'axios';
import { Recipe, RecipeDetail } from '../types/recipe';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const getRandomRecipes = async (number: number = 12): Promise<Recipe[]> => {
  try {
    const response = await api.get('/random', {
      params: { 
        number,
        addRecipeInformation: true
      },
    });
    return response.data.recipes.map((recipe: any) => ({
      ...recipe,
      isVegetarian: recipe.vegetarian || false,
      rating: recipe.spoonacularScore ? recipe.spoonacularScore / 20 : undefined // Convert to 5-star scale
    }));
  } catch (error) {
    console.error('Error fetching recipes:', error instanceof Error ? error.message : String(error));
    throw new Error('Failed to fetch recipes');
  }
};

export const searchRecipes = async (
  query: string, 
  cuisine?: string,
  isVegetarian?: boolean | null
): Promise<Recipe[]> => {
  try {
    const response = await api.get('/complexSearch', {
      params: {
        query,
        cuisine,
        diet: isVegetarian ? 'vegetarian' : undefined,
        addRecipeInformation: true,
        number: 12,
      },
    });
    return response.data.results.map((recipe: any) => ({
      ...recipe,
      isVegetarian: recipe.vegetarian || false,
      rating: recipe.spoonacularScore ? recipe.spoonacularScore / 20 : undefined
    }));
  } catch (error) {
    console.error('Error searching recipes:', error instanceof Error ? error.message : String(error));
    throw new Error('Failed to search recipes');
  }
};

export const getRecipeById = async (id: number): Promise<RecipeDetail> => {
  try {
    const response = await api.get(`/${id}/information`);
    return {
      ...response.data,
      isVegetarian: response.data.vegetarian || false,
      rating: response.data.spoonacularScore ? response.data.spoonacularScore / 20 : undefined
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error instanceof Error ? error.message : String(error));
    throw new Error('Failed to fetch recipe details');
  }
};
