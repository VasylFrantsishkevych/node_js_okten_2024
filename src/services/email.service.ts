import nodemailer, { Transporter } from "nodemailer";
import { configs } from "../config/configs";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { emailConstants } from "../constants/email.constants";
import { EmailTypeToPayload } from "../types/email.type-to-payload.type";

class EmailService {
   private transporter: Transporter;

   constructor() {
     this.transporter = nodemailer.createTransport({
       service: "gmail",
       from: "No reply",
       auth: {
         user: configs.SMTP_EMAIL,
         pass: configs.SMTP_PASSWORD,
       },
     });
 
     const hbsOptions = {
       viewEngine: {
         extname: ".hbs",
         defaultLayout: "main",
         layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
         partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
       },
       viewPath: path.join(process.cwd(), "src", "templates", "views"),
       extName: ".hbs",
     };
 
     this.transporter.use("compile", hbs(hbsOptions));
   }

   // public async sendMail(to: string, type: EmailTypeEnum, contaxt: any): Promise<void> {
   //    const {subject, template} = emailConstants[type]

   //    const options = { to, subject, template, contaxt };
   //    await this.transporter.sendMail(options)
   // }
 
   public async sendMail<T extends EmailTypeEnum>(
     type: T,
     to: string,
     context: EmailTypeToPayload[T],
   ): Promise<void> {
     const { subject, template } = emailConstants[type];
 
     context['frontUrl'] = configs.APP_FRONT_URL;
     const options = { to, subject, template, context };
     await this.transporter.sendMail(options);
   }
 }


export const emailService= new EmailService();