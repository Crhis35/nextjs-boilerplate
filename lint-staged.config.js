module.exports = {
	'*.{js,jsx,ts,tsx}': ['yarn format:lint', 'yarn format:fix'],
	'**/*.ts?(x)': () => 'npm run check-types',
	'*.{json,yaml}': ['prettier --write'],
}
