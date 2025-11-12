<template>
  <div class="skills-background">
    <n-card class="skills-card" bordered>
      <h1>My Skills</h1>
      <p>Here are some of the computer-related skills I have learned and practiced:</p>
      
      <n-space vertical size="large">
        <div v-for="skill in skills" :key="skill.name" class="skill-item">
          <div class="skill-header">
            <span>{{ skill.name }}</span>
          </div>
          <!-- 修正 value 范围为 0~1，并设置高度和颜色 -->
            <n-progress
            :percentage="skill.level"
            :show-value="true"
            type="line"
            :height="25"
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
      // 根据技能水平返回不同颜色
      if (level >= 85) return '#4caf50' // 绿色
      if (level >= 70) return '#ff9800' // 橙色
      return '#f44336' // 红色
    }
  }
}
</script>

<style scoped>
.skills-background {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(135deg, #6b73ff 0%, #000dff 100%);
  padding: 60px 20px;
}

.skills-card {
  max-width: 800px;
  width: 100%;
  padding: 40px;
  border-radius: 20px;
  background-color: rgba(255,255,255,0.95);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  text-align: left;
}

.skills-card h1 {
  font-size: 32px;
  margin-bottom: 10px;
  text-align: center;
}

.skills-card p {
  font-size: 16px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.skill-item {
  margin-bottom: 20px;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-weight: 500;
  color: #333;
}
</style>
