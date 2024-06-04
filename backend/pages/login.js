import Image from "next/image";

export default function Login() {
  return (
    <>
      <div className="loginfront flex flex-center flex-col full-w">
        <Image src="/img/profile_bg.png" width={250} height={250} />
        <h1>Welcome Admin to the blog!</h1>
        <p>
          Visit the main website <a href="https://www.beatmastermind.com">BMM</a>
        </p>

        <button className="mt-2">Login with Google</button>
      </div>
    </>
  );
}
