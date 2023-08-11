<template>
    <div ref="chuabieudo">
        <div class="bieudo scorllWidth" ref="bieudo"></div>
    </div>
</template>
<style></style>
<script>
import ApexCharts from 'apexcharts'

export default {
    props: ['dulieu'],
    data() {
        return {}
    },
    mounted() {
        // if (this.dulieu.series && this.dulieu.categories) {
        //     this.bindData(this.dulieu)
        // }
    },
    components: {
        // apexchart: ApexCharts,
    },
    watch: {
        dulieu: function (newVal) {
            if (newVal) {
                let data_demo = newVal
                this.bindData(data_demo)
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
        bindData(e) {
            if (e.series && e.categories) {
                let element = this.$refs.bieudo
                let series = e.series
                let categories = e.categories
                let totalText = e.totalText
                this.generateChart(series, categories, element, totalText)
            }
        },
        generateChart(series, categories, element, totalText) {
            let chart
            const options = {
                series,
                colors: [
                    '#90ED7D',
                    '#60BFFF',
                    '#FFA200',
                    '#0000CC',
                    '#FF0000',
                    '#FF00FF'
                ],
                chart: {
                    height: '300',
                    type: 'line',
                    width: this.getWidthChart(categories),
                    zoom: {
                        enabled: true
                    },
                    toolbar: {
                        show: false
                    },
                    animations: {
                        enabled: true
                    }
                },
                forecastDataPoints: {
                    count: 3
                },
                tooltip: {
                    enabled: true,
                    fillSeriesColor: false,
                    theme: 'dark',
                    style: {
                        fontSize: '12px',
                        fontFamily: undefined
                    },
                    onDatasetHover: {
                        highlightDataSeries: false
                    }
                },
                xaxis: {
                    labels: {
                        show: true,
                        style: {
                            // colors: '#0000FF',
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label'
                        }
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        style: {
                            // colors: '#0000FF',
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label'
                        }
                    }
                },

                legend: {
                    position: 'top',
                    horizontalAlign: 'center',
                    labels: {
                        colors: '#FF0000',
                        useSeriesColors: true
                    },

                    markers: {
                        width: 12,
                        height: 12,
                        strokeWidth: 0,
                        strokeColor: '#FF0000',
                        fillColors: undefined,
                        radius: 12,
                        customHTML: undefined,
                        onClick: undefined,
                        offsetX: 0,
                        offsetY: 0
                    }
                },
                dataLabels: {
                    // formatter(val, opts) {
                    //     const name = opts.w.globals.labels[opts.seriesIndex]
                    //     const tong = opts.w.globals.seriesTotals[opts.seriesIndex]
                    //     return [name, val.toFixed(2) + '%']
                    // },
                    style: {
                        fontSize: '12px',
                        fontWeight: 'bold'
                    },
                    noData: {
                        text: 'Biểu đồ chưa có dữ liệu',
                        align: 'center',
                        verticalAlign: 'middle',
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            fontFamily: undefined
                        }
                    }
                },
                labels: categories
            }
            chart = new ApexCharts(element, options)
            chart.render()
            chart.updateOptions([options])
        }
    }
}
</script>
<style scoped="scoped">
.apexcharts-canvas {
    margin: 0 auto !important;
}
.bieudo.scorllWidth {
    overflow-x: scroll;
    overflow-y: hidden;
}
.apexcharts-canvas {
}
</style>
