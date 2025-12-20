"use client";

import { ConnectButton } from "panna-sdk/react";

export function RemittEaseAuthButton() {
  return (
    <ConnectButton
      connectButton={{ title: "Sign in / Create account" }}
      connectDialog={{
        title: "Welcome to RemittEase",
        description: "Create your account to send, receive, and deposit instantly.",
      }}
    />
  );
}
