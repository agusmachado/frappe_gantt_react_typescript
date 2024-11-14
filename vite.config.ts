import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: "/frappe_gantt_react_typescript/",
  plugins: [react()],
})
