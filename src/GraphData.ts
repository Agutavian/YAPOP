import type {ChartType, ChartTypeRegistry} from "chart.js";

type GraphData = {
    graph_type: ChartType
    data_labels: number[]
    datasets_label: string
    data: number[]

}

//         new Chart(
//             testCanvas,
//             {
//                 type: 'bar',
//                 data: {
//                     labels: data.map(row => row.year),
//                     datasets: [
//                         {
//                             label: 'Acquisitions by year',
//                             data: data.map(row => row.count)
//                         }
//                     ]
//                 }
//             }
//         );
export type GraphPage = {
    data: GraphData
    description: string
    title: string
}