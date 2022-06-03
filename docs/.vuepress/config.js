module.exports = {
  title: '四喜丸子',
  description: '百炼成仙',
  bese: '/docs.github.io/',
  themeConfig: {
    logo: '/assets/img/logo.jpg',
    //禁用导航栏
    // navbar: false,
    nav: [
      { text: '首页', link: '/' },
      {
        text: '文档',
        items: [
          {text: 'typescript',link: '/typescript/Ts'},
          {text: 'vue',link: '/vue/vue3'},
          {text: 'nodejs',link: '/nodejs/secretScript'},
          {text: 'vite',link: '/vite/dev'}
        ]
      },
      {text: '关于',link: '/about/'},
      { text: 'Gitee', link: 'https://gitee.com/' },
    ],
    sidebar: 'auto',
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    },
    searchMaxSuggestions: 5
  },

}