import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                helvetica: ['Helvetica', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
