export interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  cuisines?: string[];
  rating?: number;
  reviews?: Review[];
  isVegetarian: boolean;
}

export interface Review {
  id: string;
  userId: string;
  recipeId: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export interface RecipeDetail extends Recipe {
  instructions: string;
  extendedIngredients: {
    id: number;
    original: string;
  }[];
  readyInMinutes: number;
  servings: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  favoriteRecipes: number[];
}

export const CUISINES = [
  'African',
  'Asian',
  'American',
  'British',
  'Caribbean',
  'Chinese',
  'European',
  'French',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Thai',
  'Vietnamese'
];