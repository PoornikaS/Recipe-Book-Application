import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
      <Link to="/" className="flex items-center hover:text-orange-500">
        <Home className="h-4 w-4" />
        <span className="ml-1">Home</span>
      </Link>
      
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        let displayName = name;
        if (name === 'recipe') displayName = 'Recipe';
        else if (name === 'favorites') displayName = 'Favorites';
        
        return (
          <React.Fragment key={name}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {displayName}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-orange-500"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
