<template>
  <div class="blog-list" id="bloglist" :style="backgroundStyle">
    <div class="blog-content">
      <h1>{{ $t('bloglist.title') }}</h1>
      <n-space vertical size="medium">
        <n-card
          v-for="post in posts"
          :key="post.id"
          :title="post.title"
          hoverable
        >
          <router-link :to="`/blog/${post.id}`">{{ $t('bloglist.read') }}</router-link>
        </n-card>
      </n-space>
    </div>
  </div>
</template>

<script>
import { NCard, NSpace } from 'naive-ui'
import BlogBg from '../assets/blog.jpg'

export default {
  name: 'BlogList',
  components: { NCard, NSpace },
  data() {
    return {
      posts: [],
      bgImage: BlogBg
    }
  },
  async created() {
    const modules = import.meta.glob('../data/*.md', { as: 'raw' })
    const postsArray = []

    for (const path in modules) {
      const idMatch = path.match(/(\d+)\.md$/)
      if (!idMatch) continue
      const id = idMatch[1]
      const raw = await modules[path]()
      const titleMatch = raw.match(/<!--\s*title:\s*(.+?)\s*-->/)
      const title = titleMatch ? titleMatch[1] : '文章 ' + id
      postsArray.push({ id, title })
    }

    this.posts = postsArray.sort((a, b) => a.id - b.id)
  },
  mounted() {
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
    onScroll() {
      const container = document.querySelector('.page-content')
      if (!container) return
      const el = document.getElementById('bloglist')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const top = rect.top - containerRect.top
      const bottom = rect.bottom - containerRect.top

      if (top < container.clientHeight / 2 && bottom > container.clientHeight / 2) {
        this.$emit('update-active-section', 'bloglist')
      }
    }
  },
  computed: {
    backgroundStyle() {
      return {
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '60px 20px',
        boxSizing: 'border-box',
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
.blog-content {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.blog-list h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff;
}

.blog-list a {
  color: #007bff;
  text-decoration: none;
}

.blog-list a:hover {
  text-decoration: underline;
}
</style>
