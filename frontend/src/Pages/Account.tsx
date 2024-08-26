import React from "react";
import { useNavigate } from "react-router-dom";

const AccountPage: React.FC<{}> = ({}) => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen overflow-hidden">
      <div className="flex w-screen border-b-4">
        <div>AAAA</div>
        <div className="flex-1"></div>
        <div
          className="bg-blue-100 px-4 py-3 border border-gray-400"
          onClick={(e) => navigate("/home")}
        >
          Home
        </div>
        <div className="bg-blue-100 px-2 py-3 border border-gray-400">
          Account
        </div>
      </div>

      <div className="m-10  border-gray-500">
        <div className="text-4xl font-bold p-6">Your Account</div>
        <div className="text 2xl font-semibold p-6">Your saved recipes</div>
        <div className="border-2 border-gray-300 h-32 mx-6">Recipes</div>

        <div className="text-2xl font-semibold p-6">Your Grocery Stats</div>
        <div className="flex mx-6">
          <div className="w-1/3 border-2 m-2 text-lg text-center font-semibold h-[40vh]">
            <div className="p-2">Most bought</div>
          </div>
          <div className="w-1/3 border-2 m-2 text-lg text-center font-semibold h-[40vh]">
            <div className="p-2">Most expired</div>
          </div>
          <div className="w-1/3 border-2 m-2 text-lg text-center font-semibold h-[40vh]">
            <div className="p-2">Recently Used</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
