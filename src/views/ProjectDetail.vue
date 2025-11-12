<template>
  <div class="project-detail-page" v-if="project">
    <n-button text @click="$router.back()">← Back</n-button>
    <h1 class="title">{{ project.title }}</h1>
    <img :src="project.cover" class="cover" alt="cover" />
    <p class="description">{{ project.description }}</p>

    <h2>More Images</h2>
    <div class="more-images">
      <img v-for="(img, idx) in project.images" :key="idx" :src="img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
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
  }
}
</script>

<style scoped>
.project-detail-page {
  padding: 60px;
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

.more-images {
  display: flex;
  flex-wrap: wrap;
  gap: 100px;
}

.more-images img {
  width: 30%;
  margin: 1.5%; /* 左右间距 */
  border-radius: 12px;
  object-fit: cover;
}

</style>
