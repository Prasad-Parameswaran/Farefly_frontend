/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    extend: {
      backgroundImage: {
        'custom-image': "url(https://static.wixstatic.com/media/7fa060_1baf30fa23f340fbad6657dafc4f285e~mv2.jpg/v1/fill/w_1899,h_950,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7fa060_1baf30fa23f340fbad6657dafc4f285e~mv2.jpg)",
        'custom-img': "url(https://static.wixstatic.com/media/7fa060_1baf30fa23f340fbad6657dafc4f285e~mv2.jpg/v1/fill/w_1899,h_950,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7fa060_1baf30fa23f340fbad6657dafc4f285e~mv2.jpg)",
      },

    },

  },
  plugins: [],
};

