import { useContext } from 'react';
import CustomTooltip from './CustomTooltip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import AppContext from '../../context/AppContext';
const BarChartComponent = () => {

  const {graphData}: any = useContext(AppContext); 

  return (
    <div className='w-full max-w-[600px] mt-8'>
      <ResponsiveContainer aspect={2 / 1} width='100%' height='100%'>
        <BarChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey='name'
            tickFormatter={(name) => {
              const num = name.split('_')[1];
              return `Category ${num - 5}`;
            }}
            stroke='#fff'
            style={{
              fontSize: '0.8rem',
            }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(240, 195, 241, 0.2)' }}
            content={<CustomTooltip />}
          />
          <YAxis
            stroke='transparent'
            textAnchor='end'
            axisLine={{ stroke: '#fff' }}
            label={{ value: '₹', fill: '#fff', fontSize: '2rem' }}
          />
          <Bar dataKey='value' fill='#F0C3F1' barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
