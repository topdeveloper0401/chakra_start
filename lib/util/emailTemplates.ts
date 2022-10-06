export type emailTemplates = 'ResetPassword' | 'NewAccount' | 'VerifyAccount';
export const getEmailTemplate = ({
    link,
    to,
    template,
}: {
    link: string;
    to: string;
    template: emailTemplates;
}) => {
    const templates = [
        {
            name: 'ResetPassword' as emailTemplates,
            body: `
          Hi,
  
          To reset your password for your Ilocx Account, please click the link below:
      
          ${link}
      
          If clicking the link above doesn't work, please copy and paste the URL in a new browser window instead. 
      
          Sincerely,
          The Ilocx Team
      
          For security reasons, you shouldn't reply to this email.`,
            subject: 'Reset your password',
        },
        {
            name: 'VerifyAccount' as emailTemplates,
            body: `
          Hi,
  
          Please click the link below to verify your ${to} Ilocx Account.
      
          ${link}
      
          If clicking the link above doesn't work, please copy and paste the URL in a new browser window instead. 
      
          Sincerely,
          The Ilocx Team
      
          For security reasons, you shouldn't reply to this email.`,
            subject: 'Verify you Account',
        },
        {
            name: 'NewAccount' as emailTemplates,
            body: `
          Hi,
  
          A new account has been created for ${to} at Ilocx.com.
        
          Please click the link below to set your password and activate your Ilocx Account.
        
          ${link}
       
          If clicking the link above doesn't work, please copy and paste the URL in a new browser window instead. 
       
          Sincerely,
          The Ilocx Team
        
          For security reasons, you shouldn't reply to this email.`,
            subject: 'Activate your account',
        },
    ];

    return templates.find((t) => t.name === template);
};
