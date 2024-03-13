import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import { connectToDB } from "@/utils/database";
import { sendWelcomeEmail } from "@/utils/welcomeEmail";
//this is the flow:  1.first it takes credentials from google -providers then displays sign-in page
//2. then after choosing the email control goes to the signIn function created the new user
//3. after receiving the true from flow go to the callback session where it stores the session
//having expiry of 30 days and returns session to browser

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          }).then(() => {
            console.log(
              "new user created into the db having email as : " + profile.email
            );
          });
          await sendWelcomeEmail(profile.email, process.env.NEXTAUTH_URL);
        }
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
