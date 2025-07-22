/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
    	extend: {
    		fontFamily: {
       			sans: ['var(--font-geist-sans)'],
        		mono: ['var(--font-geist-mono)'],
    		},
    	},
	},
};