import WelcomeTemplate from "@/emails/WelcomeTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  resend.emails.send({
    from: "...", // TODO: I need to create a domain that i own and then add it to my resend.com account
    to: "danielu35@gmail.com",
    subject: "...",
    react: <WelcomeTemplate name="Daniel" />,
  });

  return NextResponse.json({});
}
