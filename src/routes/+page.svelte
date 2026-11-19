<script lang="ts">
    import {Chart, type ChartOptions, type ScaleChartOptions} from 'chart.js/auto'
    import {onMount} from "svelte";
    import { type Graph, ProjectInfo } from "../TypesAndData.ts";
    import { tick } from 'svelte';
    import { Graphs } from '../TypesAndData.ts';
    import { fade, fly } from 'svelte/transition';
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

    function nextGraph(force_sources: boolean = false) {
        // const g = $state.snapshot(currentGraph);
        if (Graphs.length == currentGraphIndex + 1 || force_sources == true) {
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

    async function goToGraph(index: number) {
		currentGraphIndex = index



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
                    {ProjectInfo.long_name}

                </h1>
                <h2>({ProjectInfo.project_name})</h2>
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

    <div class="graph-section-main section" transition:fly={{ y: 1020, duration: 700 }}>

        <div id="left-side" class="section">
            {#if currentPage == "graphs"}
            <div id="canvas-div">
                <canvas id="canvas" bind:this={graphCanvas}>
                </canvas>
            </div>

            {:else}
                <div class="project-card">
                    <div>
                        <img src="/yapop.flagmaster.me.png" class="qr-image" alt="yapop.flagmaster.me qr code"/>
                    </div>
                    <div class="project-card-description">
                        <h1>
                            Website
                        </h1>
                        <p>
                            https://yapop.flagmaster.me
                        </p>
                    </div>
                </div>
                <div class="project-card">
                    <div>
                        <img src="/agutavian.yapop.png" class="qr-image" alt="yapop.flagmaster.me qr code"/>
                    </div>
                    <div class="project-card-description">
                        <h1>
                            Website Source Code
                        </h1>
                        <p>
                            https://github.com/Agutavian/YAPOP
                        </p>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-card-image-container">
                        <img src="/yawse-github.png" class="qr-image" alt="yapop.flagmaster.me qr code"/>
                    </div>
                    <div class="project-card-description">
                        <h1>
                            YAWSE Source Code
                        </h1>
                        <p>
                            https://github.com/Agutavian/YAWSE
                        </p>
                    </div>
                </div>

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
                <p class="made-by-humans">
                    {ProjectInfo.made_by_humans_text}
                </p>
            </div>

            <div id="middle-right">

                    <div id="table-of-contents">
                        <h3>
                            Navigate to a Page:
                        </h3>
                        {#each Graphs as graph, index (graph)}
                            <button class="table-of-contents-entry" onclick={() => goToGraph(index)}>
                                {graph.short_title}
                            </button>
                        {/each}
                        <button class="table-of-contents-entry project-table-entry" onclick={() => nextGraph(true)}>
                            Projects
                        </button>
                    </div>
                {#if currentPage == "graphs"}
                    <div id="project-graph-description">
                        <p>
                            {currentGraph.description}
                        </p>
                    </div>

                {:else if currentPage == "sources"}
<!--                    <p id="projects-middle-text">-->
<!--                        Links to Projects-->
<!--                    </p>-->

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
                <button onclick={() => nextGraph()} class="next-button" hidden={currentPage === "sources"}>
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

        .centred-div {
			h1 {
				font-size: xxx-large;
				//font-family: sans-serif, "Helvetica Neue", "Lucida Grande", Arial;
				//font-stretch: expanded;
                //transform: scaleY(2);
				//font-size: 16pt;
				//font-family: Arial, sans-serif;
                margin-bottom: 0;
			}
            h2 {
                //font-style: italic;
                font-weight: 500;
                margin: 0;
            }
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
		//box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        box-shadow: none;
        border-radius: 10px;


        #top-right {
            //height: 100px;

            width: 100%;
			box-shadow: 1px 2px 16.2px rgba(16, 18, 24, 0.37);
            border-radius: 10px;
            h1, p, span {
                text-align: center;
                margin: 0;
            }
			h1 {
                font-size: xxx-large;
                margin-top: 10px;
            }
			.made-by-humans {
                font-size: 10px;
                font-style: italic;
                margin-bottom: 10px;
            }

        }

		#middle-right {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;

			//padding: 10px;
			#table-of-contents {
				width: 100%;
				box-shadow: 1px 2px 16.2px rgba(16, 18, 24, 0.37);
				border-radius: 10px;
                //padding: 10px;
                h3 {
                    margin: 10px 0 10px 0;
                    text-align: center;
                }
				.table-of-contents-entry {
                    margin: 0 0 0 10px;
					font-size: large;
                    //text-wrap: nowrap;
					width: 100%;
					box-shadow: none;
					text-align: start;
					text-decoration: underline;
                    overflow: inherit;
				}
                .project-table-entry {
                    margin-bottom: 10px;
                }

			}
            #project-graph-description {
				overflow-x: hidden;
				overflow-y: scroll;
				p {
					font-size: x-large;
					margin: 0;
				}
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

    .project-card {
		box-shadow: 1px 1px 5.2px rgba(16, 18, 24, 0.37);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;
        padding: 10px;
        .project-card-image-container {
			margin: 0;
			padding: 0;
        }
		.qr-image {
			height: 150px;
			border-radius: 10px;
            margin: 0;
            padding: 0;
		}
        .project-card-description {
            display: flex;
            flex-direction: column;
            h1 {
                margin: 0;
                font-size: xx-large;
            }
            p {
                margin: 0;
            }
        }

    }
    #projects-middle-text {
        align-items: center;
    }




</style>

