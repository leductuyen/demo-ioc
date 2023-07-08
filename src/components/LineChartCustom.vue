<template>
    <div>
        <div class="chart-container">
            <div ref="chartContainer"></div>
        </div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
    mounted() {
        this.renderChart()
        this.updateChart(this.data_LineChart)
    },
    watch: {
        data_LineChart: {
            handler(newData) {
                this.updateChart(newData)
            },
            deep: true
        },

        xaxis_categories: {
            handler(newCategories) {
                this.updateXAxis(newCategories)
            },
            deep: true
        }
    },

    methods: {
        renderChart() {
            var options = {
                series: [],
                chart: {
                    height: 300,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: this.xaxis_categories
                },
                fill: {
                    opacity: 0
                },
                legend: {
                    position: 'bottom',
                    offsetX: 0,
                    offsetY: 0
                },
                colors: [
                    '#2E93fA',
                    '#66DA26',
                    '#546E7A',
                    '#E91E63',
                    '#FF9800',
                    '#F781F3',
                    '#FFFF00',
                    '#19070B',
                    '#00FF40'
                ]
            }

            const chartContainer = this.$refs.chartContainer
            this.chart = new ApexCharts(chartContainer, options)
            this.chart.render()
        },
        updateChart(newData) {
            if (newData && newData.length > 0) {
                this.chart.updateOptions({
                    series: newData
                })
            }
        },
        updateXAxis(newCategories) {
            this.chart.updateOptions({
                xaxis: {
                    categories: newCategories
                }
            })
        }
    },
    props: {
        data_LineChart: {
            type: Array,
            required: true
        },
        xaxis_categories: {
            type: Array,
            required: true
        }
    }
}
</script>

<style></style>
