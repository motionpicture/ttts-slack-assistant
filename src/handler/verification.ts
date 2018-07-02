import * as lambda from 'aws-lambda';

const VERIFICATION_TOKEN = <string>process.env.SLACK_VERIFICATION_TOKEN;

// Verify Url - https://api.slack.com/events/url_verification
export default (data: any, callback: lambda.Callback) => {
    if (data.token === VERIFICATION_TOKEN) {
        callback(null, {
            statusCode: 200,
            body: data.challenge,
        });
    } else {
        callback(new Error('verification failed'));
    }
}
