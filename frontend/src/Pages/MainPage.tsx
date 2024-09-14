import React, { useState } from "react";
import { Select } from "antd";

import ReactECharts from "echarts-for-react";
import FridgeItem from "../Components/FridgeItem";
import { useNavigate } from "react-router-dom";
import { useGetFridgeDataQuery, useUpdateUserFridgeMutation } from "src/Services/fridge";
import { useGetNewRecipeMutation, useGetAllRecipesQuery } from "src/Services/recipes";

const MainPage: React.FC<{}> = ({}) => {

  const [newGroceries, setNewGroceries] = useState<string>("")

  const userId = 'shank'

  const { data, isFetching } = useGetFridgeDataQuery(userId)
  const [updateUserFridge, {isLoading}] = useUpdateUserFridgeMutation()
  const [getNewRecipe, {isLoading: newRecipeLoading} ] = useGetNewRecipeMutation()


  const {data: allRecipes, isFetching: allRecipesFetching} = useGetAllRecipesQuery(['carrots', 'orange', 'peas', 'steak'])

  console.log(allRecipes)

  const navigate = useNavigate()

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
    const dateMapper = ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    const date = new Date()
    const formattedItems = newGroceries.split(',').map(item => {return {"name": item.trim(), "purchaseDate": "" + dateMapper[date.getMonth()] + "-" + date.getDate() + "-" + date.getFullYear()}})
    updateUserFridge({"username": userId, "newItems": formattedItems})
  }

  const handleNewRecipe = async () => {
    const pow = await getNewRecipe("apple, carrots, orange, peas, steak").unwrap().then(res => {return res}).catch(e => console.log(e))
    console.log(pow)
  }

  return (
<div className="w-screen h-screen overflow-hidden flex flex-col">
  <div className="flex items-center border-b-4 p-2">
    <div className="flex-1 text-left">AAAA</div>
    <div className="bg-blue-100 px-4 py-3 border border-gray-400 mx-2">Home</div>
    <div onClick={() => navigate('/account')} className="bg-blue-100 px-4 py-3 border border-gray-400 cursor-pointer">
      Account
    </div>
  </div>

  <div className="flex flex-col lg:flex-row mx-4 my-4 border border-b-2">
    <div className="w-full lg:w-1/3 border-2 p-2">
      <ReactECharts className="w-full h-full" option={options} />
    </div>
    <div className="w-full lg:w-1/3 p-2">
      <div className="pt-2 text-lg font-bold">Recipes</div>
      <div className="h-48 my-2 border-2">Recipes here</div>
      <div className="flex flex-col lg:flex-row w-full bg-red-500 mt-2">
        <div className="w-full lg:w-1/2 p-2 bg-green-400 text-center border-2">New List</div>
        <div onClick={handleNewRecipe} className="w-full lg:w-1/2 p-2 bg-green-400 text-center border-2 cursor-pointer">New Recipe</div>
      </div>
    </div>
    <div className="w-full lg:w-1/3 p-2">
      <div className="py-2 text-lg font-bold">Add new items separated by ','</div>
      <textarea onChange={(e) => setNewGroceries(e.target.value)} className="p-2 w-full h-48 border-2 border-gray-400 resize-none" />
      <div onClick={HandleSubmitClick} className="bg-gray-200 p-2 border-2 border-gray-400 text-center hover:cursor-pointer text-lg font-semibold mt-2">
        Submit
      </div>
    </div>
  </div>

  <div className="flex-1 border border-gray-200 m-4 overflow-y-auto">
    {!isFetching && data.fridge.map((item: any) => <FridgeItem key={item.name} name={item.name} expDate={item.expiry} />)}
  </div>
</div>
  );
};

export default MainPage;
