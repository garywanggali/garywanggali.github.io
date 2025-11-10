<template>
  <div class="blog-list">
    <h1>My Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/blog/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
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
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.blog-list h1 {
  text-align: center;
  margin-bottom: 20px;
}

.blog-list ul {
  list-style: none;
  padding: 0;
}

.blog-list li {
  margin-bottom: 12px;
  font-size: 18px;
}

.blog-list a {
  text-decoration: none;
  color: #007bff;
}

.blog-list a:hover {
  text-decoration: underline;
}
</style>
