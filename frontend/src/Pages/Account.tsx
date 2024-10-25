import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileRecipeCard from "src/Components/ProfileRecipeCard";

const AccountPage: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  
  return (
<div className="h-screen overflow-hidden flex flex-col">
  <div className="flex items-center justify-between w-screen border-b-4 p-4 bg-white shadow-md">
    <div className="text-2xl font-bold">AAAA</div>
    <div className="flex space-x-4">
      <div 
        className="bg-blue-100 px-4 py-2 border border-gray-400 rounded-lg cursor-pointer hover:bg-blue-200 transition"
        onClick={(e) => navigate("/home")}
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
      <div className="border-2 border-gray-300 mx-2 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
        <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
          <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
          <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
          <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
          <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
          <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
          <ProfileRecipeCard 
            id={"abcd"}
            name="Chicken Alfredo"
            missingIngredients={["Chicken", "Cream", "Garlic", "Butter", "Parmesan", "Pasta", "Olive Oil"]}
          />
      </div>
    </div>

    <div className="space-y-4">
      <div className="text-2xl font-semibold">Your Grocery Stats</div>
      <div className="flex space-x-4">
        <div className="w-1/3 border-2 rounded-lg m-2 p-4 text-lg text-center font-semibold h-[40vh] overflow-y-auto shadow-md">
          <div className="p-2 bg-gray-50 rounded-lg">Most Bought</div>
        </div>
        <div className="w-1/3 border-2 rounded-lg m-2 p-4 text-lg text-center font-semibold h-[40vh] overflow-y-auto shadow-md">
          <div className="p-2 bg-gray-50 rounded-lg">Most Expired</div>
        </div>
        <div className="w-1/3 border-2 rounded-lg m-2 p-4 text-lg text-center font-semibold h-[40vh] overflow-y-auto shadow-md">
          <div className="p-2 bg-gray-50 rounded-lg">Recently Used</div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default AccountPage;
