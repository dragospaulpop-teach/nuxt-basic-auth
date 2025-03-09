// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-auth-utils"],
  auth: {
    hash: {
      scrypt: {
        // See https://github.com/adonisjs/hash/blob/94637029cd526783ac0a763ec581306d98db2036/src/types.ts#L144
      },
    },
  },
  nitro: {
    experimental: {
      database: true,
    },
    database: {
      default: {
        connector: "postgresql",
        options: {
          url: "postgresql://postgres:postgres@localhost:5432/postgres",
        },
      },
    },
  },
  ui: {
    global: true,
  },
  colorMode: {
    classSuffix: "",
  },
  tailwindcss: {
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
      ],
      theme: {
        extend: {},
      },
    },
  },
});
