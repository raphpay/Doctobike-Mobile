export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#11ABEC",
        destructive: "#FD755F",
        success: "#0ED094",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
