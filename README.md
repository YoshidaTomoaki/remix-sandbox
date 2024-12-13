# Remix + Cloudflare Workers へようこそ！

- 📖 [Remix ドキュメント](https://remix.run/docs)
- 📖 [Remix Cloudflare ドキュメント](https://remix.run/guides/vite#cloudflare)

## 開発

開発サーバーの起動:

```sh
npm run dev
```

Wrangler の実行:

```sh
npm run build
npm start
```

## 型生成

`wrangler.toml`に定義されている Cloudflare バインディングの型を生成:

```sh
npm run typegen
```

`wrangler.toml`を変更した場合は、typegen を再実行する必要があります。

## デプロイ

アカウントをお持ちでない場合は、[こちらから Cloudflare アカウントを作成](https://dash.cloudflare.com/sign-up)し、メールアドレスを確認した後、ダッシュボードで無料のカスタム Cloudflare Workers サブドメインを設定してください。

設定が完了したら、以下のコマンドでアプリをデプロイできます：

```sh
npm run deploy
```

## スタイリング

このテンプレートには、シンプルなデフォルトの開発体験のために[Tailwind CSS](https://tailwindcss.com/)が既に設定されています。お好みの CSS フレームワークを使用することもできます。詳しくは[Vite の CSS に関するドキュメント](https://vitejs.dev/guide/features.html#css)をご覧ください。
