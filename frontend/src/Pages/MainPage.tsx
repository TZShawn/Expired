import React from "react";
import { Select } from "antd";

import ReactECharts from 'echarts-for-react';

const MainPage: React.FC<{}> = ({}) => {
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
  return (
    <div className="w-screen h-screen">
      <div className="flex w-screen border border-0 border-b-4">
        <div>AAAA</div>
        <div className="flex-1"></div>
        <div className="bg-blue-100 px-4 py-3 border border-gray-400">Home</div>
        <div className="bg-blue-100 px-2 py-3 border border-gray-400">
          Account
        </div>
        <div className="bg-blue-100 px-2 py-3 border border-gray-400">
          Recipes
        </div>
      </div>

      <div className="mx-16 my-4 h-fill">
        <div className="w-full h-1/3 border border-b-2 flex">
          <div className="w-1/3 border border-2"><ReactECharts className="w-2/3" option={options} /></div>
          <div className="w-2/3 flex">
            <div className="w-full">
              <Select className="w-1/3" showSearch/>

            </div>
          </div>
        </div>

        <div className="w-full min-h-[50%] bg-orange-200"></div>
      </div>
    </div>
  );
};

export default MainPage;
