import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="absolute inset-0 bg-[url('/bg-grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] mix-blend-overlay opacity-20 pointer-events-none" />
      <div className="relative z-10 scale-100 sm:scale-110">
        <SignIn />
      </div>
    </div>
  );
}
