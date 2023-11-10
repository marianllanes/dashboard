import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import './PieChartWithNeedle.css';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 60, color: '#0000ff' },
  { name: 'B', value: 60, color: '#FFFF00' },
  { name: 'C', value: 60, color: '#ff0000' },
];
const cx = 150;
const cy = 200;
const iR = 50;
const oR = 100;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key="circle" />,
    <path
      d={`M${xba} ${yba} L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="none"
      fill={color}
      key="path"
    />,
  ];
};

class PieChartWithNeedle extends PureComponent {
  render() {
    const { temperature } = this.props;
    const updatedValue = parseFloat(temperature) || 0;

    return (
      <PieChart width={350} height={200}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(updatedValue, data, cx, cy, iR, oR, '#551313')}
      </PieChart>
    );
  }
}

export default PieChartWithNeedle;
