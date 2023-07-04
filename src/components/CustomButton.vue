<template>
    <el-button
        :size="size"
        @click="handleClick"
        :type="type"
        :loading="loading"
        :icon="icon"
        :disabled="disabled"
        >{{ label }}</el-button
    >
</template>

<script>
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Vue from 'vue'
Vue.use(ElementUI)

export default {
    name: 'CustomButton',
    components: {
        ElButton: ElementUI.Button,
    },
    props: {
        ...ElementUI.Button.props,
        size: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: 'default',
        },
        label: {
            type: String,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            require: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        handleClick() {
            this.$emit('click', () => {})
        },
    },
}
</script>
