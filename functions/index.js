/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendNotificationEmail = functions.database.ref('/quotes/').onWrite(event => {
    const quotes = event.data.val();

    var quoteNum;
    for (quoteNum in quotes) {
        quoteNum = quoteNum;
    }

    var client = quotes[quoteNum].client
    console.log(client);

    // const email = 'joshp@exceldp.co.nz';
    // const displayName = 'josh';

    return sendUpdateEmail(quoteNum, client);
});

function sendUpdateEmail(quoteNum, client) {
    const mailOptions = {
        from: `Excel Quote Manager <noreply@firebase.com>`,
        to: 'heathern@exceldigital.co.nz'
        // to: 'joshp@exceldp.co.nz'
    };
    const mailOptions2 = {
        from: `Excel Quote Manager <noreply@firebase.com>`,
        to: 'krystals@exceldp.co.nz'
        // to: 'joshp@exceldp.co.nz'
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `New quote request: ${quoteNum}`;
    mailOptions.html = `<p><b>Hey team!</b></p><p>A new quote request for <b>${client}</b> has just been submitted!<br>Login <a href="https://excel-quote-manager.firebaseapp.com">here</a> to manage all requests.</p>`;
    mailOptions2.subject = `New quote request: ${quoteNum}`;
    mailOptions2.html = `<p><b>Hey team!</b></p><p>A new quote request for <b>${client}</b> has just been submitted!<br>Login <a href="https://excel-quote-manager.firebaseapp.com">here</a> to manage all requests.</p>`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New quote request notification email sent to:', mailOptions.to);
        mailTransport.sendMail(mailOptions2).then(() => {
            console.log('New quote request notification email sent to:', mailOptions2.to);
        });
    });
}