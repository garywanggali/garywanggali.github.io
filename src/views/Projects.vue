<template>
  <div class="projects-page" id="projects" :style="backgroundStyle">
    <div class="projects-content">
      <h1 class="page-title">{{ $t('projects.pageTitle') }}</h1>
      <n-grid :cols="3" :x-gap="24" :y-gap="24">
        <n-grid-item v-for="project in sortedProjects" :key="project.id">
          <n-card
            class="project-card"
            :class="{ 'top-project': project.isTop }"
            :hoverable="true"
            @click="goToDetail(project.id)"
          >
            <!-- 置顶标签 -->
            <div v-if="project.isTop" class="top-label">{{ $t('projects.topLabel') }}</div>

            <img :src="project.cover" class="cover" alt="cover" />
            <h3 class="title">{{ displayTitle(project) }}</h3>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </div>
</template>

<script>
import { NGrid, NGridItem, NCard } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import ProjectsBg from '../assets/projects.jpg'

export default {
  name: 'Projects',
  components: { NGrid, NGridItem, NCard },
  data() {
    return {
      projects: [],
      bgImage: ProjectsBg
    }
  },
  async mounted() {
    try {
      const res = await fetch('/projects.json')
      let data = await res.json()
      data = data.map(p => ({
        ...p,
        isTop: p.id === 6
      }))
      this.projects = data
    } catch (err) {
      console.error('加载项目数据失败', err)
    }

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
    displayTitle(project) {
      if (typeof project.title === 'string') return project.title
      const l = this.locale
      return project.title?.[l] ?? project.title?.en ?? ''
    },
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
      if (top < container.clientHeight / 2 && bottom > container.clientHeight / 2) {
        this.$emit('update-active-section', 'projects')
      }
    }
  },
  setup() {
    const { locale } = useI18n()
    return { locale }
  },
  computed: {
    sortedProjects() {
      return [...this.projects].sort((a, b) => (b.isTop ? 1 : 0) - (a.isTop ? 1 : 0))
    },
    backgroundStyle() {
      return {
        width: '100%',
        minHeight: '100vh',
        padding: '60px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${this.bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    }
  }
}
</script>

<style scoped>
.projects-content {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
}

.project-card {
  position: relative; /* 使角标定位相对卡片 */
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease;
  text-align: center;
  border-radius: 16px;
  overflow: hidden;
  background-color: #fff;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 高亮置顶项目 */
.top-project {
  border: 3px solid #ffbf00;
  background-color: #fffbe6;
}

/* 置顶标签 */
.top-label {
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: #ffbf00;
  color: #fff;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 10;
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
  color: #333;
}
</style>
