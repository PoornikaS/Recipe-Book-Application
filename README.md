# 🍳 Recipe Book

A beautiful and feature-rich recipe exploration application built with modern web technologies. Discover, save, and share your favorite recipes with ease!

![Recipe Book](https://www.bing.com/images/search?view=detailV2&ccid=bUuXqE%2fC&id=749E0960B08A6A20CFBB76F382C6F9EB909A2225&thid=OIP.bUuXqE_CEZBhB2bySia8fAHaE1&mediaurl=https%3a%2f%2fwww.snapfish.com%2fblog%2fwp-content%2fuploads%2f2022%2f01%2fcover-blog-.jpg&exph=640&expw=980&q=recipe+book+pic&simid=608012223017261379&FORM=IRPRST&ck=587E5179AB80C6116340F1FD1454CDBA&selectedIndex=7&itb=0)


## 🔗 Live Demo

[View Live Demo](https://myne-recipe-book.vercel.app/)


## ✨ Features

- 🔍 Search recipes by name, cuisine, and dietary preferences
- 🥗 Filter vegetarian and non-vegetarian recipes
- ⭐ Rate and review recipes
- ❤️ Save favorite recipes
- 🌓 Dark mode support
- 📱 Fully responsive design
- 🔐 User authentication
- 🍽️ Detailed recipe information
- 🌎 Multiple cuisine options

## 🛠️ Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **API**: Spoonacular Recipe API

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── pages/              # Application pages/routes
├── services/           # API and other services
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PoornikaS/Recipe-Book-Application.git
cd Recipe-Book-Application
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_SPOONACULAR_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.spoonacular.com/recipes
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 🌟 Key Features Explained

### Recipe Search and Filtering
- Search recipes by name
- Filter by cuisine type
- Toggle between vegetarian and non-vegetarian options
- Real-time search results

### Recipe Details
- Comprehensive recipe information
- Cooking time and servings
- Ingredients list
- Step-by-step instructions
- User ratings and reviews

### User Features
- User authentication
- Save favorite recipes
- Add ratings and reviews
- Dark mode preference

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Smooth animations and transitions


## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for recipe data
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Lucide Icons](https://lucide.dev) for beautiful icons
- [React](https://reactjs.org) and the React community


