import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { WhatsappServiceService } from '../whatsapp-service.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  barChart: any;
  months: string[] = [];
  years: number[] = [];
  selectedMonth: string = '';
  selectedYear: number = new Date().getFullYear();

  messageData: any = {}; // Store API response mapped by date
  res: any;
  constructor(private service: WhatsappServiceService) {
    this.generateMonths();
    this.generateYears();
  }


  // Dynamically generate months
  generateMonths() {
    this.months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString('en', { month: 'long' })
    );
    this.selectedMonth = this.months[new Date().getMonth()]; // Default to current month
  }

  // Dynamically generate years
  generateYears() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i); // Generate years dynamically
  }


  ngOnInit() {

    //call fetchData
    this.fetchDataForSelectedMonthYear();


  }







  //ch1

  fetchDataForSelectedMonthYear() {
       debugger;
    let USERID = localStorage.getItem('userId');
    let obj = {
      USERID: USERID,
      YEAR: this.selectedYear.toString(),
      MONTH: (this.months.indexOf(this.selectedMonth) + 1).toString(),
    };
  
    this.service.getData(obj).subscribe((res) => {
      debugger;
      console.log('Fetched Data:', res);
      this.processData(res);
    });
  }
  
  processData(res: any[]) {
    debugger;
    this.messageData = {}; // Initialize the messageData object
  
    // Process data by grouping messages per date and template
    this.messageData = res.reduce((acc, { TRAN_DATE, TEMPLATE__CODE, NAME }) => {
      // Initialize date if not present
      if (!acc[TRAN_DATE]) {
        acc[TRAN_DATE] = {
          totalCount: 0, // Total messages for this day
          templates: {}, // Store templates per date
        };
      }
  
      // Increment total messages for this date
      acc[TRAN_DATE].totalCount++;
  
      // Initialize template-specific count
      if (!acc[TRAN_DATE].templates[TEMPLATE__CODE]) {
        acc[TRAN_DATE].templates[TEMPLATE__CODE] = {
          count: 0,
          name: NAME, // Store template name for hover info
        };
      }
  
      // Increment count for this specific template
      acc[TRAN_DATE].templates[TEMPLATE__CODE].count++;
  
      return acc;
    }, {});
  
    console.log('Processed Message Data:', this.messageData);
  
    this.createBarChart(); // Call chart function after processing data
  }
  



  // Helper function to get the number of days in a month
  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }



  // createBarChart() {
  //   const monthIndex = this.months.indexOf(this.selectedMonth);
  //   const year = this.selectedYear;

  //   const daysInMonth = this.getDaysInMonth(monthIndex + 1, year);
  //   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  //   const messageCounts = days.map(day => {
  //     const dayString = day.toString().padStart(2, '0'); // Format to 'DD'
  //     const key = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${dayString}`;
  //     return this.messageData[key] || 0; // Default to 0 if no data
  //   });

  //   if (this.barChart) {
  //     this.barChart.destroy();
  //   }

  //   this.barChart = new Chart('barChart', {
  //     type: 'bar',
  //     data: {
  //       labels: days,
  //       datasets: [
  //         {
  //           label: 'Number of Messages',
  //           data: messageCounts,
  //           backgroundColor: messageCounts.some(count => count > 0) ? '#3f51b5' : 'transparent', // Hide bars if no data
  //           borderColor: '#3f51b5',
  //           borderWidth: 1,
  //         },
  //       ],
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { display: true },
  //         tooltip: { enabled: true },
  //       },
  //       scales: {
  //         x: { title: { display: true, text: 'Day of Month' } },
  //         y: { title: { display: true, text: 'Number of Messages' }, beginAtZero: true },
  //       },
  //       animation: {
  //         duration: 1000,
  //         easing: 'easeInOutQuad',
  //       },
  //     },
  //   });
  // }



  //ch2



//   createBarChart() {
//     const monthIndex = this.months.indexOf(this.selectedMonth);
//     const year = this.selectedYear;
//     const daysInMonth = this.getDaysInMonth(monthIndex + 1, year);
//     const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
//     // Define color set for different templates
//     const templateColors: Record<number, string> = {
//       1: '#FF6384', // Red
//       2: '#36A2EB', // Blue
//       3: '#FFCE56', // Yellow
//       4: '#4BC0C0', // Teal
//       5: '#9966FF', // Purple
//     };
  
//     // Prepare dataset for each template
//     const templateData: Record<number, number[]> = {};
//     const totalCounts: number[] = new Array(daysInMonth).fill(0);
  
//     days.forEach((day, index) => {
//       const dayString = day.toString().padStart(2, '0'); // Format to 'DD'
//       const key = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${dayString}`;
  
//       if (this.messageData[key]) {
//         Object.entries(this.messageData[key].templates).forEach(([templateCode, templateInfo]: any) => {
//           const code = Number(templateCode);
  
//           // Initialize if not present
//           if (!templateData[code]) {
//             templateData[code] = new Array(daysInMonth).fill(0);
//           }
  
//           // Assign count
//           templateData[code][index] = templateInfo.count;
//           totalCounts[index] += templateInfo.count;
//         });
//       }
//     });
  
//     // Prepare datasets for chart.js
//     const datasets = Object.entries(templateData).map(([code, data]) => ({
//       label: `Template ${code}`, 
//       data: data,
//       backgroundColor: templateColors[Number(code)] || '#888888', // Default grey if color not defined
//       borderColor: templateColors[Number(code)] || '#888888',
//       borderWidth: 1,
//       stack: 'templates', // Group bars per day
//     }));
  
//     // Add total count dataset
// datasets.push({
//   label: 'Total Messages',
//   data: totalCounts,
//   backgroundColor: 'rgba(0, 0, 0, 0.2)', // Transparent grey overlay
//   borderColor: 'black',
//   borderWidth: 1,
//   stack: 'total', // Group total messages separately
// });

  
//     // Destroy previous chart if exists
//     if (this.barChart) {
//       this.barChart.destroy();
//     }
  
//     // Create new chart
//     this.barChart = new Chart('barChart', {
//       type: 'bar',
//       data: {
//         labels: days,
//         datasets: datasets,
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { display: true },
//           tooltip: {
//             enabled: true,
//             callbacks: {
//               label: function (tooltipItem: any) {
//                 const dataset = tooltipItem.dataset;
//                 const index = tooltipItem.dataIndex;
//                 const count = dataset.data[index];
//                 return `${dataset.label}: ${count}`;
//               },
//             },
//           },
//         },
//         scales: {
//           x: { title: { display: true, text: 'Day of Month' } },
//           y: { title: { display: true, text: 'Number of Messages' }, beginAtZero: true },
//         },
//         animation: {
//           duration: 1000,
//           easing: 'easeInOutQuad',
//         },
//       },
//     });
//   }





//ch3


// createBarChart() {
//   debugger;
//   const monthIndex = this.months.indexOf(this.selectedMonth);
//   const year = this.selectedYear;
//   const daysInMonth = this.getDaysInMonth(monthIndex + 1, year);
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   // Dynamic color generator for templates
//   const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
//   const templateColors: Record<number, string> = {};

//   // Prepare dataset for each template
//   const templateData: Record<number, number[]> = {};

//   days.forEach((day, index) => {
//     const dayString = day.toString().padStart(2, '0'); // Format to 'DD'
//     const key = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${dayString}`;

//     if (this.messageData[key]) {
//       Object.entries(this.messageData[key].templates).forEach(([templateCode, templateInfo]: any) => {
//         const code = Number(templateCode);

//         // Assign a color dynamically if not set
//         if (!templateColors[code]) {
//           templateColors[code] = generateColor();
//         }

//         // Initialize array for each template
//         if (!templateData[code]) {
//           templateData[code] = new Array(daysInMonth).fill(0);
//         }

//         // Assign count
//         templateData[code][index] = templateInfo.count;
//       });
//     }
//   });

//   // Prepare datasets dynamically
//   const datasets = Object.entries(templateData).map(([code, data]) => ({
//     label: `Template ${code}`,
//     data: data,
//     backgroundColor: templateColors[Number(code)],
//     borderColor: templateColors[Number(code)],
//     borderWidth: 1,
//     stack: 'templates', // Stack bars per day
//   }));

//   // Destroy previous chart if exists
//   if (this.barChart) {
//     this.barChart.destroy();
//   }

//   // Create new bar chart
//   this.barChart = new Chart('barChart', {
//     type: 'bar',
//     data: {
//       labels: days,
//       datasets: datasets,
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         tooltip: {
//           enabled: true,
//           callbacks: {
//             label: function (tooltipItem: any) {
//               const dataset = tooltipItem.dataset;
//               const index = tooltipItem.dataIndex;
//               const count = dataset.data[index];
//               return `Template ${dataset.label}: ${count}`;
//             },
//           },
//         },
//       },
//       scales: {
//         x: { title: { display: true, text: 'Day of Month' } },
//         y: { title: { display: true, text: 'Number of Messages' }, beginAtZero: true },
//       },
//       animation: {
//         duration: 1000,
//         easing: 'easeInOutQuad',
//       },
//     },
//   });
// }





// createBarChart() {
//   debugger;
//   const monthIndex = this.months.indexOf(this.selectedMonth);
//   const year = this.selectedYear;
//   const daysInMonth = this.getDaysInMonth(monthIndex + 1, year);
//   const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

//   // Dynamic color generator for templates
//   const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
//   const templateColors: Record<number, string> = {};

//   // Prepare dataset for each template
//   const templateData: Record<number, number[]> = {};
//   const totalCounts: number[] = new Array(daysInMonth).fill(0); // Array to store total counts per day

//   days.forEach((day, index) => {
//     const dayString = day.toString().padStart(2, '0'); // Format to 'DD'
//     const key = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${dayString}`;

//     if (this.messageData[key]) {
//       Object.entries(this.messageData[key].templates).forEach(([templateCode, templateInfo]: any) => {
//         const code = Number(templateCode);

//         // Assign a color dynamically if not set
//         if (!templateColors[code]) {
//           templateColors[code] = generateColor();
//         }

//         // Initialize array for each template
//         if (!templateData[code]) {
//           templateData[code] = new Array(daysInMonth).fill(0);
//         }

//         // Assign count
//         templateData[code][index] = templateInfo.count;
//         totalCounts[index] += templateInfo.count; // Calculate total count per day
//       });
//     }
//   });

//   // Prepare datasets dynamically
//   const datasets = Object.entries(templateData).map(([code, data]) => ({
//     label: `Template ${code}`,
//     data: data,
//     backgroundColor: templateColors[Number(code)],
//     borderColor: templateColors[Number(code)],
//     borderWidth: 1,
//     stack: 'templates', // Stack bars per day
//   }));

//   // Destroy previous chart if exists
//   if (this.barChart) {
//     this.barChart.destroy();
//   }

//   // Create new bar chart
//   this.barChart = new Chart('barChart', {
//     type: 'bar',
//     data: {
//       labels: days,
//       datasets: datasets,
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         tooltip: {
//           enabled: true,
//           callbacks: {
//             title: function (tooltipItems: any) {
//               return `Total Count: ${totalCounts[tooltipItems[0].dataIndex]}`; // Show total count instead of date
//             },
//             label: function (tooltipItem: any) {
//               const dataset = tooltipItem.dataset;
//               const index = tooltipItem.dataIndex;
//               const count = dataset.data[index];
//               return `${dataset.label}: ${count}`;
//             },
//           },
//         },
//       },
//       scales: {
//         x: { title: { display: true, text: 'Day of Month' } },
//         y: { title: { display: true, text: 'Number of Messages' }, beginAtZero: true },
//       },
//       animation: {
//         duration: 1000,
//         easing: 'easeInOutQuad',
//       },
//     },
//   });
// }


createBarChart() {
  debugger;
  const monthIndex = this.months.indexOf(this.selectedMonth);
  const year = this.selectedYear;
  const daysInMonth = this.getDaysInMonth(monthIndex + 1, year);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Dynamic color generator for templates
  const generateColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
  const templateColors: Record<number, string> = {};

  // Prepare dataset for each template
  const templateData: Record<number, number[]> = {};
  const totalCounts: number[] = new Array(daysInMonth).fill(0); // Array to store total counts per day
  let maxCount = 0; // Track maximum message count

  days.forEach((day, index) => {
    const dayString = day.toString().padStart(2, '0'); // Format to 'DD'
    const key = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${dayString}`;

    if (this.messageData[key]) {
      Object.entries(this.messageData[key].templates).forEach(([templateCode, templateInfo]: any) => {
        const code = Number(templateCode);

        // Assign a color dynamically if not set
        if (!templateColors[code]) {
          templateColors[code] = generateColor();
        }

        // Initialize array for each template
        if (!templateData[code]) {
          templateData[code] = new Array(daysInMonth).fill(0);
        }

        // Assign count
        templateData[code][index] = templateInfo.count;
        totalCounts[index] += templateInfo.count; // Calculate total count per day
        maxCount = Math.max(maxCount, totalCounts[index]); // Update max count
      });
    }
  });

  // Prepare datasets dynamically
  const datasets = Object.entries(templateData).map(([code, data]) => ({
    label: `Template ${code}`,
    data: data,
    backgroundColor: templateColors[Number(code)],
    borderColor: templateColors[Number(code)],
    borderWidth: 1,
    stack: 'templates', // Stack bars per day
  }));

  // Destroy previous chart if exists
  if (this.barChart) {
    this.barChart.destroy();
  }

  // **Dynamically adjust Y-Axis max value**
  let yAxisMax = 100; // Default
  if (maxCount > 100) {
    yAxisMax = Math.ceil(maxCount / 10) * 10; // Round up to nearest 10
  }

  // **Dynamically adjust stepSize**
  let stepSize = 10; // Default step
  if (yAxisMax > 200) {
    stepSize = 20;
  } else if (yAxisMax > 500) {
    stepSize = 50;
  }

  // Create new bar chart
  this.barChart = new Chart('barChart', {
    type: 'bar',
    data: {
      labels: days,
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: {
          enabled: true,
          callbacks: {
            title: function (tooltipItems: any) {
              return `Total Count: ${totalCounts[tooltipItems[0].dataIndex]}`; // Show total count instead of date
            },
            label: function (tooltipItem: any) {
              const dataset = tooltipItem.dataset;
              const index = tooltipItem.dataIndex;
              const count = dataset.data[index];
              return `${dataset.label}: ${count}`;
            },
          },
        },
      },
      scales: {
        x: { title: { display: true, text: 'Day of Month' } },
        y: {
          title: { display: true, text: 'Number of Messages' },
          beginAtZero: true,
          suggestedMax: yAxisMax, // Dynamically adjust max value
          ticks: {
            stepSize: stepSize, // Adjust step dynamically
            callback: (value: number) => value % 1 === 0 ? value : '', // Remove decimal ticks
          },
        },
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuad',
      },
    },
  });
}




  





  onMonthChange(event: any) {
    this.selectedMonth = event.target.value;
    this.fetchDataForSelectedMonthYear();
  }

  onYearChange(event: any) {
    this.selectedYear = event.target.value;
    this.fetchDataForSelectedMonthYear();
  }


 
 
 












}