<template>
  <div class="about-page">
    <h1 class="page-title">About Me</h1>

    <n-card class="about-card" v-if="about.tech">
      <h2>{{ about.tech.title }}</h2>
      <p>{{ about.tech.content }}</p>
    </n-card>

    <n-card class="about-card" v-if="about.nonTech">
      <h2>{{ about.nonTech.title }}</h2>
      <p>{{ about.nonTech.content }}</p>
    </n-card>
  </div>
</template>

<script>
import { NCard } from 'naive-ui'

export default {
  name: 'About',
  components: { NCard },
  data() {
    return {
      about: {}
    }
  },
  async mounted() {
    try {
      const res = await fetch('/about.json')
      this.about = await res.json()
    } catch (err) {
      console.error('加载 About 数据失败', err)
    }
  }
}
</script>

<style scoped>
.about-page {
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.about-card {
  padding: 24px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.about-card h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.about-card p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}
</style>
