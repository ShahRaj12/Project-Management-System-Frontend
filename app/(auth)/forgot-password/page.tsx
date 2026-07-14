"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/lib/validators";
import authService from "@/services/auth.service";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ROUTES } from "@/config/routes";

interface ForgotPasswordInputs {
  email: string;
}

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInputs>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInputs) => {
    setFormError(null);
    setSuccess(false);
    try {
      await authService.forgotPassword(data.email);
      setSuccess(true);
    } catch (err: any) {
      setFormError(err.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-955 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-8 border border-gray-150 dark:border-gray-800 rounded-2xl shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-955 text-gray-900 dark:text-white">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your email and we will send you a password reset link
          </p>
        </div>

        {success ? (
          <Alert variant="success" title="Success">
            If this email is registered, we have sent a password reset link.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {formError && (
              <Alert variant="error" title="Error">
                {formError}
              </Alert>
            )}

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
              Send Reset Link
            </Button>
          </form>
        )}

        <div className="text-center text-sm">
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-indigo-650 hover:text-indigo-500 text-indigo-600 dark:text-indigo-400"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
