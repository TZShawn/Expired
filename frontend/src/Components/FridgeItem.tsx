import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useReplaceUserFridgeMutation } from "src/Services/fridge";
import { RootState } from "src/store";

interface IFridgeItem {
  name: string,
  expDate: string,
  userInformation: any,
  setUserInformation: any
}

const FridgeItem: React.FC<IFridgeItem> = ({name, expDate, userInformation, setUserInformation}) => {

  const [replaceUserFridge] = useReplaceUserFridgeMutation();

  const userId = useSelector((state: RootState) => state.user.userId);

  const navigate = useNavigate()

  if (userId == '') {
    navigate('/')
  }

  return (
  <div className="m-2 flex items-center border-2 border-gray-300 rounded-lg shadow-md p-4 bg-white">
    <div className="flex flex-col">
      <div className="text-lg font-semibold text-gray-700">{name}</div>
      <div className="text-sm text-gray-500">Expires: {expDate}</div>
    </div>

    <div className="flex-1" />

    <div 
      onClick={(e) => {
        let newUserInformation = JSON.parse(JSON.stringify(userInformation))
        const itemLocation = newUserInformation.fridge.findIndex(
          (item: any) => item.expiry === expDate && item.name === name
        );
        if (itemLocation !== -1) {
          newUserInformation.fridge.splice(itemLocation, 1);
          replaceUserFridge({username: userId, newFridge: newUserInformation.fridge})
          setUserInformation(newUserInformation)
        }
      }} 
      className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition"
    >
      Delete
    </div>
  </div>
  )
}

export default FridgeItem