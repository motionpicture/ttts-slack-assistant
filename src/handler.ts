import * as lambda from 'aws-lambda';
import * as querystring from 'querystring';

import handleEvent from './handler/event';
import handleInteractiveMessage from './handler/interactiveMessage';
import handleVerification from './handler/verification';

/**
 * Slackイベントハンドラー
 * @see https://api.slack.com/tutorials/events-api-using-aws-lambda
 */
export async function hello(event: any, _: lambda.Context, callback: lambda.Callback) {
    try {
        console.log('hello!', event);
        const data = JSON.parse(event.body);

        switch (data.type) {
            case 'url_verification':
                handleVerification(data, callback);
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

export async function messages(event: any, _: lambda.Context, callback: lambda.Callback) {
    try {
        const body = <any>querystring.parse(event.body);
        const data = JSON.parse(body.payload);
        console.log('messages:', data);

        switch (data.type) {
            case 'interactive_message':
                await handleInteractiveMessage(data, callback);
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
