<template>
    <div>
        <div ref="chartContainer"></div>
    </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
    props: {
        label: {},
        data_PieChart: {
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
            this.list_label = this.label
            this.renderChart()
        }
    },

    methods: {
        calculateLabels(data) {
            const labels = this.list_label.slice(0, data.length)
            return labels
        },
        renderChart() {
            const data = this.data_PieChart
                ? this.data_PieChart
                : [0, 0, 0, 0, 0, 0]
            const totalSchool = data.reduce((a, b) => a + b, 0)

            const options = {
                series: data,
                chart: {
                    type: 'donut',
                    height: 300
                },
                labels: this.calculateLabels(data),
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(2) + '%']
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
                colors: this.colors,
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
        }
    },

    data() {
        return {
            list_label: [],
            colors: [
                // '#969AFB',
                // '#FFA200',
                // '#60BFFF',
                // '#90ED7D',
                // '#FB4444',
                // '#014839',
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
