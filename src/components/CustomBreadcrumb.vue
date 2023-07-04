<template>
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '' }">Tổng quan</el-breadcrumb-item>
            <el-breadcrumb-item>
                <span class="span">{{ title }} </span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <span class="span">{{ content }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
}
</script>

<style>
.breadcrumb {
    margin-bottom: 25px;
    background-color: #f3f5f7;
}
span .span {
    color: #7e84a3;
    text-decoration: underline;
    cursor: pointer;
}
</style>
