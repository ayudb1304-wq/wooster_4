import { Fraunces, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";

// Display: Fraunces variable, opsz + WONK axes. Weights used: 300, 600.
export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "WONK"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body: Schibsted Grotesk 400 + 600.
export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-schibsted",
  display: "swap",
});

// Numbers only: JetBrains Mono 500.
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontClassNames = `${fraunces.variable} ${schibsted.variable} ${jetbrains.variable}`;
