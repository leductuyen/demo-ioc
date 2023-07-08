<template>
    <div
        class="leftBar"
        :class="{ active: activeThemeIcon === 'dark' }"
        :style="{ width: leftBarWidth }"
    >
        <div class="menu-title">
            <span>{{ this.authUser.display_name }}</span>
            <span v-if="isCollapseLeftBar === false">
                <hr />
            </span>
        </div>

        <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#131523"
            active-text-color="#0CE0FF"
            :collapse="isCollapseLeftBar"
        >
            <template v-for="item in permission">
                <el-submenu
                    mode="horizontal"
                    v-if="item.hasChildren"
                    :key="item.path"
                    :index="item.path"
                    @click="navigateRouter(item.path)"
                >
                    <template slot="title">
                        <i :class="item.icon"></i>

                        <span
                            style="font-family: 'Source Sans Pro', sans-serif"
                            @click="navigateRouter(item.path)"
                            v-loading.fullscreen.lock="fullscreenLoading"
                        >
                            {{ item.name }}
                        </span>
                    </template>
                    <template v-for="(child, index) in item.children">
                        <el-submenu
                            v-if="child.hasChildren"
                            :key="index"
                            :index="child.path"
                        >
                            <template slot="title">
                                {{ child.name }}
                                >
                            </template>
                            <el-menu-item
                                v-for="grandchild in child.children"
                                :key="grandchild.path"
                                :index="grandchild.path"
                                @click="navigateRouter(grandchild.path)"
                            >
                                {{ grandchild.name }}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item
                            v-else
                            :key="child.path"
                            :index="child.path"
                            @click="navigateRouter(child.path)"
                        >
                            <i :class="child.icon"></i>
                            {{ child.name }}</el-menu-item
                        >
                    </template>
                </el-submenu>
                <el-menu-item v-else :key="item.path" :index="item.path">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span @click="navigateRouter(item.path)">
                        {{ item.name }}
                    </span>
                </el-menu-item>
            </template>
        </el-menu>

        <div class="menu-title">
            <span v-if="isCollapseLeftBar === true" class="icon">
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="Đăng xuất"
                    placement="right"
                >
                    <div class="btn-icon">
                        <CustomButton
                            label=""
                            size="small"
                            icon="el-icon-d-arrow-left"
                            type="text"
                            @click="handleLogout"
                        />
                    </div>
                </el-tooltip>
            </span>
            <span v-if="isCollapseLeftBar === false">
                <div style="margin-left: 4px">
                    <CustomButton
                        label="Đăng xuất"
                        size="small"
                        icon="el-icon-d-arrow-left"
                        type="text"
                        @click="handleLogout"
                    />
                </div>
            </span>
        </div>
    </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'
import { permission_ioc } from '@/mock_data'
import { mapMutations, mapState } from 'vuex'
import CustomButton from './CustomButton.vue'
export default {
    name: 'LeftBar',
    components: { CustomButton },
    data() {
        return {
            dataLeftBar: [],
            permission: permission_ioc,
            dataMenu: [],
            activeMenu: null,
            fullscreenLoading: false
        }
    },
    computed: {
        ...mapState(['activeThemeIcon']),
        ...mapState({
            authUser: (state) => state.auth.user
        }),
        ...mapState(['isCollapseLeftBar']),
        activeThemeIcon() {
            return this.$store.state.activeThemeIcon
        },
        leftBarWidth() {
            return this.isCollapseLeftBar ? '60px' : '300px' // Đặt giá trị chiều rộng tương ứng
        }
    },

    methods: {
        navigateRouter(path) {
            if (this.$route.path !== path) {
                this.fullscreenLoading = true
                setTimeout(() => {
                    this.fullscreenLoading = false
                }, 1000)
                // Kiểm tra xem đường dẫn có tồn tại trong router hay không
                const route = this.$router.resolve({ path })

                if (route.resolved.matched.length > 0) {
                    // Chuyển hướng nếu đường dẫn tồn tại trong router và khác với đường dẫn hiện tại
                    this.$router.push(path)
                } else {
                    // Xử lý khi đường dẫn không tồn tại trong router
                    console.log(`Đường dẫn ${path} không tồn tại`)
                    // Hiển thị thông báo lỗi hoặc thực hiện xử lý khác
                }
                localStorage.setItem('activeMenu', path)
                localStorage.setItem('activeUI', path)
            }
        },
        toggleSelect(item) {
            if (item.hasChildren) {
                item.showSelect = !item.showSelect
            }
        },
        handleSelectChange(item, child) {
            this.selectedOption = child

            if (child && child.path) {
                const route = this.$router.resolve({ path: child.path })

                if (route.resolved.matched.length > 0) {
                    this.$router.push(child.path)
                } else {
                    console.log(`Đường dẫn ${child.path} không tồn tại`)
                    // Hiển thị thông báo lỗi hoặc thực hiện xử lý khác
                }
            }
        },

        getIconElementUi(index) {
            const icons = ['el-icon-menu', 'el-icon-document', 'el-icon-set-up']
            return icons[index % icons.length]
        },
        handleLogout() {
            localStorage.clear()
            this.fullscreenLoading = true
            setTimeout(() => {
                this.fullscreenLoading = false
                this.$router.push('/login')
            }, 1000)
        }
    },

    mounted() {
        // Khôi phục trạng thái active từ Local Storage
        this.activeMenu = localStorage.getItem('activeMenu')
        const activeUI = localStorage.getItem('activeUI')
        if (activeUI && this.$route.path !== activeUI) {
            // Kiểm tra đường dẫn có khác với đường dẫn hiện tại không
            const route = this.$router.resolve({ path: activeUI })
            if (route.resolved.matched.length > 0) {
                this.$router.push(activeUI)
            } else {
                console.log(`Đường dẫn ${activeUI} không tồn tại`)
                // Hiển thị thông báo lỗi hoặc thực hiện xử lý khác
            }
        }
    }
}
</script>

<style scoped>
.leftBar {
    width: 300px;
    transition: width 0.3s ease;
    position: sticky;
    top: 60px;
    overflow-y: auto;

    background-color: #fff;

    z-index: 1001;

    height: calc(100vh - 60px);
}
.leftBar.active {
    background: #1d1d42;
    color: #fff;
}
.leftBar::-webkit-scrollbar {
    width: 5px;
    background: #7e84a3;

    height: 3px;
}

.leftBar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #7e84a3;
    border-radius: 10px;
}

.leftBar::-webkit-scrollbar-thumb {
    background: #7e84a3;

    border-radius: 10px;
}
.leftBar::-webkit-scrollbar-thumb:hover {
    background: #7e84a3;
}

.menu-title {
    font-size: 14px;
    font-weight: 600;
    opacity: 1;
    padding: 5px 15px;
    white-space: nowrap;
}
.layout-btn {
    display: flex;

    flex-direction: row;
    align-items: center;
}

.menu-title hr {
    border-top: 1px solid gray;
    content: '';
    margin: -2px auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    right: 20px;
    bottom: 0;
    width: 83%;
    z-index: -1;
}
.btn-icon {
    text-align: center;
    margin-left: 4px;
}
@media (max-width: 768px) {
    .leftBar {
        display: none;
    }
}
</style>
