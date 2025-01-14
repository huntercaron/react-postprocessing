const { addWebpackAlias, removeModuleScopePlugin, babelInclude, override } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')
const path = require('path')

module.exports = (config, env) => {
  config.resolve.extensions = [...config.resolve.extensions, '.ts', '.tsx']
  return override(
    addReactRefresh(),
    removeModuleScopePlugin(),
    babelInclude([path.resolve('src'), path.resolve('../src')]),
    addWebpackAlias({
      'react-postprocessing': path.resolve('../src/index'),
      react: path.resolve('node_modules/react'),
      'react-dom': path.resolve('node_modules/react-dom'),
      scheduler: path.resolve('node_modules/scheduler'),
      'react-scheduler': path.resolve('node_modules/react-scheduler'),
      'react-three-fiber': path.resolve('node_modules/react-three-fiber'),
    })
  )(config, env)
}
