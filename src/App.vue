<template>
  <n-layout>
    <!-- 顶部导航栏 -->
    <n-layout-header class="header">
      <div class="logo" @click="goPage('Home')" style="cursor:pointer;">Gary Wang</div>

      <!-- 导航按钮 -->
      <n-space align="center" :size="32" class="nav-buttons">
        <n-button text :class="{ active: activeSection==='home' }" @click="goPage('Home')">Home</n-button>
        <n-button text :class="{ active: activeSection==='about' }" @click="goPage('About')">About</n-button>
        <n-button text :class="{ active: activeSection==='skills' }" @click="goPage('Skills')">Skills</n-button>
        <n-button text :class="{ active: activeSection==='projects' }" @click="goPage('Projects')">Projects</n-button>
        <n-button text :class="{ active: activeSection==='bloglist' }" @click="goPage('BlogList')">Blog</n-button>
        <n-button text :class="{ active: activeSection==='contact' }" @click="goPage('Contact')">Contact</n-button>
      </n-space>

      <!-- 社交图标 -->
      <div class="social-icons">
        <n-button circle size="small" text @click="openLink('https://github.com/garywanggali')">
          <template #icon>
            <LogoGithub />
          </template>
        </n-button>
      </div>

      <!-- 移动端汉堡按钮 -->
      <n-button class="mobile-menu-btn" text @click="menuOpen = true">
        <template #icon>
          <component :is="MenuOutline" />
        </template>
      </n-button>
    </n-layout-header>

    <!-- 移动端抽屉菜单 -->
    <n-drawer v-model:show="menuOpen" placement="right">
      <n-space vertical :size="24">
        <n-button text :class="{ active: activeSection==='home' }" @click="goPage('Home')">Home</n-button>
        <n-button text :class="{ active: activeSection==='about' }" @click="goPage('About')">About</n-button>
        <n-button text :class="{ active: activeSection==='skills' }" @click="goPage('Skills')">Skills</n-button>
        <n-button text :class="{ active: activeSection==='projects' }" @click="goPage('Projects')">Projects</n-button>
        <n-button text :class="{ active: activeSection==='bloglist' }" @click="goPage('BlogList')">Blog</n-button>
        <n-button text :class="{ active: activeSection==='contact' }" @click="goPage('Contact')">Contact</n-button>
      </n-space>
    </n-drawer>

    <!-- 页面内容 -->
    <n-layout-content>
      <router-view></router-view>
    </n-layout-content>
  </n-layout>
</template>

<script>
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NDrawer } from 'naive-ui'
import { LogoGithub, MenuOutline } from '@vicons/ionicons5'

export default {
  name: 'App',
  components: {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NButton,
    NSpace,
    NDrawer,
    LogoGithub,
    MenuOutline
  },
  data() {
    return {
      menuOpen: false
    }
  },
  computed: {
    // 根据当前路由 name 自动判断高亮
    activeSection() {
      return this.$route.name ? this.$route.name.toLowerCase() : ''
    }
  },
  methods: {
    goPage(pageName) {
      this.$router.push({ name: pageName })
      this.menuOpen = false
    },
    openLink(url) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* logo */
.logo {
  font-size: 22px;
  font-weight: bold;
  color: #007bff;
}

/* 导航按钮 */
.nav-buttons .n-button {
  font-weight: 500;
  color: #333;
  transition: color 0.3s, transform 0.2s;
}

.nav-buttons .n-button:hover {
  color: #007bff;
  transform: translateY(-2px);
}

.nav-buttons .active {
  color: #007bff;
  font-weight: bold;
}

/* 社交图标 */
.social-icons {
  display: flex;
  gap: 12px;
}

.social-icons .n-button:hover {
  color: #007bff;
}

/* 移动端按钮 */
.mobile-menu-btn {
  display: none;
}

@media (max-width: 768px) {
  .nav-buttons {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}
</style>
