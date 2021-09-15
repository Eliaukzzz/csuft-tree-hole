module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        "main-h": "96vh",
      },
      minWidth: {
        "main-w": "94vw",
        "sidebar-w": "70vw",
      },
      spacing: {
        "main-p": "2vh",
      },
      colors: {
        gary: {
          "theme-gary": "#636C79",
        },
        green: {
          "theme-green": "#8BB7A2",
        },
      },
      transitionProperty: {
        h: "height",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
