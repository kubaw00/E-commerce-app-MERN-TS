import React from 'react';

interface RatingProps {
  value: number;
  text: string;
  color?: string;
}

export const Rating: React.FC<RatingProps> = ({ value, text, color }) => {
  return (
    <div>
      {[0, 1, 2, 3, 4].map((num) => (
        <span key={num}>
          <i
            className={
              value >= num + 1
                ? 'fas fa-star'
                : value >= num + 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            style={{ color }}
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
};
