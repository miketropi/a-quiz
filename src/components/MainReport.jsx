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
        backgroundColor: 'rgba(198, 255, 234, 0.214)',
        borderColor: '#21c8bd',
        borderWidth: 1,
      }
    ]
  }, [reports]);

  const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
          r: {
              // beginAtZero: true,
              // min: 0,
              // max: 100,

              ticks: {
                  stepSize: 20,
                  color: '#666',
                  backdropColor: 'rgba(255, 255, 255, 0.8)'
              },
              grid: {
                  color: 'rgb(0, 68, 255)'
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
    <div className="main-report">
      <div className="main-report__entry">
        <h2>Kết quả trắc nghiệm</h2>
        <p>Chúng tôi đã tổng hợp và đánh giá kiến thức nền căn bản trong đầu tư Crypto cho bạn.</p>

        
      </div>

      <div className="main-report__chart">
        <div className="main-report__radar">
          <Radar data={{
            labels: [...labels],
            datasets: [...datasets, { label: '__', data: [100, 0] }],
            options
            }} />
        </div>

        <div className="main-report__bar">
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
  backgroundColor: percentage <= 30 ? '#ff4d4d' : 
                percentage <= 70 ? '#ffd633' : '#66cc66'
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
      
      <div className="main-report__footer">
        <h4>Bạn quan tâm đến các dịch vụ của A1A hoặc mong muốn hợp tác với A1A? Kết nối ngay với chung tôi qua các kênh:</h4>
        <div className="contact-list">
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a href="mailto:cryptoman.onchain@gmail.com">cryptoman.onchain@gmail.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Telegram:</span>
            <a href="https://t.me/A1Aofficial" target="_blank" rel="noopener noreferrer">@NaNguyen_Lee</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Discord:</span>
            <a href="https://discord.gg/jZh4r6Fh" target="_blank" rel="noopener noreferrer">annenguyen</a>
          </div>
        </div>
      </div>

    </div>
    
  </>
}