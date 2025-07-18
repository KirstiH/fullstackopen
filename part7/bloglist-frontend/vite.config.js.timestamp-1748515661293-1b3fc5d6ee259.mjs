// vite.config.js
import { defineConfig } from "file:///C:/Users/Kirsti%20H%C3%A4r%C3%B6/Documents/fullstackopen/part7/bloglist-frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Kirsti%20H%C3%A4r%C3%B6/Documents/fullstackopen/part7/bloglist-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Vite default port
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
        secure: false
      }
    }
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxLaXJzdGkgSFx1MDBFNHJcdTAwRjZcXFxcRG9jdW1lbnRzXFxcXGZ1bGxzdGFja29wZW5cXFxccGFydDdcXFxcYmxvZ2xpc3QtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEtpcnN0aSBIXHUwMEU0clx1MDBGNlxcXFxEb2N1bWVudHNcXFxcZnVsbHN0YWNrb3BlblxcXFxwYXJ0N1xcXFxibG9nbGlzdC1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvS2lyc3RpJTIwSCVDMyVBNHIlQzMlQjYvRG9jdW1lbnRzL2Z1bGxzdGFja29wZW4vcGFydDcvYmxvZ2xpc3QtZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgc2VydmVyOiB7XG4gICAgICAgIHBvcnQ6IDUxNzMsIC8vIFZpdGUgZGVmYXVsdCBwb3J0XG4gICAgICAgIHByb3h5OiB7XG4gICAgICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDEvJyxcbiAgICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICB0ZXN0OiB7XG4gICAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgICAgICBnbG9iYWxzOiB0cnVlLFxuICAgICAgICBzZXR1cEZpbGVzOiAnLi90ZXN0U2V0dXAuanMnLFxuICAgIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3WixTQUFTLG9CQUFvQjtBQUNyYixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0gsUUFBUTtBQUFBLFFBQ0osUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLE1BQ1o7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0YsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsWUFBWTtBQUFBLEVBQ2hCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
