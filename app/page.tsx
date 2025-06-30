import Link from "next/link";
import ButtonBase from "@/components/atoms/ButtonBase";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[1024px] mx-auto">
        <div>
          <h1 className="text-[100px] leading-20">Your money, your move.</h1>
          <p className="text-lg w-full max-w-[500px] mt-5">
            Designed to help you <u>understand where your money goes</u>, make
            better decisions, and build habits that last.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-x-4">
          <Link href="/login" prefetch={false}>
            <ButtonBase className="px-3 py-1 font-bold cursor-pointer">
              Log In
            </ButtonBase>
          </Link>
          <Link href="/register" prefetch={false}>
            <ButtonBase className="bg-[#333] text-white rounded-full px-3 py-1 cursor-pointer">
              Sign In
            </ButtonBase>
          </Link>
        </div>
      </div>
    </div>
  );
}
