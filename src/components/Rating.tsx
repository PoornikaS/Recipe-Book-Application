import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, onChange, readonly = false }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && onChange?.(star)}
          disabled={readonly}
          className={`${
            readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          } transition-transform`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= value
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-transparent text-gray-300 dark:text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating;