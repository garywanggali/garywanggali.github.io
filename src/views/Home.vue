<template>
  <div class="home-background">
    <n-card class="profile-card" bordered>
      <div class="profile-grid">
        <div class="avatar-wrapper">
          <n-avatar :src="photo" size="120" />
        </div>
        <div class="info-wrapper">
          <h1>Hi, I'm Gary Wang 👋</h1>
          <p>🎓 Student at Yungu High School</p>
          <p>💻 Passionate about web development, AI, and computer science.</p>
          <p>⚽ Football team captain</p>
          <div class="cta-buttons">
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script>
import { NCard, NAvatar } from 'naive-ui'
import GaryPhoto from '../assets/GaryPhoto.jpg'

export default {
  name: 'Home',
  components: { NCard, NAvatar },
  data() {
    return { photo: GaryPhoto }
  }
}
</script>

<style scoped>
.home-background {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
}

.profile-card {
  max-width: 900px;
  margin: 40px;
  padding: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 40px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  background-color: rgba(255,255,255,0.9); /* 半透明效果 */
}

.profile-grid {
  display: flex;
  align-items: center;
  gap: 40px;
}

.info-wrapper h1 {
  margin: 0 0 10px 0;
  font-size: 32px;
}

.info-wrapper p {
  margin: 4px 0;
  color: #333;
  font-size: 16px;
}

.cta-buttons {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
</style>
