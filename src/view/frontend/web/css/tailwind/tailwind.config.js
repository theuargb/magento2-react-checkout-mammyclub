const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: colors.blue["300"],
          DEFAULT: colors.blue["800"],
          darker: colors.blue["900"],
        },
        secondary: {
          lighter: colors.blue["100"],
          DEFAULT: colors.blue["200"],
          darker: colors.blue["300"],
        },
        background: {
          lighter: colors.blue["100"],
          DEFAULT: colors.blue["200"],
          darker: colors.blue["300"],
        },
        gray: {
          extralighter: "#cccccc",
          lighter: "#777777",
          DEFAULT: "#999999",
        },
      },
      textColor: {
        orange: colors.orange,
        primary: {
          lighter: "#111111",
          DEFAULT: "#999999",
          darker: "#777777",
        },
        secondary: {
          lighter: colors.gray["400"],
          DEFAULT: colors.gray["600"],
          darker: colors.gray["800"],
        },
        green: {
          DEFAULT: "#5DBA5D",
        },
        link : "#2b89b4",
      },
      backgroundColor: {
        primary: {
          lighter: colors.blue["600"],
          DEFAULT: colors.blue["700"],
          darker: colors.blue["800"],
        },
        secondary: {
          lighter: colors.blue["100"],
          DEFAULT: colors.blue["200"],
          darker: colors.blue["300"],
        },
        container: {
          lighter: "#f2f2f2",
          DEFAULT: "#fafafa",
          darker: "#f5f5f5",
        },
        orange: {
          DEFAULT: "#e86720"
        }
      },
      borderColor: {
        primary: {
          lighter: colors.blue["600"],
          DEFAULT: colors.blue["700"],
          darker: colors.blue["800"],
        },
        secondary: {
          lighter: colors.blue["100"],
          DEFAULT: colors.blue["200"],
          darker: colors.blue["300"],
        },
        container: {
          lighter: "#eeeeee",
          DEFAULT: "#cccccc",
          darker: "#b6b6b6",
        },
        orange: "#d0751a",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      fontSize: {
        xxs: ["11px", "11px"],
        xs: ["12px", "12px"],
        base: ["13px", "13px"],
        md: ["15px", "15px"],
        lg: ["16px", "16px"],
        xlg: ["20px", "20px"],
        xxlg: ["24px", "24px"],
      },
    },
    container: {
      screens: {
        lg: "1024px",
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["last", "hover", "focus"],
      margin: ["last"],
      opacity: ["disabled"],
      backgroundColor: ["even", "odd"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
  purge: {
    content: [
      "../../../../../reactapp/src/**/*.jsx",
      "../../../templates/*.phtml",
    ],
  },
};
