"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorDetails() {
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
          <h3 className="text-sm font-medium text-red-800">{errorMessage}</h3>
        </div>
      </div>
    </div>
  );
}