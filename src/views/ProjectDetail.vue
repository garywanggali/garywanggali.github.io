<template>
  <div class="project-detail-page" v-if="project">
    <n-button text class="back-btn" @click="goBack()">{{ $t('blogArticle.back') }}</n-button>
    <h1 class="title">{{ displayTitle(project) }}</h1>
    <img :src="project.cover" class="cover" alt="cover" />
    <p class="description">{{ displayDescription(project) }}</p>
    <div v-if="project.link" class="project-link">
      <a :href="project.link" target="_blank" rel="noopener noreferrer">
        {{ $t('projectDetail.visitLink') }}
      </a>
    </div>

   <div
      v-if="project.sections && project.sections.length"
      class="timeline"
    >
      <div
        v-for="(section, idx) in project.sections.filter(s => s.time)"
        :key="idx"
        class="timeline-item"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <p class="timeline-time">{{ section.time }}</p>
          <h2>{{ displaySectionTitle(section) }}</h2>
          <p>{{ displaySectionContent(section) }}</p>
        </div>
      </div>
    </div>

    <div class="extra-sections">
  <div
    v-for="(section, idx) in project.sections.filter(s => !s.time)"
    :key="idx"
    class="project-section"
  >
    <h2>{{ displaySectionTitle(section) }}</h2>
    <p>{{ displaySectionContent(section) }}</p>
  </div>
</div>


    <!-- 视频展示区 -->
    <div v-if="project.video" class="video-section">
      <h2>{{ $t('projectDetail.demoVideo') }}</h2>
      <video
        controls
        :src="project.video"
        class="project-video"
      ></video>
    </div>

    <!-- 技能标签 -->
    <template v-if="project.skills && project.skills.length">
      <h2>{{ $t('projectDetail.skillsUsed') }}</h2>
      <n-space wrap size="small" class="skills-tags">
        <n-tag v-for="skill in project.skills" :key="skill" type="success" size="small">{{ skill }}</n-tag>
      </n-space>
    </template>

    <!-- 更多图片 -->
    <h2 v-if="project.images && project.images.length">{{ $t('projectDetail.moreImages') }}</h2>
    <div class="more-images" v-if="project.images && project.images.length">
      <img v-for="(img, idx) in project.images" :key="idx" :src="img" />
    </div>
  </div>
</template>

<script>
import { NTag, NSpace } from 'naive-ui'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ProjectDetail',
  components: { NTag, NSpace },
  data() {
    return {
      project: null
    }
  },
  async mounted() {
    const id = Number(this.$route.params.id)
    try {
      const res = await fetch('/projects.json')
      const projects = await res.json()
      this.project = projects.find(p => p.id === id)
    } catch (err) {
      console.error('加载项目数据失败', err)
    }
  },
  methods: {
    displayTitle(p) {
      if (!p) return ''
      if (typeof p.title === 'string') return p.title
      const l = this.locale
      return p.title?.[l] ?? p.title?.en ?? ''
    },
    displayDescription(p) {
      if (!p) return ''
      if (typeof p.description === 'string') return p.description
      const l = this.locale
      return p.description?.[l] ?? p.description?.en ?? ''
    },
    displaySectionTitle(s) {
      if (!s) return ''
      if (typeof s.title === 'string') return s.title
      const l = this.locale
      return s.title?.[l] ?? s.title?.en ?? ''
    },
    displaySectionContent(s) {
      if (!s) return ''
      if (typeof s.content === 'string') return s.content
      const l = this.locale
      return s.content?.[l] ?? s.content?.en ?? ''
    },
    goBack() {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' }).then(() => {
          this.$nextTick(() => {
            const el = document.getElementById('projects')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          })
        })
      } else {
        const el = document.getElementById('projects')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
  ,
  setup() {
    const { locale } = useI18n()
    return { locale }
  }
}
</script>

<style scoped>

/* Timeline 外层 */
.timeline {
  margin: 40px 0;
  position: relative;
  padding-left: 40px;
}

/* 时间线主线 */
.timeline::before {
  content: "";
  position: absolute;
  left: 18px;
  top: 0;
  width: 4px;
  height: 100%;
  background: #e0e0e0;
  border-radius: 4px;
}

/* timeline item */
.timeline-item {
  position: relative;
  margin-bottom: 40px;
}

/* 左侧圆点 */
.timeline-dot {
  position: absolute;
  left: -2px;
  top: 4px;
  width: 18px;
  height: 18px;
  background: #4caf50;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
}

/* 内容区域 */
.timeline-content {
  padding: 16px 20px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

/* 标题 */
.timeline-content h2 {
  font-size: 22px;
  margin-bottom: 10px;
  color: #333;
}

/* 内容文字 */
.timeline-content p {
  font-size: 16px;
  line-height: 1.7;
  color: #555;
}

.project-link {
  margin-bottom: 32px;
}

.project-link a {
  font-size: 18px;
  color: blue;
  font-weight: 600;
  text-decoration: none;
  transition: 0.25s;
}

.project-link a:hover {
  text-decoration: underline;
  opacity: 0.8;
}


.project-detail-page {
  padding: 60px;
}

.back-btn {
  margin-top: 24px;
  margin-bottom: 12px;
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 20px;
}

.description {
  font-size: 18px;
  margin-bottom: 40px;
}

/* sections 样式 */
.project-section {
  margin-bottom: 32px;
}

.project-section h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #333;
}

.project-section p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.skills-tags {
  margin-bottom: 32px;
}

.more-images {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  margin-bottom: 40px;
}

.more-images img {
  width: 30%;
  max-width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s;
}

.more-images img:hover {
  transform: scale(1.05);
}

.video-section {
  margin-top: 40px;
  margin-bottom: 40px;
  text-align: center;
}

.project-video {
  width: 80%;
  max-width: 800px;
  border-radius: 16px;
  outline: none;
  margin-top: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
</style>
