<template>
    <div
        class="header"
        :class="{
            'fixed-header': isFixedHeader,

            active: activeThemeIcon === 'dark'
        }"
    >
        <div class="header-layout">
            <div class="header-left">
                <a class="logo" v-if="!isCollapseLeftBar">
                    <img src="./../assets/img/logoBig.png" alt="Logo" />
                </a>
                <a v-else class="logo">
                    <img src="./../assets/img/logoSmall.jpg" alt="Logo" />
                </a>
                <button @click="toggleCollapseLeftBar">
                    <div class="border">
                        <el-icon name="back" v-if="!isCollapseLeftBar"></el-icon>
                        <el-icon name="right" v-else></el-icon>
                    </div>
                </button>
            </div>
            <!-- <div class="header-right">
                <div class="bell">
                    <el-icon name="bell"></el-icon>
                </div>
                <div class="user-info">
                    <el-icon name="s-custom"></el-icon>
                </div>
                <div class="mode-light">
                    <div
                        :class="{ active: activeThemeIcon === 'light' }"
                        @click="setActiveThemeIcon('light')"
                    >
                        <el-icon name="sunny"></el-icon>
                    </div>
                    <div
                        :class="{ active: activeThemeIcon === 'dark' }"
                        @click="setActiveThemeIcon('dark')"
                    >
                        <el-icon name="moon"></el-icon>
                    </div>
                    <CustomButton
                        icon="el-icon-menu"
                        label=""
                        size="small"
                        @click="toggleMobileMenu"
                    />
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import { Icon } from 'element-ui'
import CustomButton from './CustomButton.vue'
import 'element-ui/lib/theme-chalk/index.css'
import { mapMutations, mapState } from 'vuex'
import { permission_ioc } from '@/mock_data'
export default {
    name: 'HeaderComponent',
    components: { 'el-icon': Icon },
    methods: {
        ...mapMutations(['SET_COLLAPSE_LEFT_BAR']),
        toggleCollapseLeftBar() {
            this.SET_COLLAPSE_LEFT_BAR(!this.isCollapseLeftBar)
        },
        ...mapMutations(['toggleLeftBar', 'setActiveThemeIcon']),
        handleScroll() {
            const header = document.querySelector('.header')
            const headerHeight = header.offsetHeight
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop

            this.isFixedHeader = scrollTop > headerHeight
        },
        toggleMobileMenu() {
            this.isMobileMenuOpen = !this.isMobileMenuOpen
        }
    },
    data() {
        return {
            isFixedHeader: false,
            isMobileMenuOpen: false,
            permission: permission_ioc,
            dataMenu: [],
            selectedItem: null,
            activeIndex: null
        }
    },
    computed: {
        ...mapState(['isCollapseLeftBar']),
        ...mapState(['activeThemeIcon']),

        isCollapsed() {
            return this.leftBarCollapsed
        },
        activeThemeIcon() {
            return this.$store.state.activeThemeIcon
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>
<style scoped>
.header {
    background: #fff;
    position: sticky;
    top: 0;
    height: 60px;
    border-bottom: 1px solid #f5f6fa;
    z-index: 1001;
    width: 100%;
    transition: top 0.2s ease-in-out;
}

.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
.header.active {
    background: #1d1d42;
    border-bottom: 1px solid #1d1d42;
}
.header .header-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.border {
    background-color: #fff;
    padding: 3px 7px 3px 7px;
    border-radius: 50%;
}
.header .header-left {
    float: left;
    height: 60px;
    padding: 0 15px;
    position: relative;
    text-align: left;

    z-index: 1;
    transition: all 0.2s ease-in-out;
    display: flex;
    display: -ms-flexbox;
    align-items: center;
    justify-content: space-between;
}
.header .header-left .logo {
    display: inline-block;
}
.header .header-left .logo img {
    max-height: 45px;
    width: auto;
}
.header .header-left button {
    border: none;
    background: none;
    padding: 0;
    margin-left: 15px;
}
.header-left .logo.logo-small {
    display: none;
}
.header-left .logo.logo.logo-small img {
    width: 30px;
    height: 30px;
}
.header-right {
    padding-right: 20px;
    display: flex;
    align-items: center;
}
.header-right .mode-light {
    width: 56px;
    height: 28px;
    background-color: #fff;
    font-size: 16px;
    display: flex;
    display: -ms-flexbox;
    justify-content: space-evenly;
    align-items: center;
    border: 1px solid rgba(66, 139, 193, 0.22);
    border-radius: 3px;
    margin: 15px 15px 15px 0;
    padding: 1px;
    cursor: pointer;
}

.header-right .mode-light .active {
    background-color: blue;
    color: #fff;
    padding: 0px 5px 0px 5px;
}
.header-right .bell {
    padding: 0px 20px 0px 20px;
}
.header-right .user-info {
    margin-right: 20px;
}
</style>
