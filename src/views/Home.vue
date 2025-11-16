<template>
  <div class="home-page">
    <!-- 第一屏：Hero -->
    <section
      class="hero-section"
      :style="{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgImage})`
      }"
      id="home"
    >
      <div class="sidebar">
        <img :src="photo" alt="Gary Wang" class="avatar" />
        <h1 class="name">Gary Wang</h1>
        <p class="role">{{ $t('home.sidebar.role') }}</p>
        <p class="interest">{{ $t('home.sidebar.interest1') }}</p>
        <p class="interest">{{ $t('home.sidebar.interest2') }}</p>
      </div>

      <div class="about-section">
        <div class="about-section-card">
          <h2>{{ $t('home.aboutCard.title') }}</h2>
          <p>
            {{ $t('home.aboutCard.desc') }}
          </p>
          <n-button type="primary" @click="scrollTo('about')">{{ $t('home.aboutCard.learnMore') }}</n-button>
        </div>
      </div>
    </section>

    <!-- 第二屏：About -->
    <section id="about" class="about-page">
      <About />
    </section>

    <!-- 第三屏：Skills -->
    <section id="skills">
      <Skills />
    </section>

    <!-- 第四屏：Projects -->
    <section id="projects">
      <Projects />
    </section>

    <!-- 第五屏：Blog -->
    <section id="bloglist">
      <BlogList />
    </section>

    <!-- 第六屏：Contact -->
    <section id="contact">
      <Contact />
    </section>
  </div>
</template>

<script>
import { NButton, NCard } from 'naive-ui'
import Skills from './Skills.vue'
import Projects from './Projects.vue'
import BlogList from './BlogList.vue'
import Contact from './Contact.vue'
import About from './About.vue'
import GaryPhoto from '../assets/GaryPhoto.jpg'
import BgImage from '../assets/background.jpg'

export default {
  name: 'Home',
  components: { NButton, Skills, Projects, BlogList, Contact, About, NCard },
  data() {
    return {
      photo: GaryPhoto,
      bgImage: BgImage,
      about: {},
      activeSection: 'home' // 当前显示的 section
    }
  },
  methods: {
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    onScroll() {
    const sections = ['home', 'about', 'skills', 'projects', 'bloglist', 'contact']
    const container = this.$el
    for (const id of sections) {
        const el = container.querySelector('#' + id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const top = rect.top - containerRect.top
        const bottom = rect.bottom - containerRect.top
        if (top < container.clientHeight / 2 && bottom > container.clientHeight / 2) {
        if (this.activeSection !== id) {
            this.activeSection = id
            console.log('当前显示 section:', id)
            this.$emit('update-active-section', id) // 发给 App.vue
        }
        break
        }
    }
    },

  },
  async mounted() {
    try {
      const res = await fetch('/about.json')
      this.about = await res.json()
    } catch (err) {
      console.error('加载 About 数据失败', err)
    }

    // 绑定滚动事件
    const container = this.$el
    if (container) {
      container.addEventListener('scroll', this.onScroll)
      this.$nextTick(() => this.onScroll()) // 页面加载时检测一次
    }
  },
  beforeUnmount() {
    const container = this.$el
    if (container) container.removeEventListener('scroll', this.onScroll)
  }
}
</script>


<style scoped>
.home-page {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}

/* 每一屏高度 */
.hero-section,
.about-page,
#skills,
#projects,
#bloglist,
#contact {
  scroll-snap-align: start;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Hero 部分 */
.hero-section {
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
}

/* 左侧个人信息栏 */ .sidebar { flex: 0 0 280px; background-color: rgba(255, 255, 255, 0.1); backdrop-filter: blur(8px); color: white; display: flex; flex-direction: column; align-items: center; padding: 60px 20px; box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1); } .avatar { border: 3px solid #fff; margin-bottom: 20px; width: 140px; height: 140px; border-radius: 50%; object-fit: cover; object-position: center; } .name { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.role, .interest { font-size: 15px; margin: 4px 0; color: #eee; }

/* About Section */
.about-section { flex: 1; display: flex; justify-content: center; align-items: center; padding: 0 120px; }
.about-section-card {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 40px 50px;
  border-radius: 20px;
  max-width: 700px;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}
.about-section-card h2 { font-size: 32px; font-weight: 700; margin-bottom: 20px; color: #ffdf6b; }
.about-section-card p { font-size: 18px; line-height: 1.8; margin-bottom: 24px; }

/* About Page 第二屏 */
.about-page {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 保证父元素高度 */
  padding: 0;    /* 去掉 padding，否则内容可能挤出屏幕 */
}



.page-title { font-size: 32px; font-weight: bold; text-align: center; margin-bottom: 20px; }
.about-card {
  padding: 24px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.about-card h2 { font-size: 24px; margin-bottom: 12px; }
.about-card p { font-size: 18px; line-height: 1.6; color: #333; }
</style>
