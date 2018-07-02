# Slack お問い合わせアシスタント

顧客対応の手助けをしてくれるSlackアプリケーションです。

## Table of contents

* [Usage](#usage)
* [License](#license)

## Usage

1. [Slackアプリ](https://api.slack.com/apps)を作成
2. [各環境変数](###environment-variables)を設定
3. AWS認証情報をセット
4. デプロイ

```sh
serverless deploy -v
```

### Environment variables

| Name                                  | Required | Value | Purpose                     |
|---------------------------------------|----------|-------|-----------------------------|
| `SLACK_ACCESS_TOKEN_PRODUCTION`       | true     |       | SlackアプリがAPIを使用する際のアクセストークン |
| `SLACK_VERIFICATION_TOKEN_PRODUCTION` | true     |       | Slackアプリ認証トークン              |
| `PRIMARY_CHANNEL_PRODUCTION`          | true     |       | 問い合わせ一次受けチャンネルID            |
| `SECONDARY_CHANNEL_PRODUCTION`        | true     |       | 問い合わせ二次受けチャンネルID            |

## License

ISC
