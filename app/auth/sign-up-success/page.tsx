import Link from "next/link";
import Image from "next/image";

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] px-4">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
        <Image src="/logo.png" alt="PeytOtoria" width={80} height={80} />
        <h1 className="text-2xl font-bold text-[#f0ede8]">Check your email</h1>
        <p className="text-[#8a8480] leading-relaxed">
          We&apos;ve sent a confirmation link to your email. Click it to activate your account and start playing.
        </p>
        <Link
          href="/auth/login"
          className="w-full py-3 rounded-lg border border-[#3a3a3a] text-[#f0ede8] font-semibold text-sm hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
