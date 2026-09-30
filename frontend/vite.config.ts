import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['5173-iankkteyq8ik3dv37xlly-277afaad.us1.manus.computer', '5173-iwfoobtztnekar9z8c9km-4898d4c7.us4.manus.computer'],
    host: '0.0.0.0',
    proxy: { '/api': 'http://localhost:8080' },
  },
});
