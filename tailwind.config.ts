/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      // sans: ['sofia-pro', 'sans-serif'],
      display: ['Montserrat', 'sans-serif'],
      body: ['sofia-pro', 'sans-serif'],
      code: ['attribute-mono', 'monospace'],
    },
    extend: {
      colors: {
        dark: "#1c1c1c",
        // dark: "#181818",
        light: "#fcfcfc",
        // 'light-primary': "#f3f3f3",
        'light-primary': "#a0a0a0",
        'light-text': "#707070",
        'light-secondary': "#dfdfdf",
        'darkest-light': "eeeeee",
        darkest: "#161616",
        'dark-text': "#7e7e7e",
        'dark-primary': "#313131",
        'dark-secondary': "#343434",
        'bord-light': "#d4d4d4",
        'bord-dark': "#505050",
        'font-light': "#ededed",
        'primary': "#ff1f5d",
        'primary-light': "#ff3f63", // rgb(255, 92, 122)
        'primary-dark': "#ff1757", // rgb(255, 92, 122)
        secondary: "#58E6D9", // 80,230,217
        accent: "#7B00D3",
        accentDark: "#ffdb4d",
        foreground: "#7e7e7e",
        'foreground-title': "#171717",
        'foreground-light': "#707070",
        footer: "#161616",
        gray1: '#f8f8f8',
        gray2: '#f3f3ff',
        gray3: '#b2becd',
        gray4: '#9eaeb8',
        gray5: '#454e56',
        gray6: '#3a4856',
        gray7: '#2a2929',
        gray8: '#283255',
        'codeBg-dark': '#2a2929',
        'codeBg-light': '#eeeeee',
        // gray: "#747474",
      },
      boxShadow: {
        '3xl': '0 5px 20px rgb(0 0 0 / 30%)',
        '4xl': '0 5px 20px rgb(0 0 0 / 90%)',
        'dark-cyan': '0 4px 6px -1px rgba(0, 139, 139, 0.1), 0 2px 4px -1px rgba(0, 139, 139, 0.06)',
      },
      fontSize: {
        'md': ['0.88rem', '24px'],
        'mini': ['0.7rem', '16px'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        roll: "roll 24s linear infinite",
        pop: 'pop 0s ease-in-out',
      },
      keyframes: {
        roll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" }
        },
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '60%': { transform: 'scale(1.2)' },
        },
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 100px)",

        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 100px)",

        circularLightLg:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 80px)",

        circularDarkLg:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 8px,#1b1b1b 80px)",

        circularLightMd:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 60px)",

        circularDarkMd:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 6px,#1b1b1b 60px)",

        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#f5f5f5 5px,#f5f5f5 40px)",

        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,#1b1b1b 4px,#1b1b1b 40px)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      xl1: { max: "1115px" },
      // => @media (max-width: 1115px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      // sxl: "1180px",
      //   // @media (min-width: 1180px){...}

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

