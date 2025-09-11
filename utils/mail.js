const nodemailer=require('nodemailer')

const transporter= nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.PASSWROD_USER
    }
})

const sendEmail=async(to,subject,text)=>{
    try{
        let mailoptions={
            from:process.env.EMAIL_USER,
            to:to,
            subject:subject,
            text:text
        }

        const info= await transporter.sendMail(mailoptions)
        console.log('Email sent: ', info.response);
        return info;
    }catch(err){console.log(err);}
}
module.exports = { sendEmail };
