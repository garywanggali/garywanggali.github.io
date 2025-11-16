<template>
  <div class="skills-background">
    <n-card class="skills-card" bordered>
      <h1>{{ $t('skills.title') }}</h1>
      <p>{{ $t('skills.desc') }}</p>
      
      <n-space vertical size="medium">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-header">
            <span>{{ skill.name }}</span>
          </div>
          <n-progress
            :percentage="skill.level"
            :show-value="true"
            type="line"
            :height="18"
            :color="progressColor(skill.level)"
            style="width: 100%"
          />
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<script>
import { NCard, NSpace, NProgress } from 'naive-ui'

export default {
  name: 'Skills',
  components: { NCard, NSpace, NProgress },
  data() {
    return {
      skills: [
        { name: 'HTML/CSS', level: 35 },
        { name: 'JavaScript / Vue.js', level: 25 },
        { name: 'Python', level: 45 },
        { name: 'C++', level: 40 },
        { name: 'SQL / MySQL', level: 30 },
        { name: 'Git / GitHub', level: 20 },
        { name: 'AI / Machine Learning Basics', level: 5 }
      ]
    }
  },
  methods: {
    progressColor(level) {
      if (level >= 85) return '#4caf50' // 高级绿色
      if (level >= 50) return '#ff9800' // 中级橙色
      return '#f44336' // 新手红色
    }
  }
}
</script>

<style scoped>
.skills-background {
  height: 100vh; /* 一屏高度 */
  width: 100vw;  /* 占满整个屏幕宽度 */
  display: flex;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  
  /* 背景图 + 渐变叠加 */
  background-image: 
    linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), /* 半透明黑色遮罩，让文字更清晰 */
    url('../assets/skills.jpg'); /* 你的背景图片路径 */
  background-size: cover;       /* 图片拉伸填满屏幕 */
  background-position: center;  /* 图片居中 */
  background-repeat: no-repeat;

  padding: 20px;
  scroll-snap-align: start;     /* 保持 scroll-snap */
}


.skills-card {
  max-width: 600px;       /* 更紧凑 */
  width: 100%;
  padding: 20px 30px;     /* 缩小内边距 */
  border-radius: 16px;
  background-color: rgba(255,255,255,0.95);
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  text-align: left;
}

.skills-card h1 {
  font-size: 28px;          /* 缩小标题 */
  margin-bottom: 8px;
  text-align: center;
}

.skills-card p {
  font-size: 14px;          /* 缩小描述文字 */
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.skill-item {
  margin-bottom: 12px;      /* 缩小间距 */
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-weight: 500;
  color: #333;
  font-size: 14px;          /* 缩小字体 */
}

.n-progress {
  height: 18px;             /* 缩小进度条高度 */
}
</style>