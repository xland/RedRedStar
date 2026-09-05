import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"

export default defineConfig({
  // JSX 编译为自动运行时模式，importSource 指向本地 @redredstar/jsx，
  // 由 oxc 按 tsconfig 的 jsx 配置把 .tsx 转成对本地 runtimes 的调用。
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "@redredstar/jsx",
    },
  },
  resolve: {
    alias: {
      // 让编译产物里自动生成的 import（自动运行时 / 开发模式运行时）落到本地运行时文件
      "@redredstar/jsx/jsx-runtime": fileURLToPath(
        new URL("./src/jsx-runtime.ts", import.meta.url),
      ),
      "@redredstar/jsx/jsx-dev-runtime": fileURLToPath(
        new URL("./src/jsx-runtime.ts", import.meta.url),
      ),
    },
  },
})
