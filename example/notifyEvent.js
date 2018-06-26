
const request = require('request-promise-native');

const accessToken = process.env.TEST_ACCESS_TOKEN;

async function main() {
    let response = await request.post({
        url: 'https://szl0dts9z6.execute-api.us-east-1.amazonaws.com/dev',
        // auth: { bearer: accessToken },
        json: true,
        simple: false,
        resolveWithFullResponse: true,
        // body: {
        //     text: 'hello'
        // },
        body: {
            "token": "XXYYZZ",
            "team_id": "TXXXXXXXX",
            "api_app_id": "AXXXXXXXXX",
            "event": {
                "type": "name_of_event",
                "event_ts": "1234567890.123456",
                "user": "UXXXXXXX1",
                "text": "aws",
                channel: 'C4U0T3ERJ'
            },
            "type": "event_callback",
            "authed_users": [
                "UXXXXXXX1",
                "UXXXXXXX2"
            ],
            "event_id": "Ev08MFMKH6",
            "event_time": 1234567890
        }
    });
    console.log(response.statusCode, response.body);
}

main().then(() => {
    console.log('success!');
}).catch(console.error)

