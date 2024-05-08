import React from "react";

const MainPage: React.FC<{}> = ({}) => {

    return (
        <div className="w-screen h-screen bg-red-400">
            <div className="flex w-screen border border-0 border-b-4">
                <div>AAAA</div>
                <div className="flex-1"></div>
                <div className="bg-blue-100 px-4 py-3 border border-gray-400">Home</div>
                <div className="bg-blue-100 px-2 py-3 border border-gray-400">Account</div>
                <div className="bg-blue-100 px-2 py-3 border border-gray-400">Recipes</div>
            </div>

            <div className="m-4 h-[90%] bg-green-300">
                <div className="w-full h-1/3 bg-blue-100 border border-b-2">
                    
                </div>

                <div className="w-full h-2/3 bg-orange-200">

                </div>
            </div>

        </div>
    )
}

export default MainPage