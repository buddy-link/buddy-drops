module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        '@babel/preset-typescript',
    ],
    // add support for @ paths
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                alias: {
                    '@': './src',
                },
            },
        ],
    ],
};