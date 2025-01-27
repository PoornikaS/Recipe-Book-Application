import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  currentPage: string;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ currentPage }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
      <Link to="/" className="flex items-center hover:text-orange-500">
        <Home className="h-4 w-4" />
        <span className="ml-1">Home</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-gray-900 dark:text-white font-medium">{currentPage}</span>
    </nav>
  );
};

export default Breadcrumbs;