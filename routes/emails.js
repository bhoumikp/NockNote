const express = require('express');
const nodemailer = require('nodemailer')
const router= express.Router();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.usermail,
      pass: process.env.userpw
    }
  });

  router.post("/sendotp",(req, res) =>{

    otp = String(req.body.otp)
    let mailOptions = {
      from: "bhoumikpagdhare300@gmail.com",
      to: req.body.email,
      subject: "OTP to reset password",
      text: otp,
    };
   
    transporter.sendMail(mailOptions,  (err, data) => {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
        res.json({ status: "Email sent" });
      }
    });
   });

   module.exports = router;
