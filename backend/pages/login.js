import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // loading state, loader or any other indicator
    return (
      <div className="loadingdata flex flex-col flex-center wh_100">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  const router = useRouter();

  async function login() {
    await router.push("/");
    await signIn();
  }

  if (session) {
    router.push("/");
    return null; // return null or any loading indicator
  }

  // not session or not logged in then show this page for login
  if (!session) {
    return (
      <>
        <div className="loginfront flex flex-center flex-col full-w">
          <Image src="/img/1F84564DDFA5.PNG" width={250} height={250} />
          <h1>Welcome Admin to the blog!</h1>
          <p>
            Visit the main website <a href="https://www.beatmastermind.com">BMM</a>
          </p>

          <button onClick={login} className="mt-2">
            Login with Google
          </button>
        </div>
      </>
    );
  }
}
