module.exports = {
  title: '陈醋',
  description: '你我山巅自相逢',
  base: '/doc/',
  theme: 'reco',
  themeConfig: {
    logo: '/assets/img/logo.jpg',
    //禁用导航栏
    // navbar: false,
    type: 'blog',
    authorAvatar: '/assets/img/logo.jpg',
    noFoundPageByTencent: false,
    nav: [
      { text: '首页', link: '/' ,icon: 'reco-home'},
      {
        text: '文档',
        icon: 'reco-document',
        items: [
          {text: 'typescript',link: '/typescript/Ts'},
          {text: 'vue',link: '/vue/vue3'},
          {text: 'nodejs',link: '/nodejs/secretScript'},
          {text: 'vite',link: '/vite/dev'}
        ]
      },
      { text: 'Github', link: 'https://github.com/' ,icon: 'reco-github'},
    ],
    sidebar: 'auto',
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    },
    searchMaxSuggestions: 5
  },

}