<script lang="ts">
    import {Chart, type ChartOptions, type ScaleChartOptions} from 'chart.js/auto'
    import {onMount} from "svelte";
    import type {GraphPage} from "../GraphData.ts";
    import { tick } from 'svelte';
    import {scales} from "chart.js";



    let currentPageStates = [
        "start",
        "graphs",
        "sources"
    ]

    let currentPage = $state(currentPageStates[1])

    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];
    const data2 = [
        { year: 2010, count: 213123 },
        { year: 2011, count: 2312312 },
        { year: 2012, count: 13215 },
        { year: 2013, count: 22225 },
        { year: 2014, count: 221222 },
        { year: 2015, count: 3222210 },
        { year: 2016, count: 28222 },
    ];

	// Inspiration: https://stackoverflow.com/questions/75807813/how-to-set-y-axis-value-in-vertical-bar-chart-using-chart-js
	const leFigaroChart1 = {
		labels: ["17th October", "24 October", "31th October", "Mairie Limoges", "Curfew"],
        datasets: [
	        {
				label: "Anti-Protest",
                data: [
					66,
                    68,
                    50,
                    62,
                    71
                ]
            },
	        {
		        label: "Pro-Protest",
		        data: [
			        4,
			        31,
			        33,
			        31,
			        28
		        ]
	        }
        ]
    }


    let testCanvas: HTMLCanvasElement


    let graphs: GraphPage[] = [
        {
            data: {
                graph_type: 'bar',
                data_labels: data.map(row => row.year),
                data: data.map(row => row.count),
                datasets_label: 'test by year'
            },
            description: "This is a description",
            title: "Graph 1"
        },
        {
            data: {
                graph_type: 'bar',
                data_labels: data2.map(row => row.year),
                data: data2.map(row => row.count),
                datasets_label: 'lknmasdlkadsklnasd'
            },
            description: "another description",
            title: "Graph 2"
        }
    ]

    let currentGraphIndex = $state(0)
    let currentGraph = $derived(graphs[currentGraphIndex])
    // let nextGraphButtonActive = $derived(graphs.length -1 == currentGraphIndex)

    let chart: Chart | undefined;

    let chartStyle: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { ticks: { color: 'black' } },
            y: { ticks: { color: 'black' }}
        }
    }

    async function graphsInit() {
        currentPage = "graphs"
        await tick()
        updateGraph()
    }

    function nextGraph() {
        // const g = $state.snapshot(currentGraph);
        if (graphs.length == currentGraphIndex + 1) {
            currentPage = "sources"
            return
        }
        currentGraphIndex++
        updateGraph()
    }

    function updateGraph() {
        chart?.destroy();
        chart = new Chart(
            testCanvas,
            {

                type: currentGraph.data.graph_type,
                data: {
					...leFigaroChart1
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: currentGraph.title,
                            padding: {
                                top: 10,
                                bottom: 30
                            },
                            font: {
                                size: 50
                            }
                        },
                        legend: {

                        }
                    },

                    ...chartStyle
                }
            }
        );
    }


</script>


{#if currentPage == "start"}
    <div id="start-outer-div">
        <div id="start-inner-div">
            <div class="centred-div">
                <h1>
                    Title of Project
                </h1>
                <p>
                    Blah, blasds, ieqsda, kasdkasmdsak, and John
                </p>
            </div>
            <button onclick={graphsInit}>
                <span>
                    Start
                </span>
            </button>
        </div>

    </div>
{:else}

    <div class="graph-section-main">

        <div id="left-side">
            {#if currentPage == "graphs"}
            <div id="canvas-div">
                <canvas id="canvas" bind:this={testCanvas}>
                </canvas>
            </div>

            {:else}
                Sources
            {/if}
        </div>


        <div id="right-side">
            <div id="top-right">
                <h1>
                    Project Name
                </h1>
                <p>
                    Blah, blasds, ieqsda, kasdkasmdsak, and John
                </p>
                <span>
                    Made by humans :)
                </span>
            </div>

            <div id="middle-right">
                {#if currentPage == "graphs"}
                    {currentGraph.description}
                {:else if currentPage == "sources"}
                    Sources Description
                {/if}
            </div>
            <div id="bottom-right">
                <button onclick={nextGraph} id="next-button" hidden={currentPage === "sources"}>
                <span>
                    Next Page
                </span>
                </button>
            </div>
        </div>
    </div>

{/if}




<style lang="scss">

    #start-outer-div{
        width: 100vw;
		height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }


	.graph-section-main {
		width: 100vw;
		height: 100vh;
		/*background-color: red;*/
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

    #left-side {
        //display: flex;
        //align-items: center;
        //justify-content: center;
        //width: 95%;
        //height: 100%;
        margin: 10px;
        border-radius: 10px;
        //background-color: red;
        //background-color: red;
        //border-right: 10px solid red;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        backdrop-filter: blur(100%);
		#canvas-div {
            //padding: 20px;
            height: 100%;
            canvas {
				min-width: 0
            }
        }

    }
    #right-side {

        //width: 100%;
        //height: 100%;
		margin: 10px;
        display: grid;
        grid-template-rows: auto minmax(0, 1fr) auto;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        border-radius: 10px;
		#middle-right {
		  overflow-x: hidden;
		  overflow-y: scroll;
		  padding: 40px;
	  }
      #top-right {
          height: 100px;
      }

      #bottom-right {
          padding: 10px;
          #next-button {
              width: 100%;
              height: 100%;
        }
      }
    }


</style>

