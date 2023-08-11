<template>
    <div>
        <div ref="chartContainer"></div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
    props: {
        data_PieChart: {
            type: Array,
            required: true,
            default: () => []
        },
        xaxis_categories: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    mounted() {
        this.renderChart()
    },

    watch: {
        data_PieChart(newData) {
            this.renderChart()
        }
    },

    methods: {
        renderChart() {
            const data = this.data_PieChart
            const totalSchool = data.reduce((a, b) => a + b, 0)
            const labels =
                this.xaxis_categories.length > 0 ? this.xaxis_categories : []
            const options = {
                series: data,
                chart: {
                    type: 'donut',
                    height: 300
                },
                labels: labels,
                dataLabels: {
                    enabled: true,
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        if (labels.includes(name)) {
                            return [name, val.toFixed(2) + '%']
                        } else {
                            return ''
                        }
                    }
                },

                plotOptions: {
                    pie: {
                        expandOnClick: true,
                        donut: {
                            size: '45%',
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Tổng số',
                                    formatter: () => totalSchool.toLocaleString()
                                }
                            }
                        }
                    }
                },
                colors: this.getColors(),
                legend: {
                    show: false
                }
            }

            const chartContainer = this.$refs.chartContainer

            if (chartContainer) {
                if (this.chart) {
                    // Nếu biểu đồ đã tồn tại, hủy render trước khi tạo lại
                    this.chart.destroy()
                }

                this.chart = new ApexCharts(chartContainer, options)
                this.chart.render()
            }
        },
        getColors() {
            const categoryCount = this.xaxis_categories.length
            return this.colors.slice(0, categoryCount)
        }
    },

    data() {
        return {
            colors: [
                '#2E93fA',
                '#66DA26',
                '#546E7A',
                '#E91E63',
                '#FF9800',
                '#F781F3',
                '#FFFF00',
                '#19070B'
            ],
            chart: null // Lưu trữ đối tượng biểu đồ để hủy render khi cần thiết
        }
    }
}
</script>

<style scoped></style>
