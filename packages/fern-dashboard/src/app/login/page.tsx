import { redirect } from "next/navigation";

import { LoginPage } from "@/components/login-page/LoginPage";

import { getCurrentSession } from "../services/auth0/getCurrentSession";

export default async function Page() {
  const session = await getCurrentSession();

  if (session == null) {
    return <LoginPage />;
  } else {
    redirect("/");
  }
}
