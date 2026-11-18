import { type ChartType } from "chart.js";
type DataSet = {
    label: string,
    data: number[]
}
type TypesAndData = {
    labels: string[]
    datasets: DataSet[]
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
export type Graph = {
    dataset: TypesAndData
    description: string
    title: string
    subtitle: string | undefined
    graphType: ChartType
}

export const ProjectInfo = {
    project_name: "Project Name",
    people: "Beatrice, Fiona, Paul, Tïa, Marco",
    made_by_humans_text: "Made by humans :)"
}