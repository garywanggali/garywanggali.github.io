<template>
  <div class="blog-article">
    <!-- 页面显示标题 -->
    <h1>{{ articleTitle }}</h1>
    <!-- 渲染 Markdown 内容（去掉了 Markdown 里的标题） -->
    <div v-html="htmlContent"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
// 这里根据 id 动态导入对应的 Markdown 文件
// 假设你的文章文件命名为 1.md, 2.md 等，放在 src/data
import blog1 from '../data/blog1.md?raw'

const md = new MarkdownIt()

export default {
  name: 'BlogArticle',
  props: ['id'], // 路由传入的文章 id
  data() {
    return {
      articleTitle: '',
      htmlContent: ''
    }
  },
  created() {
    // 根据 id 选择对应 Markdown
    let content = ''
    if (this.id === '1') content = blog1
    else if (this.id === '2') content = blog2
    // 可以继续添加其他文章

    // 假设标题在 Markdown 的第一行以特殊注释形式给出，例如：<!-- title: XXX -->
    const titleMatch = content.match(/<!--\s*title:\s*(.+?)\s*-->/)
    if (titleMatch) {
      this.articleTitle = titleMatch[1]
      // 去掉注释行
      content = content.replace(titleMatch[0], '')
    }

    this.htmlContent = md.render(content)
  }
}
</script>

<style scoped>
.blog-article {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.blog-article h1 {
  text-align: center;
  margin-bottom: 20px;
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
</style>
