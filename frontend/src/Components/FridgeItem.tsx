import React from "react";

interface IFridgeItem {
  name: string,
  expDate: string,
}

const FridgeItem: React.FC<IFridgeItem> = ({name, expDate}) => {
  return (
  <div className="m-2 flex items-center border-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
    <div className="flex flex-col">
      <div className="text-lg font-semibold text-gray-700">{name}</div>
      <div className="text-sm text-gray-500">Expires: {expDate}</div>
    </div>

    <div className="flex-1" />

    <div 
      onClick={(e) => {console.log("Delete")}} 
      className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition"
    >
      Delete
    </div>
  </div>
  )
}

export default FridgeItem