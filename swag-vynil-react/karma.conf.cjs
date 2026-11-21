// Configuración de Karma + Jasmine para las pruebas unitarias de los componentes React.
// Ejecutar: npm test (modo watch) | npm run test:ci (una vez, headless, con cobertura)
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: ['src/**/*.spec.js', 'src/**/*.spec.jsx'],
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            // el package.json usa "type": "module": permite importar sin escribir la extensión
            resolve: { fullySpecified: false },
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // instrumenta el código fuente (no los .spec) para medir la cobertura
                plugins: [['istanbul', { exclude: ['**/*.spec.*'] }]],
              },
            },
          },
          // los componentes importan CSS: en las pruebas se ignora
          { test: /\.css$/, type: 'asset/source' },
        ],
      },
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }, { type: 'lcov', subdir: 'lcov' }],
    },
    specReporter: { suppressSkipped: true },

    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    singleRun: false,
    restartOnFileChange: true,
  })
}