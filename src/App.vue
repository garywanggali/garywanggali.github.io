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
    // 如果是 Home 内部的 section
    const homeSections = ['home', 'skills', 'about', 'projects', 'contact']
    if (homeSections.includes(pageName.toLowerCase())) {
      // 如果不在 Home 页，先跳到 Home
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' }).then(() => {
          // 等 Vue 渲染完成，再滚动
          this.$nextTick(() => this.scrollToSection(pageName))
        })
      } else {
        // 已在 Home 页，直接滚动
        this.scrollToSection(pageName)
      }
    } else {
      // 外部页面直接路由跳转
      this.$router.push({ name: pageName })
    }
    this.menuOpen = false
  },
  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId.toLowerCase())
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  openLink(url) {
    window.open(url, '_blank')
  }
}

}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.9); /* 半透明 */
  backdrop-filter: blur(8px); /* 毛玻璃效果 */
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.logo {
  font-size: 22px;
  font-weight: bold;
  color: #007bff;
  transition: transform 0.2s, color 0.2s;
}

.logo:hover {
  transform: scale(1.05);
  color: #0056b3;
}


.nav-buttons .n-button {
  font-weight: 500;
  color: #333;
  position: relative;
  transition: color 0.3s;
}

.nav-buttons .n-button::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: #007bff;
  left: 0;
  bottom: -4px;
  transition: width 0.3s;
}

.nav-buttons .n-button:hover::after,
.nav-buttons .active::after {
  width: 100%;
}


.social-icons .n-button {
  transition: transform 0.2s;
}

.social-icons .n-button:hover {
  transform: scale(1.2);
  color: #007bff;
}


.mobile-menu-btn {
  display: none;
  color: #007bff;
  transition: transform 0.2s;
}

.mobile-menu-btn:hover {
  transform: scale(1.2);
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
