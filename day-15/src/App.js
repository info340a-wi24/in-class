//import the state hook function `useState()` to define state
import React, { useEffect, useState } from 'react';
import './App.css';
import * as d3 from 'd3';
import * as d3c from 'd3-collection';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';

// Get bootstrap css
import 'bootstrap/dist/css/bootstrap.css';

// Import dropdown menu
import { Button, ButtonGroup } from 'reactstrap';

function App() {
  const [data, setData] = useState([]);
  const [xVariable, setXVariable] = useState('Sport');
  // Year

  useEffect(() => {
    // componentDidMount logic
    d3.csv('data/medalists.csv').then((d) => {
      setData(d);
    });
  }, []);

  console.log(data);
  
  const chartData = d3c.nest()
    .key((d) => d[xVariable])
    .rollup((d) => d.length)
    .entries(data);

  console.log(chartData);
  
  return (
    <div className="container">
        <div>
          <h1>Olympics!</h1>
          <BarChart width={800} height={300} data={chartData}>
            <CartesianGrid strokeDashArray="3 3" />
            <XAxis dataKey="key" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
    </div>
  );

}




export default App;
