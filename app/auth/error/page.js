"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errors = {
    default: "An error occurred during authentication.",
    AccessDenied:
      "Access denied. You do not have permission to access this resource.",
    Verification:
      "The verification link may have been used or is invalid. Sign in to request a new link.",
    OAuthSignin: "Error during OAuth sign-in. Please try again.",
    OAuthCallback: "Error during OAuth callback. Please try again.",
    OAuthCreateAccount: "Error creating OAuth account. Please try again.",
    EmailCreateAccount: "Error creating email account. Please try again.",
    Callback: "Error during authentication callback. Please try again.",
    OAuthAccountNotLinked: "Email already in use with another provider.",
    CredentialsSignin:
      "Invalid credentials. Please check your email and password.",
  };

  const errorMessage = error && errors[error] ? errors[error] : errors.default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Dev Tools Platform
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-red-600">
            Authentication Error
          </h2>
        </div>

        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {errorMessage}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Link
            href="/auth/login"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to sign in
          </Link>

          <Link
            href="/auth/register"
            className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
