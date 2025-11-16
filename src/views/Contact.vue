<template>
  <div class="contact-background" :style="backgroundStyle" id="contact">
    <n-card class="contact-card" bordered>
      <h1>{{ $t('contact.title') }}</h1>
      <p>{{ $t('contact.prompt') }}</p>
      <n-space vertical size="large">
        <div class="contact-item">
          <strong>{{ $t('contact.google') }}:</strong>
          <a :href="'mailto:' + GoogleEmail">{{ GoogleEmail }}</a>
        </div>
        <div class="contact-item">
          <strong>{{ $t('contact.qq') }}:</strong>
          <a :href="'mailto:' + QQEmail">{{ QQEmail }}</a>
        </div>
        <div class="contact-item">
          <strong>{{ $t('contact.github') }}:</strong>
          <a :href="github" target="_blank">{{ github }}</a>
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<script>
import { NCard, NSpace } from 'naive-ui'
import ContactBg from '../assets/contact.jpg' // 注意路径

export default {
  name: 'Contact',
  components: { NCard, NSpace },
  data() {
    return {
      GoogleEmail: 'garywang.gali@gmail.com',
      QQEmail: 'garywang.gali@qq.com',
      github: 'https://github.com/garywanggali',
      bgImage: ContactBg
    }
  },
  computed: {
    backgroundStyle() {
      return {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `linear-gradient(135deg, rgba(107,115,255,0.5) 0%, rgba(0,13,255,0.5) 100%), url(${this.bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'hidden'
      }
    }
  }
}
</script>

<style scoped>
.contact-card {
  max-width: 600px;
  width: 100%;
  padding: 50px 40px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
}

.contact-card h1 {
  margin-bottom: 20px;
  font-size: 36px;
  color: #1a1a1a;
}

.contact-card p {
  margin-bottom: 40px;
  color: #333;
  font-size: 18px;
}

.contact-item {
  font-size: 18px;
  margin-bottom: 12px;
}

.contact-item a {
  color: #1a73e8;
  text-decoration: none;
  margin-left: 8px;
  transition: color 0.2s;
}

.contact-item a:hover {
  color: #0c47b7;
  text-decoration: underline;
}
</style>
