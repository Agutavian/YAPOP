import { type ChartType, type ScatterDataPoint } from "chart.js";
interface EventPoint extends ScatterDataPoint {
    label: string;
}
type DataSet = {
    label: string,
    data: number[] | EventPoint[];
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
    x_axis: string
    y_axis: string
    graphType: ChartType
}

export const ProjectInfo = {
    project_name: "yapop",
    people: "Beatrice, Fiona, Paul, Tïa, Marco",
    made_by_humans_text: "Made by humans :)"
}

// const aggregateComments = [
//     { date: "17/10", instagram: 1404, youtube: 514, x: 463, total: 2381 },
//     { date: "24/10", instagram: 190, youtube: 729, x: 113, total: 1032 },
//     { date: "31/10", instagram: 447, youtube: 109, x: 22, total: 578 },
// ] as const;



// Inspiration: https://stackoverflow.com/questions/75807813/how-to-set-y-axis-value-in-vertical-bar-chart-using-chart-js
export const Graphs: Graph[] = [
    {
        title: "Aggregate Comments per Common Events",
        subtitle: "All News Outlets",
        description: "Total comments event that the news outlets had in common",
        graphType: "bar",
        x_axis: "Events",
        y_axis: "Number of Comments",
        dataset: {
            labels: ["17th October", "24 October", "31th October"],
            datasets: [
                {
                    label: "Le Monde",
                    data: [
                        644,
                        425,
                    ]
                },
                {
                    label: "Le Figaro",
                    data: [
                        247,
                        31,
                        48,
                    ]
                },
                {
                    label: "BBC",
                    data: [
                        905,
                        452,
                        495,

                    ]
                },
                {
                    label: "Associated Press",
                    data: [
                        585,
                        124,
                        35,
                    ]
                }
            ]
        }
    },
    {
        title: "Pro/Anti-Protesters % Aggregated by Event",
        subtitle: "All News Outlets, social media sites",
        description: "Total comments event that the news outlets had in common",
        graphType: "bar",
        x_axis: "Events",
        y_axis: "Number of Comments",
        dataset: {
            labels: ["17th October", "24 October", "31th October"],
            datasets: [
                {
                    label: "Pro-Protesters",
                    data: [
                        16,
                        40,
                        31
                    ]
                },
                {
                    label: "Anti-Protesters",
                    data: [
                        22,
                        34,
                        39,
                    ]
                },
            ]
        }
    },
    {
        title: "Pro-Protest % of Comments by Social Media Platform",
        subtitle: "All News Outlets, social media sites",
        description: "Pro-Protest % of Comments by Social Media Platform",
        graphType: "bar",
        x_axis: "Social Media Platform",
        y_axis: "What % of Comments are Pro-Protest",
        dataset: {
            labels: ["Instagram", "YouTube", "Twitter (X)", "Average"],
            datasets: [
                {
                    label: "Le Monde",
                    data: [
                        37,
                        35,
                        0,
                        36
                    ]
                },
                {
                    label: "Le Figaro",
                    data: [
                        22,
                        31,
                        9.5,
                        21
                    ]
                },
                {
                    label: "BBC",
                    data: [
                        15,
                        15,
                        17,
                        15
                    ]
                },
                {
                    label: "Associated Press",
                    data: [
                        20,
                        54.5,
                        36.5,
                        37
                    ]
                }
            ]
        }
    },
    {
        title: "Anti-Protest % of Comments by Social Media Platform",
        subtitle: "All News Outlets, social media sites",
        description: "Anti-Protest % of Comments by Social Media Platform",
        graphType: "bar",
        x_axis: "Social Media Platform",
        y_axis: "What % of Comments are Anti-Protest",
        dataset: {
            labels: ["Instagram", "YouTube", "Twitter (X)", "Average"],
            datasets: [
                {
                    label: "Le Monde",
                    data: [
                        12.5,
                        4,
                        0,
                        8.25
                    ]
                },
                {
                    label: "Le Figaro",
                    data: [
                        61,
                        39,
                        47,
                        49
                    ]
                },
                {
                    label: "BBC",
                    data: [
                        12,
                        25,
                        15,
                        17
                    ]
                },
                {
                    label: "Associated Press",
                    data: [
                        14,
                        31.5,
                        32.5,
                        26
                    ]
                }
            ]
        }
    },
    {
        title: "Number of Comments vs. Pro/Anti-Protest Comment %",
        subtitle: "All News Outlets, social media sites",
        description: "Anti-Protest % of Comments by Social Media Platform",
        graphType: "scatter",
        x_axis: "Social Media Platform",
        y_axis: "What % of Comments are Anti-Protest",
        dataset: {
            labels: ["Comment #", "Pro/Anti-Protest Comment %"],
            datasets: [
                {
                    label: "Comments vs. Other Metric",
                    data: [
                        { x: 2381, y: 22, label: 'October 17' },
                        { x: 1032, y: 34, label: 'October 24' },
                        { x: 578, y: 39, label: 'October 31' },
                    ],
                },

            ]
        }
    },




]




//     title: "Pro-Protesters On Instagram as a % of Comments",
//     subtitle: "All News Outlets",
//     description: "Total comments event that the news outlets had in common",
//     graphType: "bar",
//     x_axis: "Events",
//     y_axis: "Number of Comments",
//     dataset: {
//         labels: ["17th October", "24 October", "31th October"],
//         datasets: [
//             {
//                 label: "Le Monde",
//                 data: [
//                     19,
//                     55,
//                 ]
//             },
//             {
//                 label: "Le Figaro",
//                 data: [
//                     4,
//                     31,
//                     33,
//                 ]
//             },
//             {
//                 label: "BBC",
//                 data: [
//                     905,
//                     452,
//                     495,
//                 ]
//             },
//             {
//                 label: "Associated Press",
//                 data: [
//                     20,
//                     0,
//                     0,
//                 ]
//             }
//         ]
//     }
// },