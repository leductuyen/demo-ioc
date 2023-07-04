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
            default: () => [],
        },
    },

    mounted() {
        this.renderChart()
    },

    watch: {
        data_PieChart(newData) {
            this.renderChart()
        },
    },

    methods: {
        renderChart() {
            const data = this.data_PieChart
            const totalSchool = data.reduce((a, b) => a + b, 0)

            const options = {
                series: data,
                chart: {
                    type: 'donut',
                },
                labels: this.list_label,
                dataLabels: {
                    formatter(val, opts) {
                        const name = opts.w.globals.labels[opts.seriesIndex]
                        return [name, val.toFixed(2) + '%']
                    },
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
                                    formatter: () => totalSchool.toString(),
                                },
                            },
                        },
                    },
                },
                colors: this.colors,
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
    },

    data() {
        return {
            list_label: [
                'Mầm non',
                'Tiểu học',
                'THCS',
                'THPT',
                'Liên cấp',
                'GDTX',
            ],
            colors: [
                '#969AFB',
                '#FFA200',
                '#60BFFF',
                '#90ED7D',
                '#FB4444',
                '#014839',
            ],
            chart: null, // Lưu trữ đối tượng biểu đồ để hủy render khi cần thiết
        }
    },
}
</script>

<style scoped></style>
