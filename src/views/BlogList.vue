<template>
  <div class="blog-list">
    <h1>My Blog</h1>
    <n-space vertical size="medium">
      <n-card
        v-for="post in posts"
        :key="post.id"
        :title="post.title"
        hoverable
      >
        <router-link :to="`/blog/${post.id}`">阅读文章 →</router-link>
      </n-card>
    </n-space>
  </div>
</template>

<script>
import { NCard, NSpace } from 'naive-ui'

export default {
  name: 'BlogList',
  components: { NCard, NSpace },
  data() {
    return {
      posts: []
    }
  },
  async created() {
    // 自动导入 src/data 下所有 md 文件
    const modules = import.meta.glob('../data/*.md', { as: 'raw' })
    const postsArray = []

    for (const path in modules) {
      const idMatch = path.match(/(\d+)\.md$/)
      if (!idMatch) continue
      const id = idMatch[1]
      const raw = await modules[path]()
      // 从注释中解析标题
      const titleMatch = raw.match(/<!--\s*title:\s*(.+?)\s*-->/)
      const title = titleMatch ? titleMatch[1] : '文章 ' + id
      postsArray.push({ id, title })
    }

    // 按 id 排序
    this.posts = postsArray.sort((a, b) => a.id - b.id)
  }
}
</script>

<style scoped>
.blog-list {
  max-width: 800px;
  margin: 40px auto;
}

.blog-list h1 {
  text-align: center;
  margin-bottom: 20px;
}

.blog-list a {
  color: #007bff;
  text-decoration: none;
}

.blog-list a:hover {
  text-decoration: underline;
}
</style>
