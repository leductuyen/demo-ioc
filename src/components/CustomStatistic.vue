<template>
    <div class="padding">
        <div class="test">
            <span>{{ title }}</span>
            <div class="layout-data">
                <div class="data">
                    {{ formatData(data) }}<span v-if="data2" class="span">/</span>

                    <span v-if="data2">{{ formatData(data2) }}</span>
                </div>
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
        },
        data2: {
            type: Number
        }
    },
    methods: {
        formatData(data) {
            if (typeof data === 'number' || typeof data === 'string') {
                return data.toLocaleString()
            }
            return data
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
    font-size: 13px;
}
.layout-data {
    display: flex;
    align-items: center;
}
.layout-data .span {
    font-size: 21px;
}
.data {
    font-size: 21px;
    font-weight: 700;
}
.content {
    font-size: 14px;
    font-weight: 100;
    margin-top: 3px;
    margin-left: 3px;
}
</style>
