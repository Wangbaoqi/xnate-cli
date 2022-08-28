module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: isCommonJS ? 'commonjs' : false,
        loose: options.loose,
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ],
}
