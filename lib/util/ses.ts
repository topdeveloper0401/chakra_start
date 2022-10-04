import { emailTemplates, getEmailTemplate } from './emailTemplates';

export const sendEmail = async ({
    to,
    link,
    template,
}: {
    to: string;
    link: string;
    template: emailTemplates;
}) => {
    const emailTemplate = getEmailTemplate({ link, to, template });

    try {
        // const data = await sesClient.send(new SendEmailCommand(params));
        // return data.$metadata; // For unit tests.
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
        const msg = {
            to: to,
            from: process.env.NEXT_PUBLIC_OWNER_EMAIL, // Use the email address or domain you verified above
            subject: emailTemplate?.subject,
            text: emailTemplate?.body,
            // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        //ES6
        try {
            await sgMail.send(msg);
            return 200;
        } catch (error: any) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body);
            }
        }
    } catch (err) {
        console.log('Error', err);
    }
};
