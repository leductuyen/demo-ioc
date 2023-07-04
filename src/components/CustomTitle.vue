<template>
    <div class="title-main">
        {{ title }}
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
.title-main {
    font-size: 18px;
    color: black;
    /* padding: 0px 0px 10px 0px; */
    font-weight: bold;
}
@media (max-width: 767px) {
    .title-main {
        font-size: 16px;
        padding-bottom: 8px;
    }
}

/* CSS cho máy tính bảng */
@media (min-width: 768px) and (max-width: 1023px) {
    .title-main {
        font-size: 18px;
        padding-bottom: 10px;
    }
}

/* CSS cho máy tính */
@media (min-width: 1024px) {
    .title-main {
        font-size: 20px;
        padding-bottom: 12px;
    }
}
</style>
