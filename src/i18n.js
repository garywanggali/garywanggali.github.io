import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    nav: { home: '首页', about: '关于我', skills: '技能', projects: '项目', bloglist: '博客', contact: '联系' },
    home: {
      aboutCard: {
        title: '关于我',
        desc: '我从机器人入门，逐步学习 Scratch、C++、Python、Web 开发等；课外热爱足球、策略游戏，并关注社会议题。',
        learnMore: '了解更多 ↓'
      },
      sidebar: {
        role: '云谷学校高中生',
        interest1: 'Web 开发 | AI | 计算机爱好者',
        interest2: '足球队队长'
      }
    },
    projects: { pageTitle: '我的项目', topLabel: '置顶' },
    skills: { title: '我的技能', desc: '以下是我掌握并实践过的一些计算机相关技能：' },
    bloglist: { title: '我的博客', read: '阅读文章 →' },
    contact: { title: '联系我', prompt: '欢迎通过以下方式联系我：', google: 'Google 邮箱', qq: 'QQ 邮箱', github: 'GitHub' },
    blogArticle: { back: '← 返回', notFoundTitle: '404 - 未找到该文章', notFoundContent: '文章不存在。' },
    projectDetail: { demoVideo: '演示视频', skillsUsed: '相关技术', moreImages: '更多图片', visitLink: '点击访问项目（由学校运营）' }
  },
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', bloglist: 'Blog', contact: 'Contact' },
    home: {
      aboutCard: {
        title: 'About Me',
        desc: 'Started with robotics, then learned Scratch, C++, Python, and web development; outside tech I enjoy football, strategy games, and social topics.',
        learnMore: 'Learn More ↓'
      },
      sidebar: {
        role: 'Student at Yungu High School',
        interest1: 'Web Dev | AI | CS Enthusiast',
        interest2: 'Football Team Captain'
      }
    },
    projects: { pageTitle: 'My Projects', topLabel: 'Top' },
    skills: { title: 'My Skills', desc: 'Here are some computer-related skills I have learned and practiced:' },
    bloglist: { title: 'My Blog', read: 'Read →' },
    contact: { title: 'Contact Me', prompt: 'Feel free to reach out to me via the following channels:', google: 'Google Email', qq: 'QQ Email', github: 'GitHub' },
    blogArticle: { back: '← Back', notFoundTitle: '404 - Article Not Found', notFoundContent: 'Article not found.' },
    projectDetail: { demoVideo: 'Demo Video', skillsUsed: 'Skills Used', moreImages: 'More Images', visitLink: 'Click Here To Visit Project(ran by school)' }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'en',
  messages
})

export default i18n
