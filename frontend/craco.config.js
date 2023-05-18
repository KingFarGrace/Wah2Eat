const CracoLessPlugin = require("craco-less");
const { loaderByName } = require("@craco/craco");
const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devServer: {
        port: 5000,
        proxy: {
            '/api': { // 匹配访问路径中含有 '/api' 的路径
                target: 'http://localhost:3000', // 测试地址、目标地址
                changeOrigin: true,
                ws: true, // 是否开启 webSocket 代理
                pathRewrite: { // 请求路径重写
                    '^/api': '',   //重写请求路径
                },
            }
        }
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                modifyLessRule(lessRule, context) {
                    // You have to exclude these file suffixes first,
                    // if you want to modify the less module's suffix
                    lessRule.exclude = /\.m\.less$/;
                    return lessRule;
                },
                modifyLessModuleRule(lessModuleRule, context) {
                    // Configure the file suffix
                    lessModuleRule.test = /\.m\.less$/;

                    // Configure the generated local ident name.
                    const cssLoader = lessModuleRule.use.find(loaderByName("css-loader"));
                    cssLoader.options.modules = {
                        localIdentName: "[local]_[hash:base64:5]",
                    };

                    return lessModuleRule;
                },
            },
        },
    ],
}
