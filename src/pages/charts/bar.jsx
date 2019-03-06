import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Bar extends Component {
  getOption = () => {
    return {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data:['销量']
      },
      xAxis: {
        data: ["衬衫1","羊毛衫1","雪纺衫1","裤子1","高跟鞋1","袜子1"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }
  }
  
  render () {
    return (
      <ReactEcharts option={this.getOption()} />
    )
  }
}
