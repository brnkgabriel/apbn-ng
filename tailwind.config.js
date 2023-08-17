/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				'mid-blue': '#42526E',
				'dark-blue': '#171332',
				'orange': '#DA561D',
				'light-orange': '#fff7e9',
				'red': '#F71002',
				'light-bg': '#F1F3F5',
				'dark-alternate': '#132034',
				'darkest': '#0c0622',
				'darker': '#160b3c',
				'dark': '#29166f',

				'font': '#282828',
				'apbn-blue': '#29166f',
				'apbn-lblue': '#028fd9'
			},
			borderRadius: {
				"sm4": "4px"
			},
			fontSize: {
				'2xs': "10px"
			},
			boxShadow: {
				"rcn": "0 2px 5px 0 rgba(0,0,0,0.2)"
			},
			aspectRatio: {
				'16/9': '16 / 9'
			},
			backgroundImage: {
        'home-mb': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/prayer_452x452.webp')",
        'home-dk': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/prayer_1290x268.webp')",
        'home-tr-mb': "url('/assets/hero-bg/transmbl_452x452.webp')",
        'home-tr-dk': "url('/assets/hero-bg/transdsk_1511x495.webp')",
        'blog-dk': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/blog_1511x495.webp')",
        'blog-mb': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/blog_450x450.webp')",
        'dept-dk': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/prayer_1290x268.webp')",
        'dept-mb': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/prayer_452x452.webp')",
        'serm-dk': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/sermons_1511x495.webp')",
        'serm-mb': "linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.6)),url('/assets/hero-bg/sermons_450x450.webp')",
        'regi-dk': "linear-gradient(rgba(0, 0, 0, 0.85),rgba(0, 0, 0, 0.85)),url('/images/uploads/08_19_thecraftsmen_1290x268v2.webp')",
        'regi-mb': "linear-gradient(rgba(0, 0, 0, 0.85),rgba(0, 0, 0, 0.85)),url('/images/uploads/08_19_thecraftsmen_833x833v2.webp')",
      },
			backgroundPosition: {
				"shift": "center center"
			},
			backgroundSize: {
				"113": "113%"
			},
		},
	},
	plugins: [],
}
