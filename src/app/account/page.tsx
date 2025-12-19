import Image from "next/image";
import { RemittEaseAuthButton } from "@/components/RemittEaseAuthButton";

export default function AccountPage() {
  return (
    <main className="min-h-[100dvh] bg-white">
      <div className="mx-auto max-w-md px-5 pt-10 pb-14">
        <header className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-xl">
            {/* file is in /public as: RE icon.png */}
            <Image
              src="/RE%20icon.png"
              alt="RemittEase"
              width={40}
              height={40}
              priority
            />
          </div>
          <div>
            <p className="text-sm text-neutral-500">RemittEase</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Sign in to continue
            </h1>
          </div>
        </header>

        <section className="mt-6 rounded-2xl border border-neutral-200 p-4 shadow-sm">
          <p className="text-sm text-neutral-600">
            Create your RemittEase account or sign in to send money globally.
          </p>

          <div className="mt-4">
            <RemittEaseAuthButton />
          </div>

          <p className="mt-3 text-xs text-neutral-500">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </section>
      </div>
    </main>
  );
}
