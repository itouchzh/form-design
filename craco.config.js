const path = require('path')

const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src'),
        },
        module: {
            rules: [],
        },
        plugins: [
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: process.env.NODE_ENV === 'production', // 生产环境下移除控制台所有的内容
                        drop_debugger: false, // 移除断点
                        pure_funcs: process.env.NODE_ENV === 'production' ? ['console.log'] : '', // 生产环境下移除console
                    },
                },
            }),
        ],
    },
    devServer: {
        proxy: {},
    },
}
