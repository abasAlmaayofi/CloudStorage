module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'logo-blue': '#145386',
      },
      backgroundImage: {
        'hero-image': 'url("./assets/sectionimage.jpg")',
        'signin-image': 'url("./assets/signinImage.jpg")',
        'logo-image': 'url("./assets/logo.png")',
        'yellow-folder': 'url("./assets/yellowFolder.png")',
        'blue-folder': 'url("./assets/blueFolder.png")',
      },
    },
  },
  plugins: [],
}