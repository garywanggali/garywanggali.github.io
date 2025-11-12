<template>
  <div class="projects-page">
    <h1 class="page-title">My Projects</h1>
    <n-grid :cols="3" :x-gap="24" :y-gap="24">
      <n-grid-item v-for="project in projects" :key="project.id">
        <n-card
          class="project-card"
          :hoverable="true"
          @click="goToDetail(project.id)"
        >
          <img :src="project.cover" class="cover" alt="cover" />
          <h3 class="title">{{ project.title }}</h3>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script>
import { NGrid, NGridItem, NCard } from 'naive-ui'

export default {
  name: 'Projects',
  components: { NGrid, NGridItem, NCard },
  data() {
    return {
      projects: []
    }
  },
  async mounted() {
    try {
      const res = await fetch('/projects.json')
      this.projects = await res.json()
    } catch (err) {
      console.error('加载项目数据失败', err)
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push({ name: 'ProjectDetail', params: { id } })
    }
  }
}
</script>

<style scoped>
.projects-page {
  padding: 60px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}

.project-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  text-align: center;
  border-radius: 16px;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.cover {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.title {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
}
</style>
