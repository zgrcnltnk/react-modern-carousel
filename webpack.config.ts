import path from "path";
import webpack from "webpack";
import { Configuration as WebpackConfig } from "webpack";
import { Configuration as WebpackDevConfig } from 'webpack-dev-server';

interface Config extends WebpackConfig {
    devServer?: WebpackDevConfig;
}

const config: Config = {
    entry: '/src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['ts-loader'],
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/, 
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "bundle.js",
        clean: true
    },
    devServer: {
        open: true,
        contentBase: path.join(__dirname, "public"),
        port: 3002,
        publicPath: "http://localhost:3002/dist",
        hot: true,
        // hotOnly: false,
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
}

export default config;