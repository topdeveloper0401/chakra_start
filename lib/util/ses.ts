import { emailTemplates, getEmailTemplate } from './emailTemplates';
const sgMail = require('@sendgrid/mail');

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
      
        sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);
        const msg = {
            to: to,
            from: process.env.NEXT_PUBLIC_OWNER_EMAIL, // Use the email address or domain you verified above
            subject: emailTemplate?.subject,
            text: emailTemplate?.body,
            // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        const data = {
            to: "kattymokh@gmail.com",
            from: "topdeveloper0908@gmail.com",
            subject: `New message from`,
            text: 'message',
            html: 'message'.replace(/\r\n/g, "<br />"),
          };
        //ES6
        try {
            await sgMail.send(data);
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
