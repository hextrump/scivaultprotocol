import React, { FC } from "react";

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({ 
  placeholder, 
  value, 
  onChange, 
  onSearch
}) => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex w-full md:w-1/2 gap-2">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-2 border border-gray-400 bg-white rounded-md flex-1 text-black placeholder-gray-500"
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md whitespace-nowrap"
        >
          Search
        </button>
      </div>
    </div>
  );
};
