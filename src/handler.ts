import * as lambda from 'aws-lambda';
import { WebClient } from '@slack/client';

const VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;
const ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN;
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

// Verify Url - https://api.slack.com/events/url_verification
function verify(data: any, callback: lambda.Callback) {
    if (data.token === VERIFICATION_TOKEN) {
        callback(null, {
            statusCode: 200,
            body: data.challenge,
        });
    } else {
        callback(new Error('verification failed'));
    }
}

// Post message to Slack - https://api.slack.com/methods/chat.postMessage
async function handleEvent(event: any, callback: lambda.Callback) {
    // test the message for a match and not a bot
    // if (!event.bot_id && /(aws|lambda)/ig.test(event.text)) {
    if (event.bot_id === undefined) {
        // const text = `<@${event.user}> isn't AWS Lambda awesome?`;
        const text = `<@${event.user}> ${HOSHIDA_SAYINGS_COLLECTION[Math.floor(Math.random() * HOSHIDA_SAYINGS_COLLECTION.length)]}`;
        await slackWeb.chat.postMessage({
            channel: event.channel,
            text: text
        });
        // await request.post({
        //     url: 'https://slack.com/api/chat.postMessage',
        //     auth: { bearer: ACCESS_TOKEN },
        //     json: true,
        //     simple: false,
        //     resolveWithFullResponse: true,
        //     body: {
        //         channel: event.channel,
        //         text: text
        //     }
        // });
    }

    callback(null, {
        statusCode: 200
    });
}

/**
 * Slackイベントハンドラー
 * @see https://api.slack.com/tutorials/events-api-using-aws-lambda
 */
export async function hello(event: any, _: lambda.Context, callback: lambda.Callback) {
    try {
        const data = JSON.parse(event.body);

        switch (data.type) {
            case 'url_verification':
                verify(data, callback);
                break;
            case 'event_callback':
                await handleEvent(data.event, callback);
                break;
            default:
                callback(null);
        }
    } catch (error) {
        callback(error);
    }

    // callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
