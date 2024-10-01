import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(90, 'days');
    const deletedCount = await oldPasswordRepository.deleteManyByParams({
      createdAt: {$lt: date}
    });
    console.log(`Deleted ${deletedCount} old password`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldPasswordCronJob = new CronJob("0,20,40 * * * * *", handler);