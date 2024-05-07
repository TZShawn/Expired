import React from "react";

const MainPage: React.FC<{}> = ({}) => {

    return (
        <div className="w-screen h-screen bg-red-400">
            <div className="flex w-screen">
                <div>AAAA</div>
                <div className="flex-1"></div>
                <div className="bg-blue-100 px-4 py-3 border border-gray-400">Home</div>
                <div className="bg-blue-100 px-2 py-3 border border-gray-400">Account</div>
                <div className="bg-blue-100 px-2 py-3 border border-gray-400">Recipes</div>
            </div>

            <div className="w-screen bg-green-300 flex">
                <div className="w-1/3">
                    a
                </div>
            
                <div className="w-2/3">b</div>
            </div>

        </div>
    )
}

export default MainPage