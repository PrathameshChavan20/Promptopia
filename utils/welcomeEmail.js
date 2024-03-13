import { emailQueue } from "@/app/api/queue/emailQueue";
import { signUpEmailtemp } from "@/public/assets/htmlFiles/signUpEmail";
export const sendWelcomeEmail = async (userEmail, hrefLink) => {
  await emailQueue
    .add("sendEmailto" + userEmail, {
      email: userEmail,
      subject: "Welcome to Our Application",
      message: await signUpEmailtemp(userEmail, hrefLink),
    })
    .then((job) => {
      console.log(`Job added to Queue on Redis having email ${userEmail}`);
    });
};
