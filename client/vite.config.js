export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths in production
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // Optional: Vite's default is 'dist', so you can omit this if 'dist' is your desired folder
  },
});
