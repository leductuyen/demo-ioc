<template>
    <div id="chart" class="chart-container">
        <div id="chart">
            <apexchart
                type="bar"
                height="290"
                :options="chartOptions"
                :series="series"
            ></apexchart>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'ChartBar',
    components: {
        apexchart: VueApexCharts
    },
    props: {
        chartData: {
            type: Array,
            required: true
        },
        chartCategories: {
            type: Array,
            required: true
        }
    },
    watch: {
        chartData(newValue) {
            // Update series data when chartData changes
            this.series = [{ data: newValue }]
        },
        chartCategories(newCategories) {
            // Update x-axis categories when chartCategories changes
            this.chartOptions.xaxis.categories = newCategories
        }
    },
    mounted() {
        // Initial update of series data
        this.series = [{ data: this.chartData }]
        this.chartOptions.xaxis.categories = this.chartCategories
    },
    data() {
        const colors = [
            '#2E93fA',
            '#2E93fA',
            '#2E93fA',
            '#2E93fA',
            '#2E93fA',
            '#2E93fA',
            '#66DA26',
            '#66DA26',
            '#66DA26',
            '#66DA26',
            '#66DA26',
            '#546E7A',
            '#546E7A',
            '#546E7A',
            '#546E7A',
            '#E91E63',
            '#E91E63',
            '#E91E63'
        ]
        return {
            series: [
                {
                    data: this.chartData
                }
            ],
            chartOptions: {
                chart: {
                    height: 290,
                    type: 'bar',
                    events: {
                        click: function (chart, w, e) {
                            // console.log(chart, w, e)
                        }
                    },
                    stacked: true,
                    toolbar: {
                        show: false
                    }
                },
                colors: colors,
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        distributed: true,
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
                dataLabels: {
                    enabled: false
                },
                fill: {
                    opacity: 1
                },
                legend: {
                    show: false,
                    position: 'top',
                    offsetX: 0,
                    offsetY: 10
                },
                tooltip: {
                    enabled: false // Disable tooltip to hide series name
                },
                xaxis: {
                    categories: this.chartCategories,
                    labels: {
                        style: {
                            colors: colors,
                            fontSize: '12px'
                        }
                    }
                }
            }
        }
    }
}
</script>

<style scoped></style>
