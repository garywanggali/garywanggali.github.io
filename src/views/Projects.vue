<template>
  <div class="projects-page" id="projects">
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

    // 绑定滚动事件，发给 App.vue
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
    goToDetail(id) {
      this.$router.push({ name: 'ProjectDetail', params: { id } })
    },

    onScroll() {
      const container = document.querySelector('.page-content')
      if (!container) return

      const el = document.getElementById('projects')
      if (!el) return

      const rect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const top = rect.top - containerRect.top
      const bottom = rect.bottom - containerRect.top

      // 当 projects 在页面中可见时，发事件给 App.vue
      if (top < container.clientHeight / 2 && bottom > container.clientHeight / 2) {
        this.$emit('update-active-section', 'projects')
      }
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
