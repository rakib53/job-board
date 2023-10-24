import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    x: {
      grid: {
        display: false, // Remove the x-axis grid lines
      },
    },
    y: {
      // display: false,
      // beginAtZero: false, // This ensures the scale starts at 0
      grid: {
        display: false,
      },
      // ticks: {
      //   display: true, // Remove the scale values
      // },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    border: {
      display: false, // Remove the outer border
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function BarChart({ statics }) {
  const { sat, sun, mon, tue, wed, thu, fri } =
    statics?.jobAppliedReport?.report;
  const {
    sat: satView,
    sun: sunView,
    mon: monView,
    tue: tueView,
    wed: wedView,
    thu: thuView,
    fri: friView,
  } = statics?.jobViewsReport?.report;

  const data = {
    labels,
    datasets: [
      {
        label: "Job View",
        data: [satView, sunView, monView, tueView, wedView, thuView, friView],
        backgroundColor: "#ec9f0f",
      },
      {
        label: "Job applied",
        data: [sat, sun, mon, tue, wed, thu, fri],
        backgroundColor: "#7b61ff",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
