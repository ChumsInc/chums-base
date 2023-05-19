import Debug from 'debug';
import { createTransport } from 'nodemailer';
const debug = Debug('chums:lib:mailer');
export const getTs = () => {
    return Date.now();
};
export const getTs36 = () => {
    return getTs().toString(36);
};
/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
export const getLogoImageAttachment = (ts = getTs36()) => {
    return {
        filename: 'chums-logo-badge-400px.png',
        path: `/var/www/intranet.chums.com/images/chums-logo-badge-400px.png`,
        cid: `logo-${ts}@chums.com`
    };
};
function isAddress(address) {
    return typeof address !== "string" && address.address !== undefined;
}
function getEmailAddress(email) {
    return isAddress(email) ? email.address : email;
}
function addressIncludes(subject, search) {
    if (Array.isArray(subject)) {
        return subject.map(email => getEmailAddress(email)).includes(getEmailAddress(search));
    }
    return getEmailAddress(subject) === getEmailAddress(search);
}
export const sendGmail = async ({ to = [], cc = [], bcc = [], replyTo, from, subject, html, textContent, attachments }) => {
    try {
        const _cc = Array.isArray(cc) ? cc : (!!cc ? [cc] : []);
        const _to = Array.isArray(to) ? to : [to];
        const _bcc = Array.isArray(bcc) ? bcc : (!!bcc ? [bcc] : []);
        if (!from) {
            from = `"Chums AutoMailer" <automated@chums.com>`;
        }
        if (replyTo) {
            if (Array.isArray(replyTo)) {
                replyTo.forEach(email => {
                    if (!addressIncludes(_cc, email)) {
                        _cc.push(email);
                    }
                });
            }
            else if (!addressIncludes(_cc, replyTo)) {
                _cc.push(replyTo);
            }
        }
        const transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_APP_PASSWORD,
            }
        });
        let mailOptions = {
            from,
            to: _to,
            cc: _cc,
            bcc: _bcc,
            replyTo,
            subject,
            html,
            text: textContent,
            attachments
        };
        debug('sendGmail()', { to: _to, from, subject, replyTo });
        // return mailOptions;
        return await transporter.sendMail(mailOptions);
    }
    catch (err) {
        if (err instanceof Error) {
            debug("sendGmail()", err.message);
            return Promise.reject(err);
        }
        debug("sendGmail()", err);
        return Promise.reject(err);
    }
};
export const sendEmail = sendGmail;
