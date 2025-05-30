// /** @type {import('ts-jest').JestConfigWithTsJest} **/

export default {
	testEnvironment: 'jsdom',
	preset: 'ts-jest',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		'^.+.tsx?$': ['ts-jest', {}],
	},
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
	},
	globals: {
		fetch: global.fetch,
	},
};
