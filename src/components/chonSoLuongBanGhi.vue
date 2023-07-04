<template>
    <div class="dropdown">
        <span>Hiển thị</span>
        <div class="style">
            <el-select
                style="width: 100px !important"
                size="small"
                v-model="soLuong"
                @change="onSizeChange"
                placeholder="Chọn"
            >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div>
        <span>bản ghi/trang.</span>
    </div>
</template>

<script>
export default {
    props: [],

    watch: {},

    data() {
        return {
            soLuong: 25,
            options: [
                {
                    value: 25,
                    label: '25'
                },
                {
                    value: 50,
                    label: '50'
                },
                {
                    value: 100,
                    label: '100'
                },
                {
                    value: 200,
                    label: '200'
                },
                {
                    value: 500,
                    label: '500'
                },
                {
                    value: 1000,
                    label: '1000'
                }
            ],
            currentPage: 1,
            start: 0,
            to: 25
        }
    },

    mounted() {},

    methods: {
        onSizeChange() {
            console.log('Thay đổi kích thước hiển thị')
            this.currentPage = 1
            let ret = {
                soluong: this.soLuong
            }
            this.$emit('chonXongSoLuong', ret)
        }
    }
}
</script>

<style scoped>
.dropdown {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.style {
    padding: 0px 10px 0px 10px;
}
</style>
