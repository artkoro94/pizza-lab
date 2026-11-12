import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: [".next/**", ".vite/**", "out/**", "build/**", "dist/**", "node_modules/**", "coverage/**", "next-env.d.ts"] },
  ...tseslint.configs.recommended,
);
