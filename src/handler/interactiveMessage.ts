import { WebClient } from '@slack/client';
import * as lambda from 'aws-lambda';
// import * as request from 'request-promise-native';

const ACCESS_TOKEN = <string>process.env.SLACK_ACCESS_TOKEN;
const slackWeb = new WebClient(ACCESS_TOKEN);

export default async (data: any, callback: lambda.Callback) => {
    console.log('interactiveMessage recieved.', data);
    // sendMessageToSlackResponseURL(data.response_url, message);
    // await request.post({
    //     uri: data.response_url,
    //     json: true,
    //     body: {
    //         text: `:${data.user.name} clicked: ${data.actions[0].name}`,
    //         replace_original: true
    //     }
    // });

    const attachments = [data.original_message.attachments[0]];
    attachments[0].actions = [];
    attachments[0].text = `${attachments[0].text}\n<@${data.user.name}>が${data.actions[0].name}`;
    await slackWeb.chat.update({
        channel: data.channel.id,
        ts: data.message_ts,
        text: data.original_message.text,
        attachments: attachments
    });

    callback(null, {
        statusCode: 200
    });
}
