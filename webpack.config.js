const path = require('path');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    watch: true,
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            loader: "file-loader"
        },
        {
            test: /\.tsx?$/,
            use: ["ts-loader", "eslint-loader"],
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        // Copy the images folder and optimize all the images
        new CopyWebpackPlugin([{
            from: 'src/assets/images/',
            to: "./images"
        }]),
        new ImageminPlugin({
            minFileSize: 9000,
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 9,
                quality: 60
            },
            pngquant: {
                quality: 60,
                speed: 10
            },
            plugins: [
                imageminMozjpeg({
                    quality: 80,
                    progressive: true
                })
            ]
        }),
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/assets/icons'),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'arquivos/sprite.png'),
                css: path.resolve(__dirname, 'src/shared/sprites.scss')
            },
            apiOptions: {
                cssImageRef: "/arquivos/sprite.png"
            }
        })
    ],
    output: {
        filename: 'bundle.js',
        publicPath: '/arquivos/',
        path: path.resolve(__dirname, 'arquivos')
    }
};