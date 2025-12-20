"use client";

import React from "react";
import { ConnectButton } from "panna-sdk/react"; // ✅ panna, not thirdweb

export function RemittEaseAuthButton({
  title = "Create account / Sign in",
}: {
  title?: string;
}) {
  return (
    <div className="inline-flex">
      <ConnectButton
        // ✅ your types show `title`, NOT `label`
        connectButton={{ title }}
      />
    </div>
  );
}
