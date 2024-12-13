import { LoginFormDemo } from "@/pages/auth/login";
import { SignupFormDemo } from "@/pages/auth/register";

export default function Home() {
  return (
   <div className="">
    <LoginFormDemo/>
    <SignupFormDemo/>
   </div>
  );
}
