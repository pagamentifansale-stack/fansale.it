"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase";

const schema = z
  .object({
    fullName: z.string().min(2, "Inserisci il tuo nome completo"),
    email: z.string().email("Inserisci un indirizzo email valido"),
    password: z
      .string()
      .min(8, "La password deve contenere almeno 8 caratteri"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Le password non coincidono",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        emailRedirectTo: `${window.location.origin}${redirectTo}`,
      },
    });
    if (error) {
      setServerError(
        error.message.includes("already registered")
          ? "Questa email è già registrata. Prova ad accedere."
          : error.message,
      );
      return;
    }
    setEmailSent(true);
  }

  if (emailSent) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 px-4 py-12">
        <Link href="/" className="mb-8 flex flex-col items-center leading-none">
          <span className="text-3xl font-black tracking-tight text-white">
            fan<span className="text-yellow-400">SALE</span>
          </span>
          <span className="text-xs text-gray-400 mt-1">
            Biglietti da fan a fan
          </span>
        </Link>
        <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Controlla la tua email
          </h2>
          <p className="text-sm text-gray-400">
            Ti abbiamo inviato un link di conferma. Clicca sul link per attivare
            il tuo account fanSALE.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
          >
            Torna al login →
          </Link>
        </div>
      </main>
    );
  }

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

      {/* Card */}
      <div className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-1">Crea un account</h1>
        <p className="text-sm text-gray-400 mb-6">
          Hai già un account?{" "}
          <Link
            href={`/login${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`}
            className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors"
          >
            Accedi
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Nome completo
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="Mario Rossi"
              {...register("fullName")}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-800 border text-white placeholder-gray-500 text-sm outline-none transition-colors focus:ring-2 focus:ring-yellow-400/50 ${
                errors.fullName
                  ? "border-red-500"
                  : "border-white/10 focus:border-yellow-400/60"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Almeno 8 caratteri"
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

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-1.5"
            >
              Conferma password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Ripeti la password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-2.5 pr-11 rounded-lg bg-gray-800 border text-white placeholder-gray-500 text-sm outline-none transition-colors focus:ring-2 focus:ring-yellow-400/50 ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-white/10 focus:border-yellow-400/60"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                aria-label={
                  showConfirm ? "Nascondi password" : "Mostra password"
                }
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.confirmPassword.message}
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
              <UserPlus size={16} />
            )}
            {isSubmitting ? "Registrazione in corso…" : "Crea account"}
          </button>
        </form>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-xs text-gray-600 text-center max-w-sm">
        Registrandoti accetti i nostri{" "}
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
