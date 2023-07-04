<template>
    <div class="padding">
        <div class="test">
            <span>{{ title }}</span>
            <div class="layout-data">
                <div class="data">{{ data }}</div>
                <div class="content">{{ content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        data: {
            type: Number
        },
        content: {
            type: String
        }
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
    font-size: 18px !important;
}
.test span {
    font-size: 16px !important;
}
.layout-data {
    display: flex;
    align-items: center;
}
.data {
    font-size: 24px;
    font-weight: 700;
}
.content {
    font-size: 14px;
    font-weight: 100;
    margin-top: 7px;
    margin-left: 3px;
}
</style>
