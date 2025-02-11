/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				eina: ["Eina", "sans-serif"],
				sans: ["Be Vietnam Pro", "serif"],
				bebas: ["Bebas Neue", "serif"],
				inter: ["Inter", "serif"],
				anton: ["Anton", "serif"],
			},
			colors: {
				nill: "#1a2b88",
				darkNill: "#171631",
				dhusor: "#1f2937",
				hDhusor: "#696969",
			},
		},
	},
	plugins: [],
};
