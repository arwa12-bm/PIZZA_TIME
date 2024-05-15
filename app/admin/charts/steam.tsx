import useCard from '@/app/hooks/useCard';
import React from 'react';
import Chart, {Props} from 'react-apexcharts';

interface StatData {
   nbrFois: number;
   heures: string[];
 }
 
 interface StatDay {
   [key: string]: StatData;
 }



export const Steam = () => {

   const {statDay,stat}= useCard()
   console.log({statDay});
   const keysList: string[] = [];
   const nbrFoisList: number[] = [];
   const DayList: string[] = [];


   stat.forEach((item :any,index:any )=> {
      DayList.push(`Jour ${index+1}`)
      const information = item.information;
      for (const key in information) {
         if (information.hasOwnProperty(key) ) {
            keysList.push(key);
            nbrFoisList.push(information[key].nbrFois);
         }}
      
   });
   console.log({keysList});
   console.log({nbrFoisList});


   const state:any = keysList.map((category:any, index:any) => ({
      name: category,
     data:nbrFoisList , // Convert time strings to milliseconds since epoch
   }));
 
   const options: Props['options'] = {
   chart: {
      type: 'area',
      animations: {
         easing: 'linear',
         speed: 300,
      },
      sparkline: {
         enabled: false,
      },
      brush: {
         enabled: false,
      },
      id: 'basic-bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      stacked: true,
      toolbar: {
         show: false,
      },
   },

   xaxis: {
      categories: DayList,
      labels: {
         // show: false,
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
         },
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
      axisTicks: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: {
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
         },
      },
   },
   tooltip: {
      enabled: false,
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 0,
      position: 'back',
   },
   stroke: {
      curve: 'smooth',
      fill: {
         colors: ['red'],
      },
   },
   // @ts-ignore
   markers: false,
};
   
   return (
      <>
         <div className='border-box w-[50%] z-5'>
            <div id="chart">
               <Chart
                  options={options}
                  series={state}
                  type="area"
                  height={425}
               />
            </div>
         </div>
      </>
   );
};
