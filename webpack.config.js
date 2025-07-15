const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // For production extraction

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      // Add any necessary aliases for your project, e.g.,
      // '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Or 'ts-loader' for TypeScript
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Or appropriate presets
          },
        },
      },
      {
        test: /\.scss$/, // Matches both .scss and .css files
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader" // In development, inject styles directly into the DOM
            : MiniCssExtractPlugin.loader, // In production, extract CSS to a separate file
          "css-loader", // Translates CSS into CommonJS modules
          {
            loader: "postcss-loader", // Optional: Adds vendor prefixes and other transformations
            options: {
              postcssOptions: {
                plugins: [require("autoprefixer")], // Example: Auto-prefix CSS for broader browser support
              },
            },
          },
          "sass-loader", // Compiles Sass/SCSS into CSS
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    // ... other plugins
    new MiniCssExtractPlugin({
      filename: "[name].css", // Customize the output CSS filename
      chunkFilename: "[id].css",
    }),
  ],
  // If you need more advanced configuration, add it here,
  // for example, for handling images, fonts, or other assets.
}
