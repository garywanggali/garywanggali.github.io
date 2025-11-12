<template>
  <div class="home-page">
    <!-- 第一屏 -->
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
        <p class="role">Student at Yungu High School</p>
        <p class="interest">Web Dev | AI | CS Enthusiast</p>
        <p class="interest">Football Team Captain</p>
      </div>

      <div class="about-section">
        <div class="about-section-card">
          <h2>About Me</h2>
          <p>
            I started with robotics in elementary school and later learned Scratch, C++, Python, and web development.
            Outside tech, I love football, strategy games, and exploring social topics.
          </p>
          <n-button type="primary" @click="scrollTo('skills')">See My Skills ↓</n-button>
        </div>
      </div>
    </section>

    <!-- 第二屏（Skills） -->
    <section id="skills">
      <Skills />
    </section>
  </div>
</template>

<script>
import { NButton } from 'naive-ui'
import Skills from './Skills.vue'
import GaryPhoto from '../assets/GaryPhoto.jpg'
import BgImage from '../assets/background.jpg'

export default {
  name: 'Home',
  components: { NButton, Skills },
  data() {
    return {
      photo: GaryPhoto,
      bgImage: BgImage
    }
  },
  methods: {
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>

.hero-section {
  display: flex;
  height: 100vh; /* 👈 第一屏仍然一整页 */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: #fff;
}

.home-page {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
}
.hero-section, #skills {
  scroll-snap-align: start;
  height: 100vh;
}



/* 左侧个人信息栏 */
.sidebar {
  flex: 0 0 280px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  border: 3px solid #fff;
  margin-bottom: 20px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.name {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.role, .interest {
  font-size: 15px;
  margin: 4px 0;
  color: #eee;
}

/* 中间 About Me 部分 */
.about-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 120px;
}

.about-section h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #ffdf6b;
}

.about-section p {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 32px;
  max-width: 700px;
}

.n-button {
  align-self: flex-start;
}



/* About Me 外层容器，保证卡片垂直居中 */
.about-section {
  flex: 1;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  padding: 0 120px;        /* 两边留点空间 */
}

/* 半透明卡片包裹文字 */
.about-section-card {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 40px 50px;
  border-radius: 20px;
  max-width: 700px;
  color: #fff;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  font-family: 'Poppins', sans-serif; /* 修改字体 */
}


.about-section-card h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffdf6b;
}

.about-section-card p {
  font-size: 18px;
  line-height: 1.8;
  margin-bottom: 24px;
}


</style>
