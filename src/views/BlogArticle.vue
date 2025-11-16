<template>
  <div class="blog-article">
    <n-button text class="back-btn" @click="goBack()">{{ $t('blogArticle.back') }}</n-button>
    <n-card :title="articleTitle">
      <div v-html="htmlContent"></div>
    </n-card>
  </div>
</template>

<script>
import { NButton } from 'naive-ui'
import MarkdownIt from 'markdown-it'
import markdownItKatex from 'markdown-it-katex'
import 'katex/dist/katex.min.css'

// 创建 MarkdownIt 实例，并启用 KaTeX
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
}).use(markdownItKatex)

export default {
  name: 'BlogArticle',
  components: { NButton },
  props: ['id'],
  data() {
    return {
      articleTitle: '',
      htmlContent: ''
    }
  },
  async created() {
    const modules = import.meta.glob('../data/blog*.md', { as: 'raw' })
    const targetPath = `../data/blog${this.id}.md`

    if (!modules[targetPath]) {
      this.articleTitle = this.$t('blogArticle.notFoundTitle')
      this.htmlContent = `<p>${this.$t('blogArticle.notFoundContent')}</p>`
      return
    }

    const raw = await modules[targetPath]()

    // 解析标题
    const commentTitle = raw.match(/<!--\s*title:\s*(.+?)\s*-->/)
    const markdownTitle = raw.match(/^#\s*(.+)/m)
    this.articleTitle = commentTitle ? commentTitle[1] : (markdownTitle ? markdownTitle[1] : `文章 ${this.id}`)

    // 去掉标题行
    let content = raw.replace(/<!--\s*title:\s*(.+?)\s*-->/, '')
    content = content.replace(/^#\s*(.+)\n/, '')

    // 渲染 Markdown，支持 KaTeX 公式
    this.htmlContent = md.render(content)
  },
  methods: {
  goBack() {
    // 如果当前路由就是 Home
    if (this.$route.name === 'Home') {
      const el = document.getElementById('bloglist')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // 跳 Home 并加 hash
      this.$router.push({ path: '/', hash: '#bloglist' })
    }
  }
}

}
</script>

<style scoped>
.blog-article {
  max-width: 800px;
  margin: 40px auto;
}

.back-btn {
  margin-top: 24px;
  margin-bottom: 12px;
}

.blog-article p {
  line-height: 1.6;
  margin-bottom: 12px;
}

.blog-article pre {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

/* KaTeX 公式样式微调 */
.katex {
  font-size: 1.1em;
}
</style>
