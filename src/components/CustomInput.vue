<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input
            :value="value"
            :type="type"
            @input="$emit('input', $event.target.value)"
            @change="$emit('change', $event.target.value)"
            :placeholder="placeholder"
            :class="['form-control', customClass]"
        />
        <!-- <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span> -->
    </div>
</template>

<script>
import { validateInput } from '@/utils'

export default {
    name: 'CustomInput',
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: [String, Number],
            required: true,
        },
        type: {
            type: String,
            default: 'text',
        },
        placeholder: {
            type: String,
            default: '',
        },
        customClass: {
            type: String,
            default: '',
        },
        error: {
            type: String,
            default: '',
        },
    },

    methods: {
        onInput(event) {
            this.$emit('input', event.target.value)
        },
        onChange(event) {
            this.$emit('change', event.target.value)
        },
    },
    computed: {
        errorMessage() {
            return validateInput(this.type, this.value)
        },
    },
}
</script>

<style scoped></style>
