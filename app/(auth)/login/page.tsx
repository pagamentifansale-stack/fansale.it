"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  email: z.string().email("Inserisci un indirizzo email valido"),
  password: z.string().min(6, "La password deve contenere almeno 6 caratteri"),
});

type FormData = z.infer<typeof schema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(
        error.message === "Invalid login credentials"
          ? "Email o password non corretti. Riprova."
          : error.message,
      );
      return;
    }
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8">
      <h1 className="text-2xl font-bold text-white mb-1">Accedi</h1>
      <p className="text-sm text-gray-400 mb-6">
        Non hai un account?{" "}
        <Link
          href={`/signup${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`}
          className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
        >
          Registrati
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="tua@email.it"
            {...register("email")}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 border text-white placeholder-gray-500 text-sm outline-none transition-colors focus:ring-2 focus:ring-yellow-400/50 ${
              errors.email
                ? "border-red-500"
                : "border-white/10 focus:border-yellow-400/60"
            }`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Password dimenticata?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              {...register("password")}
              className={`w-full px-4 py-2.5 pr-11 rounded-lg bg-gray-800 border text-white placeholder-gray-500 text-sm outline-none transition-colors focus:ring-2 focus:ring-yellow-400/50 ${
                errors.password
                  ? "border-red-500"
                  : "border-white/10 focus:border-yellow-400/60"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
              aria-label={
                showPassword ? "Nascondi password" : "Mostra password"
              }
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Server error */}
        {serverError && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400">
            {serverError}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-bold text-sm transition-colors"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <LogIn size={16} />
          )}
          {isSubmitting ? "Accesso in corso…" : "Accedi"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4 py-12">
      {/* Logo */}
      <Link href="/" className="mb-8 flex flex-col items-center leading-none">
        <span className="text-3xl font-black tracking-tight text-white">
          fan<span className="text-yellow-400">SALE</span>
        </span>
        <span className="text-xs text-gray-400 mt-1">
          Biglietti da fan a fan
        </span>
      </Link>

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8 flex items-center justify-center h-64">
            <Loader2 size={24} className="animate-spin text-yellow-400" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>

      {/* Footer note */}
      <p className="mt-6 text-xs text-gray-600 text-center max-w-sm">
        Accedendo accetti i nostri{" "}
        <Link
          href="/terms"
          className="underline hover:text-gray-400 transition-colors"
        >
          Termini di servizio
        </Link>{" "}
        e la{" "}
        <Link
          href="/privacy"
          className="underline hover:text-gray-400 transition-colors"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
