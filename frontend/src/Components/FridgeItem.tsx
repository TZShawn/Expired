import React from "react";

interface IFridgeItem {
  name: string,
  expDate: string,
}

const FridgeItem: React.FC<IFridgeItem> = ({name, expDate}) => {
  return (
    <div className='m-2 flex border-2 border-gray-600'>
      <div className="flex-col m-2">
        <div className="font-semibold font-lg">{name}</div>
        <div className="text-sm text-gray-400 ">{expDate}</div>
      </div>

      <div className="flex-1" />
      <div className="p-2 bg-red-600 m-2">Delete</div>
    </div>
  )
}

export default FridgeItem