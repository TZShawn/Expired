import React from "react";
import { Button } from "antd";
import landingImage from 'src/Images/landingImage.svg'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "src/Services/userSlice";

const LandingPage: React.FC<{}> = ({}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  return (
    <div className="bg-red-500 flex">
      <div className="h-screen w-1/2 px-16">
        <div className="align-middle pt-[42vh]">
          <div className="text-6xl font-bold align-middle">Expired</div>
          <div className="text-lg font-semibold pr-10 align-middle">
            Keep track of whats in your frige and figure out what to eat for
            dinner all in one app
          </div>
          <Button onClick={(e) => {
            dispatch(setUserId('shank'))
            navigate('/home')
            }} type="default" value={"large"} className="text-2xl font-semibold bg-green-400 p-8 hover:bg-green-500">Login/Signup</Button>
        </div>
      </div>
      <div className="w-1/2"><img src={'../Images/landingImage.svg'} alt="landingImage" /></div>
    </div>
  );
};

export default LandingPage;
