/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

export const barChartDataDashboard = [
  {
    name: 'Sales',
    data: [330, 250, 110, 300, 490, 350, 270, 130, 425],
  },
];

export const barChartOptionsDashboard = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '10px',
      fontFamily: 'Plus Jakarta Display',
    },
    onDatasetHover: {
      style: {
        fontSize: '10px',
        fontFamily: 'Plus Jakarta Display',
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    show: false,
    labels: {
      show: false,
      style: {
        colors: '#fff',
        fontSize: '10px',
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: '#fff',
    labels: {
      show: true,
      style: {
        colors: '#fff',
        fontSize: '10px',
        fontFamily: 'Plus Jakarta Display',
      },
    },
  },
  grid: {
    show: false,
  },
  fill: {
    type: 'solid',
    colors: '#fff',
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: '12px',
    },
  },
};
