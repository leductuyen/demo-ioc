<template>
    <div>
        <div class="main-wrapper" :class="{ active: activeThemeIcon === 'dark' }">
            <Header v-if="!navigation" />
            <div class="layout">
                <LeftBar v-if="!navigation" />
                <div class="home">
                    <div class="page">
                        <router-view />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

import Header from './components/Header.vue'
import LeftBar from './components/LeftBar.vue'

export default {
    name: 'app',
    components: {
        Header,
        LeftBar
    },
    data() {
        return {
            navigation: null
        }
    },
    created() {
        this.checkRoute()
    },
    computed: {
        ...mapState(['activeThemeIcon'])
    },
    methods: {
        checkRoute() {
            if (
                this.$route.name === 'LoginSSO' ||
                this.$route.name === 'Login' ||
                this.$route.name === 'Sign-up' ||
                this.$route.name === 'Forgot-password'
            ) {
                this.navigation = true
                return
            } else {
                this.navigation = false
            }
        }
    },
    watch: {
        $route() {
            this.checkRoute()
        }
    }
}
</script>
<style>
.main-wrapper {
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    background-color: #f3f5f7;
    overflow-x: hidden;
}

.main-wrapper.active {
    background: #1d1d42;
    color: #fff;
    border-bottom: 1px solid #1d1d42;
}
.main-wrapper .layout {
    display: flex;
}
.main-wrapper .home {
    flex: 9;
}
.home .page {
    padding: 1rem 1.15rem;
    background-color: #f3f5f7;
}
@media (max-width: 768px) {
    .home .page {
        padding: 0;
    }
    .main-wrapper .home {
        flex: initial;
        width: 100%;
    }
}
</style>
