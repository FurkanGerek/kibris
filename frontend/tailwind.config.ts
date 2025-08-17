import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                // CDN'den gelen font adını ve yedeklerini belirtiyoruz
                sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;