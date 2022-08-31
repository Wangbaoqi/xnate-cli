module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        // modules: isCommonJS ? 'commonjs' : false,
        loose: true,
      },
    ],
    require.resolve('@babel/preset-typescript'),
  ],
}
