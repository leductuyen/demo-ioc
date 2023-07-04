<template>
    <Select
        size="small"
        ref="el_select"
        :clearable="clearable"
        :disabled="disabled"
        v-model="Content"
        :multiple="false"
        :collapse-tags="collapseTags"
        :placeholder="placeholder"
        @change="onChange"
        @input="onInput"
        :filterable="filterable"
        :no-data-text="'Không có bản ghi nào'"
        :no-match-text="'Không tìm thấy bản ghi nào'"
    >
        <el-option
            v-for="(item, index) in data"
            :key="index"
            :label="getLabel(item)"
            :disabled="item.disabled"
            :value="getValue(item)"
        ></el-option>
    </Select>
</template>

<script>
import { Select } from 'element-ui'
export default {
    components: {
        Select
    },
    props: {
        clearable: {
            default: false
        },
        value: {
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        data: {
            default: [],
            required: true
        },
        placeholder: {
            default: ''
        },
        filterable: {
            type: Boolean,
            default: false
        },
        collapseTags: {
            type: Boolean,
            default: false
        },
        fields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            Content: this.value
        }
    },
    methods: {
        onChange(e) {
            this.$emit('change', e)
        },
        onInput(e) {
            this.$emit('input', e)
        },
        getLabel(item) {
            if (!this.fields[0]) {
                return
            }
            return item[this.fields[0]]
        },
        getValue(item) {
            if (!this.fields[1]) {
                return
            }
            return {
                value: item[this.fields[1]],
                title: item[this.fields[0]]
            }
        }
    }
}
</script>
