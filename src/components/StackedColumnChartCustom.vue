<template>
    <div>
        <div ref="chuabieudo" class="chart-container">
            <div class="bieudo scorllWidth" ref="chartContainer"></div>
        </div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
    mounted() {
        this.renderChart()
    },
    watch: {
        data_StackedColumnChart: {
            deep: true,
            handler(newData) {
                this.updateChart(newData)
                // console.log(newData)
            }
        }
    },

    methods: {
        getWidthChart(e) {
            let minWidth = this.$refs.chuabieudo.clientWidth
            let Width = e.length * 150
            if (Width > minWidth) {
                return Width
            } else {
                return minWidth
            }
        },
        renderChart() {
            const options = {
                series: this.data_StackedColumnChart.map((item) => ({
                    name: item.name,
                    data: item.data
                })),

                chart: {
                    type: 'bar',
                    height: '300',
                    width: this.getWidthChart(this.xaxis_categories),
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        dataLabels: {
                            total: {
                                enabled: true,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                        }
                    }
                },
                xaxis: {
                    categories: []
                },
                legend: {
                    position: 'top',
                    offsetX: 0,
                    offsetY: 10
                },
                fill: {
                    opacity: 1
                },
                colors: [
                    '#2E93fA',
                    '#66DA26',
                    '#546E7A',
                    '#E91E63',
                    '#FF9800',
                    '#F781F3',
                    '#FFFF00',
                    '#19070B'
                ]
            }

            const chartContainer = this.$refs.chartContainer

            this.chart = new ApexCharts(chartContainer, options)
            this.chart.render()
        },
        updateChart(newData) {
            if (this.chart) {
                this.chart.updateSeries(
                    newData.map((item) => ({
                        name: item.name,
                        data: item.data
                    }))
                )
                this.chart.updateOptions({
                    xaxis: {
                        categories: this.xaxis_categories || []
                    }
                })
            }
        }
    },
    props: {
        data_StackedColumnChart: {
            type: Array,
            required: true
        },
        xaxis_categories: {
            type: Array
        }
    }
}
</script>

<style scoped>
.chart-container {
    width: 100%;
}
.bieudo.scorllWidth {
    overflow-x: scroll;
    overflow-y: hidden;
}
</style>
