// apps/mobile/app/mockups.tsx
import React from "react";
import Mockups from "../src/screens/Mockups";

export default function Screen() {
  return <Mockups />;
}
import { router } from "expo-router";
// e.g., on a dev button press:
router.push("/mockups");
