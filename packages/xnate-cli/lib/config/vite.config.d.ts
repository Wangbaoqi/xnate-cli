export declare const getDevConfig: (xnateConfig: any) => {
  root: any;
  resolve: {
    extensions: string[];
    alias: {
      '@config': any;
      '@pc-routes': any;
      '@mobile-routes': any;
    };
  };
  server: {
    port: any;
    host: any;
  };
  publicDir: any;
  plugins: import('vite').PluginOption[];
};
