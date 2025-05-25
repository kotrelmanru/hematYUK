import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, colors, label, totalAmount }) => {
  // Handle case untuk single data point
  const isSingleSegment = data.length === 1;
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={80}  // Diperkecil untuk ruang label lebih luas
          outerRadius={110} // Diperkecil agar tidak terlalu dekat dengan edge
          startAngle={90}   // Mulai dari atas
          endAngle={-270}   // Putaran penuh
          stroke="none"     // Hilangkan garis stroke antar segment
          paddingAngle={isSingleSegment ? 0 : 2} // Beri jarak antar segment
        >
          {data.map((entry, idx) => (
            <Cell 
              key={`cell-${idx}`} 
              fill={colors[idx % colors.length]}
              stroke="#ffffff" // Garis pemisah putih
              strokeWidth={isSingleSegment ? 0 : 2} // Hilangkan stroke jika single segment
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend 
          content={<CustomLegend />} 
          wrapperStyle={{ paddingTop: '20px' }}
        />

        {/* Central text styling */}
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#6B7280"
          fontSize="14px"
          fontFamily="Inter, sans-serif"
        >
          {label}
        </text>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#111827"
          fontSize="24px"
          fontWeight="600"
          fontFamily="Inter, sans-serif"
        >
          {totalAmount}
        </text>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;