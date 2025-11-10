<template>
  <div class="home">
    <div class="profile">
      <img :src="photo" alt="Profile photo" class="profile-photo" />
      <div class="info">
        <h1>Hi, I'm Gary Wang 👋</h1>
        <p>🎓 Student at Yungu High School</p>
        <p>💻 Passionate about web development, AI, and computer science.</p>
        <p>⚽ Football team captain</p>
      </div>
    </div>
  </div>
</template>

<script>
import GaryPhoto from '../assets/GaryPhoto.jpg'

export default {
  name: 'Home',
  data() {
    return {
      photo: GaryPhoto
    }
  }
}
</script>


<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f9f9f9;
  padding: 40px;
}

.profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-photo {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 40px;
  border: 4px solid #4caf50;
}

.info h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.info p {
  font-size: 16px;
  color: #555;
  margin: 6px 0;
}
</style>
