module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        "main-h": "96vh",
      },
      minWidth: {
        "app-mw": "17.5rem",
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
        top: "top",
      },
      spacing: {
        // navBar展开header手机端高度
        items: "15.875rem",
        // navBar未展开header手机、pc端高度
        header: "5.375rem",
        // navBar展开pc端高度
        "lg-items": "8rem",
        // navBar未展开分割波浪线高度
        "no-nav-shade": "5.25rem",
        // navBar 展开后分割波浪线高度
        "nav-shade": "15.875rem",
        // navBar 展开后pc端波浪线高度
        "pc-shade": "8rem",
      },
      backgroundImage: (theme) => ({
        bg: "url('./src/assets/img/bg.png')",
      }),
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
