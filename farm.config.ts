import { defineConfig } from '@farmfe/core';

export default defineConfig({
  compilation: {
    presetEnv: false,
    output: {
      publicPath: "./"
    },
    assets: {
    include: ["png"]      
    }
  },
});
