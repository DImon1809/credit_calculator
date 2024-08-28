import { FC, useEffect, useState } from "react";

import { testData } from "../testData";

import "./PaymentChart.scss";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const PaymentChart: FC = () => {
  const [xData, setXData] = useState<number[]>([]);
  const [yData, setYData] = useState<number[]>([]);

  const [yField, setYField] = useState<string>("payOfInter");
  const [fontSize, setFontSize] = useState<number>(14);
  const [pointRadius, setPointRadius] = useState<number>(4);

  const data = {
    labels: xData,
    datasets: [
      {
        label: "График",
        data: yData,
        fill: true,
        borderWidth: 2,
        // borderColor: "rgba(21, 128, 195, 0.9)",
        borderColor: "rgba(0, 170, 230,0.9)",
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.ctx;
          const chartArea = chart.chartArea;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.top,
            chartArea.left,
            chartArea.bottom
          );

          gradient.addColorStop(0, "rgba(0, 170, 230,1)");
          gradient.addColorStop(1, "rgba(0, 170, 230,0.2)");

          return gradient;
        },
        tension: 0.4,
        pointRadius: pointRadius,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          font: {
            size: fontSize,
          },
        },

        border: {
          color: "rgba(0, 170, 230,1)",
        },

        grid: {
          color: "rgba(0, 170, 230,0.1)",
        },
      },

      y: {
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          font: {
            size: fontSize,
          },
        },

        border: {
          color: "rgba(0, 170, 230,1)",
        },

        grid: {
          color: "rgba(0, 170, 230,0.1)",
        },
      },
    },
  };

  useEffect(() => {
    if (yField) {
      let _xData = [];
      let _yData = [];

      for (let i = 0; i < testData.length; i++) {
        _xData.push(Number(i) + 1);

        let y = Number(testData[i][yField].replace(/\s|₽/gi, ""));

        _yData.push(y);
      }

      setXData(_xData);
      setYData(_yData);
    }
  }, [yField]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 660 && window.innerWidth > 440) {
        setFontSize(12);
      }

      if (window.innerWidth < 440) {
        setFontSize(10);
        setPointRadius(6);
      }

      if (window.innerWidth > 660) {
        setFontSize(14);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="payment-chart">
      <div className="select-wrapper">
        <label htmlFor="y-field" className="select-label">
          Вы можете выбрать поле по которому будет построен график:{" "}
        </label>
        <select
          name="y-field"
          id="y-field"
          className="y-field"
          value={yField}
          onChange={(event) => setYField(event.target.value)}
        >
          <option value="payOfInter">Оплата процентов</option>
          <option value="principal">Основной долг</option>
          <option value="perMonth">Платеж в месяц</option>
          <option value="repayment">Остаток погашения</option>
        </select>
      </div>
      <div className="line-chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PaymentChart;
