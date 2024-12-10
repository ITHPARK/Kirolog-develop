const CracoAlias = require('craco-alias')
const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                tsConfigPath: 'tsconfig.paths.json',
            },
        },
    ],
    babel: {
        presets: [
            [
                '@babel/preset-react',
                { runtime: 'automatic', importSource: '@emotion/react' },
            ],
        ],
        plugins: ['@emotion/babel-plugin'],
    },
    webpack: {
        //pnp 플러그인을 추가
        configure: (webpackConfig) => {
            webpackConfig.resolve.plugins = [
                ...(webpackConfig.resolve.plugins || []),

                //yarn의 pnp 모드를 활성화하여 node_modules 없이 의존성을 해결할 수 있도록 설정
                PnpWebpackPlugin,
            ]

            return webpackConfig
        },
    },
}
