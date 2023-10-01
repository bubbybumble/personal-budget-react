import axios from "axios";
import * as d3 from 'd3';
import {useState, Component} from 'react';

const datasource = {
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd'],
    },
  ],
};
let data = [];

let svg;
let margin = 50;
let width = 512;
let height = 512;
// The radius of the pie chart is half the smallest side
let radius = Math.min(width, height) / 2 - margin;
let colors;



class D3Chart extends Component {
  
  createChart() {
    
    axios.get('http://localhost:5000/budget')
    .then((res) => {
      if (data.length > 0) { return; };

      for (let i = 0; i < res.data.myBudget.length; i++) {
        datasource.datasets[0].data[i] = res.data.myBudget[i].budget;
        datasource.labels[i] = res.data.myBudget[i].title;
      }
      
      for (let i = 0; i < datasource.labels.length; i++) {
        let entry = {entry: "", value: 0};
        entry.entry = datasource.labels[i];
        entry.value = datasource.datasets[0].data[i];
        data.push(entry);
      }

    
      colors = d3.scaleOrdinal()
      .domain(data.map((d) => d.value.toString()))
      .range(['#ffcd56', '#ff6384', '#36a2eb', '#cd56ff', '#6384ff', '#a2eb36', '#56ffcd']);
    
      svg = d3.select(".mainContainer")
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      
      const pie = d3.pie().value((d) => Number(d.value));
    
      // Build the pie chart
      svg
        .selectAll('pieces')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d', d3.arc()
          .innerRadius(70)
          .outerRadius(radius)
        )
        .attr('fill', (d, i) => (colors(i)))
        .attr("stroke", "#121926")
        .style("stroke-width", "1px");
      
      // Add labels
      const labelLocation = d3.arc()
        .innerRadius(100)
        .outerRadius(radius);
      
      svg
        .selectAll('pieces')
        .data(pie(data))
        .enter()
        .append('text')
        .text((d) => d.data.entry)
        .attr("transform", (d) => "translate(" + labelLocation.centroid(d)[0] * 1.5 + "," + labelLocation.centroid(d)[1] * 1.5 + ")")
        .style("text-anchor", "middle")
        .style("font-size", 15);


    });



   
  };

  componentDidMount() {
    this.createChart();
  }

  render() {
    return (
      <div>
       <h1>Chart2</h1>
     
      </div>
    );
  }

}



export default D3Chart;