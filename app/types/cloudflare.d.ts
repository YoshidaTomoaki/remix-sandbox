interface Env {
  AUTH_STORE: KVNamespace;
  SESSION_SECRET: string;
}

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    env: Env;
  }
}
