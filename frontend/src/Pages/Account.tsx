import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileRecipeCard from "src/Components/ProfileRecipeCard";

const AccountPage: React.FC<{}> = ({}) => {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>({});

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <div className="flex items-center justify-between w-screen border-b-4 p-4 bg-white shadow-md">
        <div className="text-2xl font-bold">AAAA</div>
        <div className="flex space-x-4">
          <div
            className="bg-blue-100 px-4 py-2 border border-gray-400 rounded-lg cursor-pointer hover:bg-blue-200 transition"
            onClick={() => navigate("/home")}
          >
            Home
          </div>
          <div className="bg-blue-100 px-4 py-2 border border-gray-400 rounded-lg">
            Account
          </div>
        </div>
      </div>

      <div className="m-10 space-y-10">
        <div className="text-4xl font-bold">Your Account</div>

        <div className="space-y-4">
          <div className="text-2xl font-semibold">Your Saved Recipes</div>

          <div className="border-2 border-gray-300 mx-6 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
            {[
              {
                id: "abcd",
                name: "Chicken Alfredo",
                missingIngredients: [
                  "Chicken",
                  "Cream",
                  "Garlic",
                  "Butter",
                  "Parmesan",
                  "Pasta",
                  "Olive Oil",
                ],
              },
              {
                id: "efgh",
                name: "Spaghetti Bolognese",
                missingIngredients: [
                  "Tomato",
                  "Garlic",
                  "Onion",
                  "Ground Beef",
                  "Basil",
                ],
              },
              {
                id: "ijkl",
                name: "Beef Tacos",
                missingIngredients: [
                  "Tortilla",
                  "Ground Beef",
                  "Cheese",
                  "Sour Cream",
                  "Lettuce",
                  "Tomato",
                ],
              },
            ].map((recipe) => (
              <div onClick={() => handleRecipeClick(recipe)} key={recipe.id}>
                <ProfileRecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  missingIngredients={recipe.missingIngredients}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-2xl font-semibold">Your Grocery Stats</div>
          <div className="flex space-x-4">
            <div className="w-1/3 border-2 rounded-lg m-2 p-4 text-lg text-center font-semibold h-[40vh] shadow-md">
              <div className="p-2 bg-gray-50 rounded-lg">Most Bought</div>
            </div>
            <div className="w-1/3 border-2 rounded-lg m-2 p-4 text-lg text-center font-semibold h-[40vh] shadow-md">
              <div className="p-2 bg-gray-50 rounded-lg">Most Expired</div>
            </div>
            <div className="w-1/3 border-2 rounded-lg m-2 p-4 text-lg text-center font-semibold h-[40vh] shadow-md">
              <div className="p-2 bg-gray-50 rounded-lg">Recently Used</div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRecipe && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4 shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-2xl font-semibold">{selectedRecipe.name}</div>
            <div className="text-gray-600">Missing Ingredients:</div>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {selectedRecipe.missingIngredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
