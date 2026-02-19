import { Attachment } from "nodemailer/lib/mailer/index.js";
export interface Address {
    name: string;
    address: string;
}
export type EmailAddressProp = string | Address | (string | Address)[];
export interface SendMailProps {
    to: EmailAddressProp;
    cc?: EmailAddressProp;
    bcc?: EmailAddressProp;
    replyTo?: EmailAddressProp;
    from?: string | Address;
    subject?: string;
    html: string | Buffer;
    textContent?: string;
    attachments?: Attachment[];
}
export declare const getTs: () => number;
export declare const getTs36: () => string;
/**
 *
 * @param {string} ts
 * @return {{path: string, filename: string, cid: string}}
 */
export declare const getLogoImageAttachment: (ts?: string) => {
    filename: string;
    path: string;
    cid: string;
};
export declare const sendGmail: ({ to, cc, bcc, replyTo, from, subject, html, textContent, attachments }: SendMailProps) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
export declare const sendEmail: ({ to, cc, bcc, replyTo, from, subject, html, textContent, attachments }: SendMailProps) => Promise<import("nodemailer/lib/smtp-transport/index.js").SentMessageInfo>;
