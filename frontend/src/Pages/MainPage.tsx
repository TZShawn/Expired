import React, { useState } from "react";
import { Select } from "antd";

import ReactECharts from "echarts-for-react";
import FridgeItem from "../Components/FridgeItem";
import { useNavigate } from "react-router-dom";
import {
  useGetFridgeDataQuery,
  useUpdateUserFridgeMutation,
} from "src/Services/fridge";
import {
  useGetNewRecipeMutation,
  useGetAllRecipesQuery,
} from "src/Services/recipes";

const MainPage: React.FC<{}> = ({}) => {
  const [newGroceries, setNewGroceries] = useState<string>("");

  const userId = "shank";

  const { data, isFetching } = useGetFridgeDataQuery(userId);
  const [updateUserFridge, { isLoading }] = useUpdateUserFridgeMutation();
  const [getNewRecipe, { isLoading: newRecipeLoading }] =
    useGetNewRecipeMutation();

  const { data: allRecipes, isFetching: allRecipesFetching } =
    useGetAllRecipesQuery(["carrots", "orange", "peas", "steak"]);

  console.log(allRecipes);

  const navigate = useNavigate();

  const options = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["30%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  const HandleSubmitClick = () => {
    const dateMapper = [
      "Janurary",
      "Feburary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date();
    const formattedItems = newGroceries.split(",").map((item) => {
      return {
        name: item.trim(),
        purchaseDate:
          "" +
          dateMapper[date.getMonth()] +
          "-" +
          date.getDate() +
          "-" +
          date.getFullYear(),
      };
    });
    updateUserFridge({ username: userId, newItems: formattedItems });
  };

  const handleNewRecipe = async () => {
    const pow = await getNewRecipe("apple, carrots, orange, peas, steak")
      .unwrap()
      .then((res) => {
        return res;
      })
      .catch((e) => console.log(e));
    console.log(pow);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b-4 border-gray-200 bg-white shadow-md">
        <div className="text-2xl font-bold">AAAA</div>
        <div className="flex space-x-4">
          <div className="bg-blue-100 px-6 py-2 border border-gray-300 rounded-lg text-gray-700">
            Home
          </div>
          <div
            onClick={() => navigate("/account")}
            className="bg-blue-100 px-6 py-2 border border-gray-300 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-200 transition"
          >
            Account
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 p-4">
        <div className="w-full lg:w-1/3 p-4 border-2 rounded-lg shadow-md">
          <ReactECharts className="w-full h-full" option={options} />
        </div>

        <div className="w-full lg:w-1/3 p-4 border-2 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-4">Recipes</div>
          <div className="h-48 mb-4 border-2 rounded-lg flex items-center justify-center text-gray-500">
            Recipes here
          </div>
          <div className="flex gap-2">
            <button className="w-1/2 p-4 bg-green-400 text-center rounded-lg text-white font-semibold cursor-pointer hover:bg-green-500 transition">
              New List
            </button>
            <button
              onClick={handleNewRecipe}
              className="w-1/2 p-4 bg-green-400 text-center rounded-lg text-white font-semibold cursor-pointer hover:bg-green-500 transition"
            >
              New Recipe
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3 p-4 border-2 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-2">
            Add New Items (separated by ',')
          </div>
          <textarea
            onChange={(e) => setNewGroceries(e.target.value)}
            className="p-4 w-full h-48 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div
            onClick={HandleSubmitClick}
            className="mt-4 bg-blue-100 p-3 text-center text-lg font-semibold border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-200 transition"
          >
            Submit
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 border-t-2 border-gray-200 overflow-y-auto">
        {!isFetching &&
          data.fridge.map((item: any) => (
            <FridgeItem
              key={item.name}
              name={item.name}
              expDate={item.expiry}
            />
          ))}
      </div>
    </div>
  );
};

export default MainPage;
