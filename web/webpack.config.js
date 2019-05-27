/**
 * @Name webpack.config.js
 * @Description react-native-web webpack打包配置文件
 * @author wood
 * @date 2019/5/13
 * 参考资料：https://segmentfault.com/a/1190000006178770
 */
const path = require('path');
const webpack = require('webpack');

/** 用于编译Webpack项目中的html类型的文件，动态生成html文件入口 */
const htmlWebpackPlugin=require('html-webpack-plugin');
/** 打包体积优化，详细分布查看插件 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
/** __dirname是node.js中的一个全局变量，它指向当前执行脚本所在的目录 */
const appDirectory = path.resolve(__dirname, '../');
/** rn-web中没有__DEV__ */
const __DEV__ = process.env.NODE_ENV === 'development';

/**
 * Babel其实是一个编译JavaScript的平台
 * 1、使用最新的JavaScript代码（ES6，ES7...）而不用管新标准是否被当前使用的浏览器完全支持
 * 2、使用基于JavaScript进行了拓展的语言，比如React的JSX；
 * */
const babelLoaderConfiguration = {
  /** 正则表达式，编译所有.js文件 */
  test: /\.js$/,
  /** 包含要编译的目录和文件 */
  include: [
    /** 根目录下的index.js */
    path.resolve(appDirectory, 'index.js'),
    /** 子目录src下所有文件 */
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-navigation'),
    path.resolve(appDirectory, 'node_modules/crypto-js'),
    path.resolve(appDirectory, 'node_modules/lodash'),
    path.resolve(appDirectory, 'node_modules/native-base'),
    // path.resolve(appDirectory, 'node_modules/prop-types'),
    path.resolve(appDirectory, 'node_modules/querystring'),
    path.resolve(appDirectory, 'node_modules/react-art'),
    path.resolve(appDirectory, 'node_modules/react-native-cached-image'),
    path.resolve(appDirectory, 'node_modules/react-native-code-push'),
    path.resolve(appDirectory, 'node_modules/react-native-device-info'),
    path.resolve(appDirectory, 'node_modules/react-native-elements'),
    path.resolve(appDirectory, 'node_modules/react-native-fetch-blob'),
    path.resolve(appDirectory, 'node_modules/react-native-gesture-handler'),
    path.resolve(appDirectory, 'node_modules/react-native-i18n'),
    path.resolve(appDirectory, 'node_modules/react-native-image-picker'),
    path.resolve(appDirectory, 'node_modules/react-native-linear-gradient'),
    path.resolve(appDirectory, 'node_modules/react-native-loading-spinner-overlay'),
    path.resolve(appDirectory, 'node_modules/react-native-root-toast'),
    path.resolve(appDirectory, 'node_modules/react-native-scrollable-tab-view'),
    path.resolve(appDirectory, 'node_modules/react-native-splash-screen'),
    path.resolve(appDirectory, 'node_modules/react-native-storage'),
    path.resolve(appDirectory, 'node_modules/react-native-swiper'),
    path.resolve(appDirectory, 'node_modules/react-native-webview'),
    path.resolve(appDirectory, 'node_modules/react-navigation'),
    path.resolve(appDirectory, 'node_modules/@react-navigation'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules/react-native-ratings'),
    path.resolve(appDirectory, 'node_modules/react-native-root-siblings'),
    path.resolve(appDirectory, 'node_modules/react-native-tab-view'),
    path.resolve(appDirectory, 'node_modules/static-container'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
  ],
  use: {
    loader: 'babel-loader',
    /** webpack会自动调用.babelrc里的babel配置选项 */
    options: {
      cacheDirectory: true,
      /** 这一句不能少，使用babel.config.js中的配置 */
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-web']
    }
  }
};

const htmlLoaderConfiguration = {
  test: /\.html$/,
  use: {
    loader: 'html-loader'
  }
};

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    /**
     * file-loader解决路径问题，url-loader根据limit值对图片编码，生成dataURl
     * 当配置limit上限值，此时url-loader依赖file-loader
     * */
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
      limit: 10240
    }
  }
};

module.exports = {
  /**
   * webpack4.x增加的选项，development/production
   * 在node中全局变量process表示当前的node进程，process.env包含系统环境信息
   * process.env是没有NODE_ENV的，用户可以自定义export NODE_ENV=development
   * */
  mode: process.env.NODE_ENV || 'production',
  /** 开发时调试源码，会影响编译速度，生产环境(hidden-source-map)请注释该行 */
  devtool: 'eval-source-map',
  /** entry入口 */
  entry: [
    path.resolve(appDirectory, 'index.js'),
  ],
  /** output出口 */
  output: {
    /** 打包后输出文件的文件名 */
    filename: 'bundle.web.js',
    /** 打包后的文件存放的地方 */
    path: path.resolve(appDirectory, 'dist')
  },
  /**
   * 通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理。
   * 比如分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，
   * 对React的开发而言，合适的Loaders可以把React的中用到的JSX文件转换为JS文件。
   * loader配置选项参数说明：
   *  test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
   *  loader：loader的名称（必须）
   *  include/exclude：手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（可选）
   *  query：为loaders提供额外的设置选项（可选）
   * */
  module: {
    rules: [
      babelLoaderConfiguration,
      htmlLoaderConfiguration,
      imageLoaderConfiguration
    ]
  },
  plugins: [
    /** DefinePlugin允许我们创建全局变量 */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      __DEV__,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    // new htmlWebpackPlugin({
    //   filename: 'web/index.html',
    //   template: 'index.html',
    // })
  ],
  /**
   * resolve配置模块如何解析
   * */
  resolve: {
    /** 配置项通过别名来把原导入路径映射成一个新的导入路径
     * import的react-native所有模块都会转换成react-native-web
     * import {Text} from 'react-native' => import {Text} from 'react-native-web'
     * */
    alias: {
      'react-native$': 'react-native-web'
    },
    /** 自动解析确定的扩展 */
    extensions: ['.web.js', '.js', '.json'],
    /** 告诉webpack解析模块时应搜索的目录 */
    modules: ['node_modules']
  },
  /**
   * 使用webpack构建本地服务器
   * npm install --save-dev webpack-dev-server
   * yarn add -D webpack-dev-server
   * http://localhost:8080
   * */
  devServer: {
    /** 本地服务器所加载的页面所在的目录 */
    contentBase: "./dist",
    /** true所有的跳转将指向index.html */
    historyApiFallback: true,
    /** 当源文件改变时实时刷新 */
    inline: true
  }

};


