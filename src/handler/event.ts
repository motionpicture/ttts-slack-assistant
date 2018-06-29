import * as lambda from 'aws-lambda';
import { WebClient } from '@slack/client';

const ACCESS_TOKEN = <string>process.env.SLACK_ACCESS_TOKEN;
const PRIMARY_CHANNEL = <string>process.env.PRIMARY_CHANNEL;
const SECONDARY_CHANNEL = <string>process.env.SECONDARY_CHANNEL;
const slackWeb = new WebClient(ACCESS_TOKEN);

const HOSHIDA_SAYINGS_COLLECTION = [
    'あー、それでいいますと、',
    'いや、ライザップいかねえから',
    'はい、ほしだですー',
    'おい、否定しろよ',
    'スターじゃねえから',
    'からの～',
    '粘膜接触はだめなんで',
    '丁寧♪丁寧♪丁寧〜♪',
];

// Post message to Slack - https://api.slack.com/methods/chat.postMessage
export default async (event: any, callback: lambda.Callback) => {
    // test the message for a match and not a bot
    // if (!event.bot_id && /(aws|lambda)/ig.test(event.text)) {
    if (event.bot_id === undefined) {
        console.log('event handled:', event);

        switch (event.type) {
            case 'message':
                // 一時問い合わせを受け付けるチャンネルにはメッセージ応答
                if (event.channel === PRIMARY_CHANNEL) {
                    // const text = `<@${event.user}> isn't AWS Lambda awesome?`;
                    const text = `<@${event.user}> ${HOSHIDA_SAYINGS_COLLECTION[Math.floor(Math.random() * HOSHIDA_SAYINGS_COLLECTION.length)]}`;
                    await slackWeb.chat.postMessage({
                        channel: event.channel,
                        text: text
                    });

                    // 二次受けにメッセージを投稿
                    await slackWeb.chat.postMessage({
                        channel: SECONDARY_CHANNEL,
                        text: `<@${event.user}>から<#${event.channel}>へお問い合わせがありました。`,
                        attachments: [
                            {
                                fallback: `<@${event.user}>から<#${event.channel}>へお問い合わせがありました。`,
                                // pretext: '<@${event.user}>からお問い合わせがありました。',
                                // title: '<@${event.user}>',
                                // title_link: '',
                                text: event.text,
                                color: '#3AA3E3',
                                callback_id: 'handled',
                                // attachmentype: 'default',
                                actions: [
                                    {
                                        name: '対応しました',
                                        text: '対応しました',
                                        type: 'button',
                                        value: 'handled',
                                        style: 'primary'
                                    }
                                ]
                            }
                        ]
                    });

                    break;
                }

            default:
                break;
        }
    }

    callback(null, {
        statusCode: 200
    });
}
