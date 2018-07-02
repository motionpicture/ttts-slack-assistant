
const request = require('request-promise-native');

const ACCESS_TOKEN = process.env.SLACK_ACCESS_TOKEN;

async function main() {
    let response = await request.post({
        url: 'https://slack.com/api/chat.postMessage',
        auth: { bearer: ACCESS_TOKEN },
        json: true,
        simple: false,
        resolveWithFullResponse: true,
        body: {
            // token: ACCESS_TOKEN,
            channel: 'C4U0T3ERJ',
            text: 'text'
        }
    });
    console.log(response.statusCode, response.body);
}

main().then(() => {
    console.log('success!');
}).catch(console.error)

