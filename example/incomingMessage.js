const request = require('request-promise-native');

const accessToken = process.env.TEST_ACCESS_TOKEN;

async function main() {
    let response = await request.post({
        url: 'https://hooks.slack.com/services/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',
        // auth: { bearer: accessToken },
        json: true,
        simple: false,
        resolveWithFullResponse: true,
        body: {
            text: 'Hello, World!'
        }
    });
    console.log('account opened.', response.statusCode, response.body);
}

main().then(() => {
    console.log('success!');
}).catch(console.error)
