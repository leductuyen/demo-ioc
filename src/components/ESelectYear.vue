<template>
    <div>
        <el-select
            v-model="selectedYear"
            :placeholder="placeholder"
            :size="size"
            :clearable="clearable"
            :disabled="disabled"
            :multiple="multiple"
            :collapse-tags="collapseTags"
            :filterable="filterable"
            :no-data-text="noDataText"
            :no-match-text="noMatchText"
            ref="el_select"
            @change="onChange"
            @input="onInput"
        >
            <el-option
                v-for="year in years"
                :key="year"
                :label="year"
                :value="year.split('-')[0]"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
import { Select } from 'element-ui'

export default {
    name: 'YearSelect',
    components: {
        ElSelect: Select
    },
    props: {
        value: {
            default: null
        },
        placeholder: {
            type: String,
            default: 'Chọn năm'
        },
        size: {
            type: String,
            default: 'small'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        collapseTags: {
            type: Boolean,
            default: true
        },
        filterable: {
            type: Boolean,
            default: false
        },
        noDataText: {
            type: String,
            default: 'Không có bản ghi nào'
        },
        noMatchText: {
            type: String,
            default: 'Không tìm thấy bản ghi nào'
        }
    },
    data() {
        return {
            selectedYear: this.value,
            years: []
        }
    },
    computed: {
        defaultYear() {
            const currentYear = new Date().getFullYear()
            const previousYear = currentYear - 2
            return `${previousYear}-${currentYear}`
        }
    },
    mounted() {
        const currentYear = new Date().getFullYear()
        const startYear = currentYear - 10
        const endYear = currentYear
        for (let year = startYear; year <= endYear; year++) {
            const schoolYear = `${year}-${year + 1}`
            this.years.push(schoolYear)
        }

        if (!this.selectedYear) {
            this.selectedYear = this.defaultYear.split('-')[0]
        }
    },
    methods: {
        onChange() {
            this.$emit('change', this.selectedYear)
        },
        onInput() {
            this.$emit('input', this.selectedYear)
        }
    }
}
</script>
