/*
 * @Descripttion: 
 * @LastEditors: chen.shixi
 * @LastEditTime: 2022-06-04 16:51:08
 */
module.exports = {
  title: '四喜丸子',
  description: '百炼成仙',
  base: '/doc/',
  theme: 'reco',
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