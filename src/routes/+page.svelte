<script lang="ts">
    import {Chart, type ChartOptions, type ScaleChartOptions} from 'chart.js/auto'
    import {onMount} from "svelte";
    import { type Graph, ProjectInfo } from "../TypesAndData.ts";
    import { tick } from 'svelte';
    import {scales} from "chart.js";



    let currentPageStates = [
        "start",
        "graphs",
        "sources"
    ]

    let currentPage = $state(currentPageStates[0])

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



    let graphCanvas: HTMLCanvasElement


    // Inspiration: https://stackoverflow.com/questions/75807813/how-to-set-y-axis-value-in-vertical-bar-chart-using-chart-js
    let graphs: Graph[] = [
	    {
			title: "Share of anti-protest and pro-protest comments on Instagram",
            subtitle: "Le Figaro",
            description: "Here we see that Instagram has a tendency to create echo chambers : anti-protest comments almost always make up over 60% of the total share, pointing to an online bubble where everybody agrees with each other and little opposition is shown (never more than 33% of the total share).",
            graphType: "bar",
			dataset: {
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
        },
	    {
		    title: "TESTING TO SEE 5 BARS",
		    subtitle: "All News",
		    description: "Just a test!",
		    graphType: "bar",
		    dataset: {
			    labels: ["17th October", "24 October", "31th October", "Mairie Limoges", "Curfew"],
			    datasets: [
				    {
					    label: "Le Monde",
					    data: [
						    66,
						    68,
						    50,
						    62,
						    32
					    ]
				    },
				    {
					    label: "Le Figaro",
					    data: [
						    42,
						    31,
						    33,
						    12,
						    28
					    ]
				    },
				    {
					    label: "BBC",
					    data: [
						    35,
						    31,
						    45,
						    31,
						    28
					    ]
				    },
				    {
					    label: "Associated Press",
					    data: [
						    40,
						    21,
						    33,
						    34,
						    20
					    ]
				    },
				    {
					    label: "Pro-Protest",
					    data: [
						    4,
						    31,
						    29,
						    25,
						    28
					    ]
				    }
			    ]
		    }
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
		console.log(currentGraph)
        chart = new Chart(
            graphCanvas,
            {

                type: currentGraph.graphType,
                data: {
					labels: currentGraph.dataset.labels,
                    datasets: currentGraph.dataset.datasets
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: currentGraph.title,
                            padding: {
                                top: 10,
                                // bottom: 10
                            },
                            font: {
                                size: Math.max(16, window.innerWidth / 50)
                            }
                        },
                        subtitle: {
	                        display: true,
	                        text: currentGraph.subtitle,
	                        padding: {
		                        // top: 10,
		                        bottom: 30
	                        },
	                        font: {
		                        size: Math.max(16, window.innerWidth / 60),
                                style: 'oblique'
	                        }
                        },
	                    legend: {
							labels: {
								useBorderRadius: true,
								borderRadius: 4,
								font: {
									size: Math.max(16, window.innerWidth / 70),
									style: 'italic'
								}
                            },
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
                    {ProjectInfo.project_name}
                </h1>
                <h3>
                    {ProjectInfo.people}
                </h3>
                <p>
                    {ProjectInfo.made_by_humans_text}
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
                <canvas id="canvas" bind:this={graphCanvas}>
                </canvas>
            </div>

            {:else}
                Sources
            {/if}
        </div>


        <div id="right-side">
            <div id="top-right">
                <h1>
                    {ProjectInfo.project_name}
                </h1>
                <p>
                    {ProjectInfo.people}
                </p>
                <span>
                    {ProjectInfo.made_by_humans_text}
                </span>
            </div>

            <div id="middle-right">
                {#if currentPage == "graphs"}
                    <p id="project-graph-description">
                        {currentGraph.description}
                    </p>

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
		display: grid;
		grid-template-columns: 3fr 1fr;
	}

    #left-side {

        margin: 10px;
        border-radius: 10px;

		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        backdrop-filter: blur(100%);
		#canvas-div {
			position: relative;
            height: 100%;
			canvas {
				position: absolute;
				inset: 0;
			}
        }

    }
    #right-side {

		margin: 10px;
        display: grid;
		grid-template-rows: auto minmax(0, 1fr) auto;
		min-height: 0;
		box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        border-radius: 10px;


        #top-right {
            height: 100px;
            width: 100%;
            h1, p {
                text-align: center;
                margin: 0;
            }
            h1 {
                margin-bottom: 10px;
            }
        }

		#middle-right {
			overflow-x: hidden;
			overflow-y: scroll;
			padding: 40px;
			p {
				font-size: 30px;
			}
		}

        #bottom-right {
          padding: 10px;
          #next-button {
              width: 100%;
              height: 100px;
        }
      }
    }


</style>

