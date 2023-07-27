const nodemailer = require('nodemailer');

nodemailer.createTestAccount((err, account) => {
  if (err) {
    console.error('Error creating test account:', err);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "",
      pass: ""
    }
  });

  const mailOptions = {
    from: 'Jake',
    to: 'm.sp4rrow@gmail.com',
    subject: 'Test Email from Nodemailer',
    text: 'This is a test email sent from Node.js using Nodemailer with Ethereal Email.',
    html: `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
   
     <head>
       <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
       <title>Digest</title>
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
     </head>
   
     <body style="margin: 50px">
       <table id="parent" style="margin: 0 auto; background: #F7F7F6; font-family: 'Roboto', sans-serif;" cellpadding="0" cellspacing="0" width="600">
         <tr>
           <th style="padding: 32px 0" align="center">
             <img style="object-fit: cover; border-radius: 50%; width: 45px; height: 45px; vertical-align: middle;" src="https://s3.us-east-2.amazonaws.com/forexchatroom/3ca2c240ecee01794e265db2ab067f4.png" alt="" width="44" height="auto">
             <h3 style="margin: 0 0 0 16px; display: inline-block; color: #22314C; vertical-align: middle;">
               Genesiv
             </h3>
           </th>
         </tr>
   
         <tr>
           <td width="100%" height="1" colspan="2">
             <div style="border-bottom: solid 1px #C4C4C4"></div>
           </td>
         </tr>
   
         <table style="padding: 40px 36px; margin: 0 auto; background: #f7f7f6; font-family: 'roboto', sans-serif;" width="600" cellspacing="0">
           <th style="padding: 0; background-color: #ffffff;">
             <table style="font-family: 'roboto', sans-serif;" width="100%" cellspacing="0">
               <tr >
                 <th colspan="2">
                   <h3 style="margin: 0; padding: 32px 0 16px 0; font-size: 18px; color: #33343c;">
                     Hey, such and such!
                   </h3>
                   <h2 style="margin: 0; font-size: 28px; padding: 0 40px 24px 40px; color: #33343c;">
                     You have <bold>25</bold> DMs </br> awaiting your response
                   </h2>
                 </th>
               </tr>
   
               <tr>
                 <th>
                   <table cellspacing="0" cellpadding="0" align="center" style="height: 110px; position: relative; width: 180px; position:">
                     <tr>
                       <td style="position: absolute; left: calc(50% - 120px); transform: 50%;">
                         <img src="https://plus.unsplash.com/premium_photo-1678935941839-e66f46191c66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                              style=" border-radius: 50%; border: 4px solid #ffffff; object-fit: cover; width:100px; height: 100px;">
                       </td>
                       <td style="position: absolute; left: 50%; transform: translateX(-50%)">
                         <img src="https://images.unsplash.com/photo-1682862261357-31c4ec647807?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" 
                              style="border-radius: 50%; border: 4px solid #ffffff; object-fit: cover; width:100px; height: 100px;">
                       </td>
                       <td style="position: absolute; left: 50%; transform: translateX(-50%); margin-left: 70px">
                         <img src="https://images.unsplash.com/photo-1682999029155-d8b26349468f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" 
                              style=" border-radius: 50%; border: 4px solid #ffffff; object-fit: cover; width:100px; height: 100px;">
                       </td>
                     </tr>
                   </table>
                 </th>
               </tr>
   
               <tr>
                 <th>
                   <h3 style="margin: 0; padding: 8px 0 24px 0; font-size: 18px; color: #33343c;">
                     Delilah Dee, Joel Jenski and 1 other
                   </h3>
                 </th>
               </tr>
               <tr>
                 <th style="padding-bottom: 32px;">
                   <a href="" target="_blank"
                      style="text-decoration: none; background: #D9D9D9; border-radius: 4px; color: #1B1C1D; display: inline-block; width: 240px; height: 45px; line-height: 45px;">
                     View Message
                   </a>
                 </th>
               </tr>
             </table>
           </th>
         </table>
   
         <table style="margin: 8px auto; font-family: 'Roboto', sans-serif;" cellpadding="0" cellspacing="0" width="600">
           <tr align="left">
             <th>
               <form action=""
                     method="post">
                 <input type="hidden" name="data" value="value">
                 <input type="submit" value="Change your email notification preference" 
                        style="background-color: transparent; border: none; color: #999; font-style: italic; font-size: 10px; font-weight: 400; cursor: pointer; text-decoration: underline;">
               </form>
             </th>
           </tr>
         </table>
         
       </table>
     </body>
   </html>
   `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent successfully:', info.response);

      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  });
});