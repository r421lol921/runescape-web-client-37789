import Link from "next/link";
import Image from "next/image";

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1a] px-4">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
        <Image src="/logo.png" alt="PeytOtoria" width={72} height={72} className="opacity-60" />
        <h1 className="text-2xl font-bold text-[#f0ede8]">Authentication Error</h1>
        <p className="text-[#8a8480] leading-relaxed">
          Something went wrong during sign in. Please try again.
        </p>
        <Link
          href="/auth/login"
          className="w-full py-3 rounded-lg bg-[#c8a96e] text-[#1a1a1a] font-semibold text-sm hover:bg-[#a8894e] transition-colors"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
