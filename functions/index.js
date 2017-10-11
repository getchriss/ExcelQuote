const functions = require('firebase-functions');

// const nodemailer = require('nodemailer');
// const gmailEmail = encodeURIComponent(functions.config().gmail.email);
// const gmailPassword = encodeURIComponent(functions.config().gmail.password);
// const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);


// exports.sendContactMessage = functions.database.ref('/quotes/{pushKey}').onWrite(event => {
//     const snapshot = event.data;
//     // Only send email for new messages.
//     if (snapshot.previous.val() || !snapshot.val().name) {
//         return;
//     }

//     const val = snapshot.key;

//     const mailOptions = {
//         to: 'joshp@exceldp.co.nz',
//         subject: `New quote request - ${val}`,
//         html: `<div><strong>New quote request</strong></div>
//         <div>Quote number: ${quoteNum}</div>`
//     }

//     return mailTransport.sendMail(mailOptions).then(() => {
//         return console.log('Mail sent to: test@example.com');
//     });
// });

const sendgrid = require('sendgrid');
const cors = require('cors')({ origin: true });
// const email = new sendgrid.Email();
const client = sendgrid("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");

function parseBody(body) {
    var helper = sendgrid.mail;
    var fromEmail = new helper.Email(body.from);
    var toEmail = new helper.Email(body.to);
    var subject = body.subject;
    var content = new helper.Content('text/html', body.content);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
    return mail.toJSON();
}

exports.httpEmail = functions.https.onRequest((req, res) => {
    cors(request, response, () => {
        // response.status(500).send({test: 'Testing functions'})
        return Promise.resolve()
            .then(() => {
                if (req.method !== 'POST') {
                    const error = new Error('Only POST requests are accepted');
                    error.code = 405;
                    console.log("error 405");
                    throw error;
                }
                const request = client.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: parseBody(req.body)
                });
                console.log("Shit broke");
                return client.API(request)
            })
            .then((response) => {
                if (response.body) {
                    res.send(response.body);
                } else {
                    res.end();
                }
                console.log("Other Shit broke!");
            })
            .catch((err) => {
                console.error(err);
                return Promise.reject(err);
                console.log("Or this shit happened!");
            });
    });
})
