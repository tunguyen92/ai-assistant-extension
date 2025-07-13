import React from 'react';

interface HeaderProps {
  title: string;
  count: number;
  onRemove: () => void;
}

const Header = ({ title, count, onRemove }: HeaderProps) => {
  return (
    <div className="px-4 py-3 border-b flex items-center justify-between">
      <h2 className="text-lg font-bold text-foreground m-4">
        {title} <span className="text-sm">({count})</span>
      </h2>
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-md text-gray-500 hover:bg-amber-50"
          onClick={onRemove}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Header;
