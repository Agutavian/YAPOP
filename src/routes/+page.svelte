<script lang="ts">
    import {Chart, type ChartOptions, type ScaleChartOptions} from 'chart.js/auto'
    import {onMount} from "svelte";
    import { type Graph, ProjectInfo } from "../TypesAndData.ts";
    import { tick } from 'svelte';
    import { Graphs } from '../TypesAndData.ts';
    import {scales} from "chart.js";



    let currentPageStates = [
        "start",
        "graphs",
        "sources"
    ]

    let currentPage = $state(currentPageStates[0])


    let graphCanvas: HTMLCanvasElement

    let currentGraphIndex = $state(0)
    let currentGraph = $derived(Graphs[currentGraphIndex])
    // let nextGraphButtonActive = $derived(graphs.length -1 == currentGraphIndex)

    let chart: Chart | undefined;

    async function graphsInit() {
        currentPage = "graphs"
        await tick()
        updateGraph()
    }

    function nextGraph() {
        // const g = $state.snapshot(currentGraph);
        if (Graphs.length == currentGraphIndex + 1) {
	        chart?.destroy()
	        chart = undefined
	        currentPage = "sources"
	        return
        }
        currentGraphIndex++
        updateGraph()
    }
    async function backAGraph() {
	    // const g = $state.snapshot(currentGraph);
	    if (currentPage == "sources"){
		    // currentGraphIndex--
		    console.log(currentGraphIndex)
		    currentPage = "graphs"
            await tick()
		    updateGraph()
		    return
	    }

	    if (currentGraphIndex == 0) {
		    currentPage = "start"
		    return
	    }

	    currentGraphIndex--


	    updateGraph()
    }

    function updateGraph() {
        chart?.destroy();
		// console.log(currentGraph)
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
                    scales: {
						x: {
							ticks: { color: 'black' },
							title: {
								display: true,
                                text: currentGraph.x_axis,
                                color: 'black',
                                font: {
	                                size: Math.max(16, window.innerWidth / 80),
                                }
                            }
                        },
	                    y: {
		                    ticks: { color: 'black' },
		                    title: {
			                    display: true,
			                    text: currentGraph.y_axis,
			                    color: 'black',
			                    font: {
				                    size: Math.max(16, window.innerWidth / 80),
			                    }
		                    }
	                    }
                    },

	                responsive: true,
	                maintainAspectRatio: false,
	                elements: {
		                bar: {
			                borderRadius: 5,
			                borderWidth: 3,
		                }
	                }
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

    <div class="graph-section-main section">

        <div id="left-side" class="section">
            {#if currentPage == "graphs"}
            <div id="canvas-div">
                <canvas id="canvas" bind:this={graphCanvas}>
                </canvas>
            </div>

            {:else}
                Sources
            {/if}
        </div>


        <div id="right-side" class="section">
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
                {#if currentGraphIndex > 0 || currentPage === "sources"}
                    <button onclick={() => backAGraph()} class="next-button">
                        <span>
                            Previous
                        </span>
                    </button>
                {/if}
                <button onclick={nextGraph} class="next-button" hidden={currentPage === "sources"}>
                    <span>
                        Next
                    </span>
                </button>

            </div>
        </div>
    </div>

{/if}




<style lang="scss">

    button {
		//backdrop-filter: blur(1px);
        background-color: transparent;
        border: none;
        //https://box-shadow.art/shadow/6850/
		box-shadow: 0 0 20px rgba(28, 36, 44, 0.2);
        border-radius: 10px;
        &:hover {
			transition: scale 0.2s ease;
            cursor: pointer;
            scale: 1.05;
        }
        span {
            font-size: 30px;
            //font-size: 100%;
        }
    }

    .section {
		box-shadow: 0 0 20px rgba(28, 36, 44, 0.2);
    }
    //button:hover {
    //    scale: 2;
    //}

    #start-outer-div{
        width: 100vw;
		height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        button {
            width: 200px;
            height: 50px;
        }
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

		//box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        backdrop-filter: blur(100%);
        padding: 10px;
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
			padding: 10px;
			p {
				//font-size: 30px;
                margin: 0;
			}
		}

        #bottom-right {
            display: flex;
            flex-direction: row;
            gap: 10px;
            padding: 10px;
            .next-button {
              width: 100%;
              height: 100px;
            }
      }
    }


</style>

