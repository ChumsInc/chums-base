export interface Address {
    name: string;
    address: string;
}
export interface SendMailProps {
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    replyTo?: string;
    from?: string;
    subject?: string;
    html: string;
    textContent?: string;
    attachments?: any;
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
export declare const sendGmail: ({ to, cc, bcc, replyTo, from, subject, html, textContent, attachments }: SendMailProps) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const sendEmail: ({ to, cc, bcc, replyTo, from, subject, html, textContent, attachments }: SendMailProps) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
