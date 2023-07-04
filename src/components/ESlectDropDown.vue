<template>
    <div>
        <el-select
            v-model="selectedLimit"
            placeholder="Select"
            size="small"
            @change="handleSelectChange"
            :style="{ width: '100px' }"
        >
            <el-option
                v-for="item in dropdownOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props: {
        limit: {
            type: Number,
            required: true
        },
        handleChange: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            selectedLimit: this.limit,
            dropdownOptions: [
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
            ]
        }
    },
    methods: {
        handleSelectChange(value) {
            this.selectedLimit = value
            this.handleChange(value)
        }
    }
}
</script>
