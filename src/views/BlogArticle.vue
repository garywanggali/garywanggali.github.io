<template>
  <div class="blog-article">
    <n-button text class="back-btn" @click="$router.back()">← Back</n-button>
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
    // 自动导入所有 blog*.md
    const modules = import.meta.glob('../data/blog*.md', { as: 'raw' })
    const targetPath = `../data/blog${this.id}.md`

    if (!modules[targetPath]) {
      this.articleTitle = '404 - 未找到该文章'
      this.htmlContent = '<p>文章不存在。</p>'
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
