var webpack = require('webpack')
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
  pluginOptions: {
    electronBuilder: {
    nodeIntegration: true,
      externals: [
        'puppeteer',
        'puppeteer-extra',
        'puppeteer-extra-plugin-stealth'
      ],
      nodeModulesPath: ['../../node_modules', './node_modules'],
      nodeIntegration: true,
      builderOptions: {
        asarUnpack: 'node_modules/puppeteer/.local-chromium/**/*',
        copyright: 'Copyright © 2021',
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
          oneClick: true,
          allowToChangeInstallationDirectory: true,
	        perMachine: true
        },
	win:{
	requestExecutionLevel: "admin"
	    }
      }
    },
  configureWebpack: {
    externals: {
      puppeteer: "require('puppeteer')",
      'puppeteer-extra': "require('puppeteer-extra')",
      'puppeteer-extra-plugin-stealth': "require('puppeteer-extra-plugin-stealth')"
    }
  }
}
