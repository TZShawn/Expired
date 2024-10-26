import React from "react";

interface IProfileRecipeCard {
  id: string;
  name: string;
  missingIngredients: string[];
}

const ProfileRecipeCard: React.FC<IProfileRecipeCard> = ({
  id,
  name,
  missingIngredients,
}) => {
  const displayedIngredients = missingIngredients.slice(0, 5);
  const remainingIngredientsCount = missingIngredients.length - 5;

  return (
    <div className="border-2 border-gray-300 h-32 cursor-pointer rounded-lg p-4 shadow-md bg-white mb-4">
      <div className="text-lg font-semibold mb-2 text-gray-800">{name}</div>

      <div className="text-gray-600">
        {displayedIngredients.map((ingredient, index) => (
          <div
            key={index}
            className="text-sm inline-block bg-gray-100 rounded px-2 py-1 m-1"
          >
            {ingredient}
          </div>
        ))}

        {remainingIngredientsCount > 0 && (
          <div className="text-sm text-gray-500 mt-1">
            +{remainingIngredientsCount} more missing ingredients
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileRecipeCard;
