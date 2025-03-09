import React, { useMemo } from 'react';
import useStore from '../stores/store';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4', 'Thing 5', 'Thing 6'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

export default function MainReport() {
  const { reports } = useStore();
  const labels = useMemo(() => {
    return reports.map(i => i.pathName);
  }, [reports]);

  const datasets = useMemo(() => {
    let __data = reports.map(i => {
      const { userTotalPoins, pathTotalPoins } = i;
      const percent = (userTotalPoins / pathTotalPoins) * 100;
      return percent;
    })
    return [
      {
        label: 'Kết qủa trắc nghiệm',
        data: [...__data],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  }, [reports]);

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          r: {
              beginAtZero: true,
              min: 0,
              max: 100,
              ticks: {
                  stepSize: 20,
                  color: '#666',
                  backdropColor: 'rgba(255, 255, 255, 0.8)'
              },
              grid: {
                  color: 'rgba(0, 0, 0, 0.1)'
              },
              pointLabels: {
                  color: '#333',
                  font: {
                      size: 14
                  }
              },
              angleLines: {
                  color: 'rgba(0, 0, 0, 0.1)'
              }
          }
      },
      plugins: {
          legend: {
              position: 'top',
              labels: {
                  font: {
                      size: 14
                  }
              }
          }
      }
  }

  return <>
    <div className="main-report container">
      <div className="main-report__entry">
        <h2>Kết quả trắc nghiệm</h2>
        <p>Chúng tôi đã tổng hợp và đánh giá kiến thức nền căn bản trong đầu tư Crypto cho bạn.</p>

        <div className="">
          <div className="report-bars">
            {reports.map((report, index) => {
              const percentage = (report.userTotalPoins / report.pathTotalPoins) * 100;
              return (
                <div key={report.pathID} className="report-bar">
                  <div className="report-bar__label">
                    <span>{report.pathName}</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                  <div className="report-bar__progress">
                    <div 
                      className="report-bar__fill" 
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)'
                      }}
                    ></div>
                  </div>
                  <div className="report-bar__points">
                    {report.userTotalPoins}/{report.pathTotalPoins} điểm
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="main-report__radar">
        <Radar data={{
          labels: [...labels, 'Sức Khỏe Tài Chính', 'Khả Năng Giải Quyết Vấn Đề'],
          datasets: [...datasets, { label: '__', data: [100, 0] }],
          options
          }} />
      </div>
    </div>
    
  </>
}