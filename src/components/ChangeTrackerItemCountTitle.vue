<template>
    <div class="padding">
        <div class="test">
            <span>
                <template v-if="isSelectEmpty">
                    <div v-for="item in filteredDataChonDonVi" :key="item.id">
                        {{ item.tenDonVi }}
                    </div>
                </template>
                <template v-else>
                    {{ getFirstTitle(countTitle) }}
                </template>
                <div class="layout-data">
                    <div class="data">{{ getHiddenCount(countTitle) }}</div>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        countTitle: {
            type: Array,
            required: true
        },
        countTitleDefault: {
            type: Array
        }
    },
    computed: {
        isSelectEmpty() {
            return this.countTitle.length === 0
        },
        dataChonDonVi_Store() {
            return JSON.parse(localStorage.getItem('data_ChonDonVi'))
        },
        filteredDataChonDonVi() {
            if (this.dataChonDonVi_Store && this.dataChonDonVi_Store.length > 0) {
                return this.dataChonDonVi_Store.filter((item) => {
                    if (item.loaiDonVi === 1) {
                        if (item.tenDonVi.includes('Phòng Giáo dục và Đào tạo')) {
                            item.tenDonVi = item.tenDonVi.replace(
                                'Phòng Giáo dục và Đào tạo',
                                'Phòng GD&ĐT'
                            )
                        } else if (
                            item.tenDonVi.includes('Sở Giáo dục và Đào tạo')
                        ) {
                            item.tenDonVi = item.tenDonVi.replace(
                                'Sở Giáo dục và Đào tạo',
                                'Sở GD&ĐT'
                            )
                        }
                        return true
                    }
                    return false
                })
            } else {
                return [{ tenDonVi: '  Sở GD&ĐT Tỉnh Lào Cai - [10]' }]
            }
        }
    },
    methods: {
        getFirstTitle(countTitle) {
            if (countTitle && countTitle.length > 0) {
                return countTitle[0].title
            } else {
                return ''
            }
        },
        getHiddenCount(countTitle) {
            if (countTitle && countTitle.length > 1) {
                const hiddenCount = countTitle.length - 1

                return `+${hiddenCount} đơn vị khác`
            } else {
                return ''
            }
        },
        formatCountTitle(countTitle) {
            const firstTitle = this.getFirstTitle(countTitle)
            const hiddenCount = this.getHiddenCount(countTitle)
            return hiddenCount ? `${firstTitle} ${hiddenCount}` : firstTitle
        }
    },
    // watch: {
    //     countTitle(newValue, oldValue) {
    //         console.log('Giá trị countTitle đã thay đổi từ:', oldValue)
    //         console.log('Đến:', newValue)

    //         // Thực hiện các xử lý khác khi countTitle thay đổi
    //     },
    // },
    mounted() {
        console.log()
    }
}
</script>

<style scoped>
.padding {
    padding-left: 6px;
    padding-right: 6px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.test {
    background: #582d93;
    border-radius: 10px;
    padding: 10px 5px 10px 10px;
    color: white;
    font-size: 16px !important;
    height: 83px !important;
}
.test span {
    font-size: 16px !important;
}
.layout-data {
    display: flex;
    font-size: 14px;
    color: black;
}
.layout-data .data {
    margin-right: 10px;
}
</style>
