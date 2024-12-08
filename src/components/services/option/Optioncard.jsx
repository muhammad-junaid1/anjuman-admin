import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Import the Edit icon

export default function OptionsCard({ option, onEdit }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription =
    option.Longdescription.length > 300
      ? option.Longdescription.substring(0, 300) + "..."
      : option.Longdescription;

  return (
    <div className="group relative grid h-full w-full items-center justify-center rounded-xl border border-gray-300 bg-white p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img
        src={option.Image}
        className="mb-4 h-40 w-full rounded-lg object-cover"
        alt={option.name}
      />
      <h3 className="text-lg font-semibold text-gray-900">{option.name}</h3>
      <p className="mt-1 text-sm text-gray-600">{option.shortdescription}</p>
      <p className="mt-2 text-lg font-bold text-green-600">
        <span>{(option.price || 0) - ((option.price || 0) * ((option.discount || 0) / 100))}</span> <span class="line-through text-gray-900">{option.price}</span>  {option.discount && `(-${option.discount}%)`}
      </p>
      <p className="mt-3 whitespace-pre-wrap text-sm text-gray-500">
        {showFullDescription ? option.Longdescription : truncatedDescription}
        {option.Longdescription.length > 300 && (
          <button
            onClick={handleToggleDescription}
            className="ml-2 text-blue-600 underline"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event from bubbling up
          onEdit(option);
        }}
        className="absolute top-2 right-2 rounded-full bg-blue-600 p-1 text-white hover:bg-blue-700"
        aria-label="Edit"
      >
        <FaEdit size={20} />
      </button>
    </div>
  );
}
