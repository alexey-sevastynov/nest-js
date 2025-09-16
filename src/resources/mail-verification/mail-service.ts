import { Resend } from "resend";
import { envKeys } from "common/enums/infra/env-key";
import { getRequiredEnv } from "common/utils/infra/env-functions";

interface MailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}

const resendClient = new Resend(getRequiredEnv(envKeys.resendApiKey));

export async function sendMail({ to, subject, html, from = "onboarding@resend.dev" }: MailOptions) {
    return resendClient.emails.send({ from, to, subject, html });
}
