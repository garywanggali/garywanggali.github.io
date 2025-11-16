<template>
  <n-layout style="height: 100vh;">
    <!-- 顶部导航栏 -->
    <n-layout-header class="header">
      <div class="logo" @click="goPage('home')">Gary Wang</div>

      <n-space align="center" size="large" class="nav-buttons">
        <n-button text :class="{ active: activeSection==='home' }" @click="goPage('home')">{{ $t('nav.home') }}</n-button>
        <n-button text :class="{ active: activeSection==='about' }" @click="goPage('about')">{{ $t('nav.about') }}</n-button>
        <n-button text :class="{ active: activeSection==='skills' }" @click="goPage('skills')">{{ $t('nav.skills') }}</n-button>
        <n-button text :class="{ active: activeSection==='projects' }" @click="goPage('projects')">{{ $t('nav.projects') }}</n-button>
        <n-button text :class="{ active: activeSection==='bloglist' }" @click="goPage('bloglist')">{{ $t('nav.bloglist') }}</n-button>
        <n-button text :class="{ active: activeSection==='contact' }" @click="goPage('contact')">{{ $t('nav.contact') }}</n-button>
      </n-space>

      <!-- 语言切换按钮 -->
      <n-space align="center" size="small" class="lang-switch">
        <n-button size="small" text @click="switchLang('zh')" :disabled="$i18n.locale==='zh'">中</n-button>
        <n-button size="small" text @click="switchLang('en')" :disabled="$i18n.locale==='en'">EN</n-button>
      </n-space>

      <div class="social-icons">
        <n-button circle size="small" text @click="openLink('https://github.com/garywanggali')">
          <template #icon><LogoGithub /></template>
        </n-button>
      </div>

      <n-button class="mobile-menu-btn" text @click="menuOpen = true">
        <template #icon><component :is="MenuOutline" /></template>
      </n-button>
    </n-layout-header>

    <!-- 移动端抽屉 -->
    <n-drawer v-model:show="menuOpen" placement="right">
      <n-space vertical :size="24">
        <n-button text :class="{ active: activeSection==='home' }" @click="goPage('home')">{{ $t('nav.home') }}</n-button>
        <n-button text :class="{ active: activeSection==='about' }" @click="goPage('about')">{{ $t('nav.about') }}</n-button>
        <n-button text :class="{ active: activeSection==='skills' }" @click="goPage('skills')">{{ $t('nav.skills') }}</n-button>
        <n-button text :class="{ active: activeSection==='projects' }" @click="goPage('projects')">{{ $t('nav.projects') }}</n-button>
        <n-button text :class="{ active: activeSection==='bloglist' }" @click="goPage('bloglist')">{{ $t('nav.bloglist') }}</n-button>
        <n-button text :class="{ active: activeSection==='contact' }" @click="goPage('contact')">{{ $t('nav.contact') }}</n-button>
        <n-space align="center" size="small" style="margin-top: 20px;">
          <n-button size="small" text @click="switchLang('zh')" :disabled="$i18n.locale==='zh'">中</n-button>
          <n-button size="small" text @click="switchLang('en')" :disabled="$i18n.locale==='en'">EN</n-button>
        </n-space>
      </n-space>
    </n-drawer>

    <!-- 页面内容 -->
    <n-layout-content class="page-content" style="overflow-y: auto;">
      <router-view @update-active-section="handleUpdateSection" />
    </n-layout-content>
  </n-layout>
</template>

<script>
import { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NDrawer } from 'naive-ui'
import { LogoGithub, MenuOutline } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'

export default {
  name: 'App',
  components: { NLayout, NLayoutHeader, NLayoutContent, NButton, NSpace, NDrawer, LogoGithub, MenuOutline },
  data() {
    return {
      menuOpen: false,
      activeSection: 'home'
    }
  },
  setup() {
    const { locale } = useI18n()
    const switchLang = (lang) => {
      locale.value = lang
    }
    return { switchLang }
  },
  methods: {
    handleUpdateSection(sectionId) {
      this.activeSection = sectionId
    },

    goPage(sectionName) {
      const homeSections = ['home','about','skills','projects','contact','bloglist']
      if(homeSections.includes(sectionName.toLowerCase())){
        if(this.$route.name !== 'Home'){
          this.$router.push({name:'Home'}).then(()=>{
            this.$nextTick(()=>this.scrollToSection(sectionName))
          })
        } else this.scrollToSection(sectionName)
      } else this.$router.push({name:sectionName})
      this.menuOpen = false
    },

    scrollToSection(id){
      const el = document.getElementById(id.toLowerCase())
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'})
    },

    openLink(url){ window.open(url,'_blank') }
  }
}
</script>

<style scoped>
.header{
  position: fixed;
  top:0;
  left:0;
  right:0;
  z-index:999;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  box-shadow:0 4px 16px rgba(0,0,0,0.15);
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 40px;
  height:64px;
}

.logo{ font-size:22px; font-weight:bold; color:#007bff; cursor:pointer; }
.logo:hover{ color:#0056b3; transform:scale(1.05); }

.nav-buttons .n-button{
  font-weight:500;
  color:#333;
  position:relative;
}
.nav-buttons .n-button::after{
  content:''; position:absolute; width:0; height:2px; bottom:-4px; left:0; background:#007bff; transition:width 0.3s;
}
.nav-buttons .n-button:hover::after, .nav-buttons .active::after{ width:100%; }

.social-icons .n-button{ transition: transform 0.2s; }
.social-icons .n-button:hover{ transform:scale(1.2); color:#007bff; }

.mobile-menu-btn{ display:none; color:#007bff; }
.mobile-menu-btn:hover{ transform:scale(1.2); }

.lang-switch .n-button{ font-weight:bold; }

@media(max-width:768px){
  .nav-buttons{ display:none; }
  .mobile-menu-btn{ display:block; }
}
</style>
