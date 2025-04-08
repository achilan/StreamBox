// tailwind.config.js
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx}', // Asegúrate de que Next.js está buscando en la carpeta src
      './pages/**/*.{js,ts,jsx,tsx}', // Si estás usando la carpeta pages también
      './components/**/*.{js,ts,jsx,tsx}', // Si usas componentes fuera de la carpeta pages
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  