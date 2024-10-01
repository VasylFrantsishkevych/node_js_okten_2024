import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";
import { EmailTypeEnum } from "../enums/email-type.enum";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(7, 'days');
    const users = await userRepository.findWithOutActivity(date);
    await Promise.all(
      users.map(async (user) => {
         await emailService.sendMail(EmailTypeEnum.OLD_VISIT, user.email, {
            name: user.name,
         })
      })
    )
    console.log(`Sent ${users.length} old visit emails`);
  } catch (error) {
    console.error(error);
  }
};

export const oldVisitCronJob = new CronJob("0,20,40 * * * * *", handler);