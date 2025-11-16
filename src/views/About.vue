<template>
  <div class="about-background" :style="backgroundStyle">
    <div class="about-content">
      <h1 class="page-title">{{ $t('home.aboutCard.title') }}</h1>

      <!-- 选项按钮 -->
      <div class="about-tabs">
        <button 
          :class="{ active: activeTab === 'tech' }" 
          @click="activeTab = 'tech'">
          {{ currentAbout.tech?.title || '' }}
        </button>
        <button 
          :class="{ active: activeTab === 'nonTech' }" 
          @click="activeTab = 'nonTech'">
          {{ currentAbout.nonTech?.title || '' }}
        </button>
      </div>

      <!-- 内容卡片 -->
      <div v-if="activeTab === 'tech' && currentAbout.tech" class="about-card">
        <p>{{ currentAbout.tech.content }}</p>
      </div>

      <div v-if="activeTab === 'nonTech' && currentAbout.nonTech" class="about-card">
        <p>{{ currentAbout.nonTech.content }}</p>
      </div>

    </div>
  </div>
</template>




<script>
import AboutBg from '../assets/about.jpg'
import { useI18n } from 'vue-i18n'

export default {
  name: 'About',
  data() {
    return {
      about: {},
      bgImage: AboutBg,
      activeTab: 'tech' // 默认显示技术经历
    }
  },
  async mounted() {
    try {
      const res = await fetch('/about.json')
      this.about = await res.json()
    } catch (err) {
      console.error('加载 About 数据失败', err)
    }
  },
  computed: {
    backgroundStyle() {
      return {
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${this.bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        padding: '60px',
        boxSizing: 'border-box'
      }
    }
    ,
    currentAbout() {
      const l = this.locale
      if (!this.about) return { tech: { title: '', content: '' }, nonTech: { title: '', content: '' } }
      return this.about?.[l] ?? this.about?.en ?? {}
    }
  },
  setup() {
    const { locale } = useI18n()
    return { locale }
  }
}
</script>


<style scoped>
/* 整体字体设置 */
.about-content {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  font-family: 'Noto Sans SC', 'Roboto', sans-serif; /* 中文+英文兼容 */
}

.page-title {
  font-size: 42px;
  font-weight: 900; /* 更粗更有存在感 */
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
  font-family: 'Noto Sans SC', 'Roboto', sans-serif;
}

.about-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.about-tabs button {
  padding: 10px 24px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #fff;
  border-radius: 8px;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Noto Sans SC', 'Roboto', sans-serif;
}

.about-tabs button.active,
.about-tabs button:hover {
  background-color: rgb(64, 142, 214);
  color: #000;
  border-color: rgb(64, 142, 214);
}

/* 内容卡片样式 */
.about-card {
  background-color: rgba(255, 255, 255, 0.9); /* 半透明白色 */
  padding: 30px 24px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  color: #333;
  font-size: 18px;
  line-height: 1.8;
  transition: all 0.3s;
  font-family: 'Noto Sans SC', 'Roboto', sans-serif;
}

.about-card h2 {
  font-size: 28px;
  margin-bottom: 12px;
  color: rgb(11, 58, 247); /* 可以根据内容不同改颜色 */
  font-weight: 700;
}

</style>
