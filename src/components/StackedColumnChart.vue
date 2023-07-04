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
                width: this.getWidthChart(this.xaxis_categories),
                chart: {
                    type: 'bar',
                    height: '300',
                    stacked: true,
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
                    '#969AFB',
                    '#FFA200',
                    '#60BFFF',
                    '#90ED7D',
                    '#FB4444',
                    '#014839'
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
/* .bieudo.scorllWidth {
    overflow-x: scroll;
    overflow-y: hidden;
} */
</style>
