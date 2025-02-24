const CracoAlias = require("craco-alias")
const PnpWebpackPlugin = require("pnp-webpack-plugin")

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                tsConfigPath: "tsconfig.paths.json",
            },
        },
    ],
    babel: {
        presets: [
            [
                "@babel/preset-react",
                { runtime: "automatic", importSource: "@emotion/react" },
            ],
        ],
        plugins: ["@emotion/babel-plugin"],
    },
    webpack: {
        configure: (webpackConfig) => {
            // PnP 플러그인 추가
            webpackConfig.resolve.plugins = [
                ...(webpackConfig.resolve.plugins || []),
                PnpWebpackPlugin,
            ]

            // 기존 svg 관련 로더 제거 (file-loader, url-loader와 충돌 방지)
            const svgRuleIndex = webpackConfig.module.rules.findIndex((rule) =>
                rule.test?.toString().includes("svg"),
            )
            if (svgRuleIndex !== -1) {
                webpackConfig.module.rules.splice(svgRuleIndex, 1)
            }

            // @svgr/webpack 로더 추가
            webpackConfig.module.rules.push({
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ["@svgr/webpack"],
            })

            return webpackConfig
        },
    },
}
