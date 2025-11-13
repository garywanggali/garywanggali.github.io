<template>
  <div class="contact-background" id="contact">
    <n-card class="contact-card" bordered>
      <h1>Contact Me</h1>
      <p>Feel free to reach out to me via the following channels:</p>
      <n-space vertical size="large">
        <div class="contact-item">
          <strong>Google Email:</strong>
          <a :href="'mailto:' + email">{{ GoogleEmail }}</a>
        </div>
        <div class="contact-item">
          <strong>QQ Email:</strong>
          <a :href="'mailto:' + email">{{ QQEmail }}</a>
        </div>
        <div class="contact-item">
          <strong>GitHub:</strong>
          <a :href="github" target="_blank">{{ github }}</a>
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<script>
import { NCard, NSpace } from 'naive-ui'

export default {
  name: 'Contact',
  components: { NCard, NSpace },
  data() {
    return {
      GoogleEmail: 'garywang.gali@gmail.com',
      QQEmail: 'garywang.gali@qq.com',
      github: 'https://github.com/garywanggali',
    }
  },
  mounted() {
    const container = document.querySelector('.page-content')
    if (container) {
      container.addEventListener('scroll', this.onScroll)
      this.$nextTick(() => this.onScroll())
    }
  },
  beforeUnmount() {
    const container = document.querySelector('.page-content')
    if (container) container.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const container = document.querySelector('.page-content')
      if (!container) return

      const el = document.getElementById('contact')
      if (!el) return

      const rect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const top = rect.top - containerRect.top
      const bottom = rect.bottom - containerRect.top

      if (top < container.clientHeight / 2 && bottom > container.clientHeight / 2) {
        this.$emit('update-active-section', 'contact')
      }
    }
  }
}
</script>

<style scoped>
.contact-background {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  padding: 40px 20px;
}

.contact-card {
  max-width: 600px;
  padding: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.contact-card h1 {
  margin-bottom: 20px;
  font-size: 32px;
}

.contact-card p {
  margin-bottom: 30px;
  color: #333;
  font-size: 16px;
}

.contact-item {
  font-size: 18px;
}

.contact-item a {
  color: #007bff;
  text-decoration: none;
  margin-left: 8px;
}

.contact-item a:hover {
  text-decoration: underline;
}
</style>
