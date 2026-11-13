/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#F6F2EA",
          secondary: "#EFE8DC",
          card: "#FFFFFF",
          cream: "#F7F3EA",
          creamWarm: "#F3ECE1",
          creamDeep: "#EBE3D3",
          warm: "#FAF7F0",
        },
        brand: {
          dark: "#1F1A16",
          black: "#14110E",
          secondary: "#685E53",
          muted: "#847A6E",
          border: "#E2D8C6",
          borderLight: "#EDE6D8",
          accent: "#A78044",
          accentHover: "#8E6B34",
          gold: "#BD9552",
          lightGold: "#DFCA99",
          brass: "#B59359",
          sand: "#E5DEC9",
          cream: "#F6F2EA",
        }
      },
      fontFamily: {
        sans: ["Outfit", "Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["Outfit", "Plus Jakarta Sans", "sans-serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        number: ["Outfit", "Plus Jakarta Sans", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.15em",
      },
      boxShadow: {
        'subtle': '0 2px 12px rgba(0, 0, 0, 0.04)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.06)',
        'elevated': '0 20px 45px -15px rgba(27, 27, 27, 0.12)',
        'gold': '0 10px 25px -5px rgba(181, 147, 89, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
