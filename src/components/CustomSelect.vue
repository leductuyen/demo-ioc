<template>
    <div :class="[customClass]">
        <div
            v-for="(item, index) in options"
            :key="index"
            class="select-item"
            @click="toggleDropdown(index)"
        >
            {{ item.label }}
            <i
                class="arrow"
                :class="{
                    rotateRight: isOpen[index],
                    rotateDown: !isOpen[index],
                }"
            ></i>
            <transition name="fade">
                <ul v-if="isOpen[index]" class="dropdown">
                    <li
                        v-for="(option, optionIndex) in item.options"
                        :key="optionIndex"
                        @click="selectOption(index, option)"
                    >
                        {{ option }}
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        customClass: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isOpen: [],
        }
    },
    methods: {
        toggleDropdown(index) {
            this.$set(this.isOpen, index, !this.isOpen[index])
        },
        selectOption(index, option) {
            // Xử lý khi chọn một lựa chọn
            console.log(`Selected option: ${option}`)
            // Đóng dropdown
            this.isOpen[index] = false
        },
    },
}
</script>

<style>
.arrow {
    display: inline-block;
    margin-left: 100px;
    width: 10px;
    height: 10px;
    border-left: 2px solid #000;
    border-bottom: 2px solid #000;
}

.rotateRight {
    transform: rotate(-45deg);
}

.rotateDown {
    transform: rotate(225deg);
}
.dropdown {
    list-style-type: none;
}

.dropdown li {
    cursor: pointer;
    display: block;
    font-size: 13px;
    padding: 7px 0px 7px 0px;

    border-bottom: 1px solid #f4f6ff;

    color: #7e84a3;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease-in-out 0s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
