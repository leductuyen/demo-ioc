<template>
    <div class="padding">
        <div class="test">
            <span>{{ title }}</span>
            <div class="layout-data">
                <div class="data">{{ data }}</div>
                <div v-if="showData">
                    <img
                        v-if="status === 'abatement'"
                        src="./../assets/img/icon/giam.png"
                        alt="Giảm"
                    />
                    <img v-else src="./../assets/img/icon/tang.png" alt="Tăng" />
                </div>
            </div>
            <span v-if="showData"
                >{{ statusText }} {{ percent }}% so với năm ngoái</span
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        data: {
            type: Number,
        },
        status: {
            type: String,
        },
        percent: {
            type: Number,
        },
        showData: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        giamImageSrc() {
            return './../assets/img/icon/giam.png' // Thay đổi đường dẫn tới hình ảnh giam.png thích hợp
        },
        tangImageSrc() {
            return './../assets/img/icon/tang.png' // Thay đổi đường dẫn tới hình ảnh tang.png thích hợp
        },
        statusText() {
            return this.status === 'abatement' ? 'Giảm' : 'Tăng'
        },
    },
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
    background: #1ab394;
    border-radius: 10px;
    padding: 10px 5px 10px 10px;
    color: white;
    font-size: 18px !important;
}
.test span {
    font-size: 16px !important;
}
.layout-data {
    display: flex;
}
.layout-data .data {
    margin-right: 10px;
}
</style>
