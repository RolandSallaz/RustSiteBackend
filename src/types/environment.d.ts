export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'test' | 'dev' | 'prod'
      PORT: number
      API_KEY: string
      SITE_DOMAIN: string
      PROTOCOL:'http' | 'https'
    }
  }
}
