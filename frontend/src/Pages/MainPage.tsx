import React, { useEffect, useMemo, useState } from "react";
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
import { RootState } from "src/store";
import { useSelector } from "react-redux";

const MainPage: React.FC<{}> = ({}) => {

  const userId = useSelector((state: RootState) => state.user.userId);

  const navigate = useNavigate()

  if (userId == '') {
    navigate('/')
  }

  const [newGroceries, setNewGroceries] = useState<string>("");
  const [recipes, setRecipes] = useState<any>([]);
  const [userInformation, setUserInformation] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalDetails, setModalDetails] = useState<Record<string, any>>({});

  const { data: userData, isFetching } = useGetFridgeDataQuery(userId);

  useEffect(() => {
    setUserInformation(userData);
  }, [userData]);

  const [updateUserFridge] = useUpdateUserFridgeMutation();
  const [getNewRecipe] = useGetNewRecipeMutation();

  const { data: allRecipes, isFetching: allRecipesFetching } =
    useGetAllRecipesQuery(["carrots", "orange", "peas", "steak"]);

  useEffect(() => {
    if (allRecipes) {
      setRecipes(allRecipes.result);
    }
  }, [allRecipes]);

  const chartData = useMemo(() => {
    const userDataFridge = userInformation?.fridge?.slice();

    const currentDate = new Date();

    let expired = 0;
    let almost = 0;
    let good = 0;

    userDataFridge?.forEach((element: any) => {
      const dateItem = new Date(element.expiry);
      const daysTillExpire = Math.floor(
        (dateItem.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
      );
      console.log(element.name, daysTillExpire);
      if (daysTillExpire <= 0) {
        ++expired;
      } else if (daysTillExpire <= 2) {
        ++almost;
      } else {
        ++good;
      }
    });

    return [
      { value: expired, name: "Expired" },
      { value: almost, name: "Almost Expired" },
      { value: good, name: "Not Expired" },
    ];
  }, [userInformation]);

  const options = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      orient: "horizontal",
      selectMode: false,
      textStyle: { fontSize: 16 },
    },
    series: [
      {
        color: ["#ee6666", "#fac858", "#91cc75"],
        name: "fridge items",
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
        data: chartData,
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
    setNewGroceries("")
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

  const handleRecipeClick = (recipe: any) => {
    setModalDetails(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalDetails({});
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b-4 border-gray-200 bg-white shadow-md">
        <div className="text-2xl font-bold">AAAA</div>
        <div className="flex space-x-4">
          <div className="bg-blue-400 px-6 py-2 border border-gray-300 rounded-lg text-gray-700">
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
          <div className="text-xl font-semibold mb-4">Overview</div>
          <ReactECharts className="w-full h-full" option={options} />
        </div>

        <div className="w-full lg:w-1/3 p-4 border-2 rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-4">Recipes</div>
          <div className="h-48 overflow-y-auto mb-4 border-2 rounded-lg p-4 text-gray-500 bg-white shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipes.map((rec: any, index: number) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50 shadow-sm text-gray-800 font-medium hover:bg-blue-50 focus:bg-blue-50 transition cursor-pointer"
                  onClick={() => handleRecipeClick(rec)}
                >
                  {rec.recipeName}
                </div>
              ))}
            </div>
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
            value={newGroceries}
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
          userData.fridge.map((item: any) => (
            <FridgeItem
              key={item.name}
              name={item.name}
              expDate={item.expiry}
              userInformation={userInformation}
              setUserInformation={setUserInformation}
            />
          ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-4xl space-y-4 shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="text-2xl font-semibold">
              {modalDetails.recipeName}
            </div>
            <div className="text-gray-600 text-lg font-bold">Ingredients:</div>
            <div className="list-disc list-inside text-gray-700 space-y-1">
              {modalDetails.ingredients?.map(
                (ingredient: string, index: number) => (
                  <div key={index}>{`- ${ingredient}`}</div>
                )
              )}
            </div>

            <div className="text-gray-600 font-bold text-lg">Recipe:</div>
            <div className="list-disc list-inside text-gray-700 space-y-1">
              {modalDetails.cookingSteps?.map((step: string, index: number) => (
                <div key={index}>{`${index + 1}: ${step}`}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
