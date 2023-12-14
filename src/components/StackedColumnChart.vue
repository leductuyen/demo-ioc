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
    data() {
        return {
            colorMapping: {
                MN: '#2E93fA',
                TH: '#66DA26',
                THCS: '#546E7A',
                THPT: '#E91E63',
                GDTX: '#FF9800',
                LC12: '#F781F3',
                LC23: '#FFFF00',
                LCK: '#19070B'
                // ... Các tên khác và màu sắc tương ứng
            }
        }
    },
    mounted() {
        this.renderChart()
    },
    watch: {
        data_StackedColumnChart: {
            deep: true,
            handler(newData) {
                this.updateChart(newData)
            }
        }
    },

    methods: {
        getWidthChart(e) {
            let minWidth = this.$refs.chuabieudo.clientWidth
            let Width = e.length * 90
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
                    height: '290',
                    width: this.getWidthChart(this.xaxis_categories),
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
                                },
                                formatter: function (val) {
                                    if (val !== undefined) {
                                        return val.toLocaleString()
                                    }
                                    return val
                                }
                            }
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            if (val !== undefined) {
                                return val.toLocaleString()
                            }
                            return val
                        }
                    }
                },
                xaxis: {
                    categories: []
                },
                legend: {
                    show: !this.show_legend,
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
                    newData.map((item, index) => ({
                        name: item.name,
                        data: item.data,
                        color: this.colorMapping[item.name] || null
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
        show_legend: {},
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
</style>
