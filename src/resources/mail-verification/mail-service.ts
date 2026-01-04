import { Resend } from "resend";
import { createTransport } from "nodemailer";
import { envKeys } from "../../common/enums/infra/env-key";
import { getRequiredEnv } from "../../common/utils/infra/env-functions";
import { mailProviders } from "./constants/mail-providers";

interface MailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

const nodeMailerUser = getRequiredEnv(envKeys.nodeMailerUser);
const nodeMailerPassword = getRequiredEnv(envKeys.nodeMailerPassword);
const resendFromEmail = getRequiredEnv(envKeys.resendFromEmail);
const resendClient = new Resend(getRequiredEnv(envKeys.resendApiKey));

const gmailSmtpConfig = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: nodeMailerUser,
        pass: nodeMailerPassword,
    },
} as const;

async function sendMailWithNodemailer({ to, subject, html, from = nodeMailerUser }: MailOptions) {
    const transporter = createTransport(gmailSmtpConfig);

    return transporter.sendMail({ to, subject, html, from });
}

async function sendMailWithResend({ to, subject, html, from = resendFromEmail }: MailOptions) {
    return resendClient.emails.send({ from, to, subject, html });
}

export async function sendMail(options: MailOptions) {
    const mailProvider = getRequiredEnv(envKeys.mailProvider);

    if (mailProvider === mailProviders.nodemailer) {
        return sendMailWithNodemailer(options);
    }

    return sendMailWithResend(options);
}
