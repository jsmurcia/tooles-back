import nodemailer from "nodemailer";

export const registerEmail = async ({ email, name, token }) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9917b28bbd17bd",
      pass: "c967fea7297328",
    },
  });

  const res = await transport.sendMail({
    from: "Tooles test - Sebastian Murcia",
    to: email,
    subject: " Compruba tu cuenta para terminar el registro",
    text: "Esto es un test para tooles",
    html: ` <p>Hola ${name}. Comprueba tu cuenta</p>  <br/>
                <a href="${process.env.CLIENT_URL}/auth/confirm/?token=${token}">Comprobar cuenta con env</a>
          `,
  });

  console.log("el token", token);
};
