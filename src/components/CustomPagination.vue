<template>
    <div class="layout">
        <div class="vanban">
            <i
                >Hiển thị từ
                <span style="color: #478fca">{{ start }} - {{ to }}</span>
                /Tổng số <b>{{ formatNumber(total_rows) }}</b> bản ghi</i
            >
        </div>
        <div class="pagination">
            <b-pagination
                class="pull-right"
                style="margin: 0"
                :first-text="pagination.first_text"
                :limit="9"
                :last-text="pagination.last_text"
                :total-rows="total_rows"
                :prev-text="pagination.next_text"
                :next-text="pagination.prev_text"
                v-model="trangHienTai"
                @change="chonTrangHienThi"
                :per-page="pagination.limit"
            >
            </b-pagination>
        </div>
    </div>
</template>

<script>
import { PaginationPlugin } from 'bootstrap-vue'
import number_util from '@/utils/number_utils'
import Vue from 'vue'
Vue.use(PaginationPlugin)

export default {
    props: ['batdau', 'tongbanghi', 'soluonghienthi'],
    watch: {
        batdau() {
            // console.log('Đưa về trang 1')
            this.trangHienTai = 1
            this.start = 0
            this.onPageChange()
        },

        soluonghienthi(newVal) {
            // console.log('Số lượng bản ghi hiển thị trên trang thay đổi:' + newVal)
            this.pagination.limit = newVal
            this.to = newVal
            this.trangHienTai = 1
            let ret = {
                start: 0,
                limit: this.pagination.limit,
                currentPage: this.trangHienTai
            }
            // console.log('Lấy lại ' + JSON.stringify(ret))
            this.rebuild()
            this.$emit('pageChange', ret)
        },
        tongbanghi: function (newVal, oldVal) {
            this.total_rows = this.tongbanghi
            this.rebuild()
            // console.log('Số lượng tổng bản ghi thay đổi' + this.total_rows)
        }
    },

    data() {
        return {
            trangHienTai: 1,
            pagination: {
                next_text: '«',
                prev_text: '»',
                per_page: 10,
                first_text: 'Đầu',
                last_text: 'Cuối',
                limit: 25
            },
            start: 0,
            to: 25,
            total_rows: 0
        }
    },

    mounted() {
        //this.rebuild();
    },

    methods: {
        chonTrangHienThi(number) {
            // console.log(number)

            this.trangHienTai = number
            // console.log(this.trangHienTai)
            // console.log('*****')

            this.onPageChange()
        },

        formatNumber(num) {
            return number_util.formatNumberEx(num)
        },

        onPageChange() {
            // console.log('Trang hiện tại: ' + this.trangHienTai)
            let ret = {
                start: (this.trangHienTai - 1) * this.pagination.limit,
                limit: this.pagination.limit,
                currentPage: this.trangHienTai
            }
            this.rebuild()
            // console.log('ret = ' + JSON.stringify(ret))
            this.$emit('pageChange', ret)
        },
        rebuild() {
            this.start = (this.trangHienTai - 1) * this.pagination.limit + 1
            this.to = this.trangHienTai * this.pagination.limit
            // console.log('curent paage: ' + this.trangHienTai)
            // console.log('s = ' + this.start + ', to = ' + this.to)
            // console.log('total row : ' + this.total_rows)
            if (this.trangHienTai * this.pagination.limit <= this.total_rows) {
                this.to = this.trangHienTai * this.pagination.limit
            } else {
                if (this.total_rows == 0) {
                    this.to = 0
                } else {
                    this.to = this.total_rows
                }
            }
        }
    }
}
</script>

<style scoped>
.layout {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.pagination {
    margin-top: 10px;
}
.inline {
    display: -webkit-box;
    /* margin: 20px 0; */
}

.inline p {
    vertical-align: middle;
    line-height: 34px;
    padding: 0 5px;
}

.vanban {
    margin-top: 10px;
    padding-right: 15px;
}

.pagination > .active > a {
    z-index: 0 !important;
}

.pagination {
    margin: 0 im !important;
}
</style>
