const { transform } = require('babel-core');

const FIXTURE = `
  import test from './test.svg';
`;

const EXPECTED = `var test = '<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><title>home</title><path d="M37.6 24.104l-4.145-4.186v-6.389h-3.93v2.416L26.05 12.43a1.456 1.456 0 0 0-2.07 0L12.43 24.104a1.488 1.488 0 0 0 0 2.092c.284.288.658.431 1.031.431h1.733V38h6.517v-8.475h6.608V38h6.517V26.627h1.77v-.006c.36-.01.72-.145.995-.425a1.488 1.488 0 0 0 0-2.092" fill="#191919" fill-rule="evenodd"/></svg>';`

const { code } = transform(FIXTURE, {
  plugins: ['./index'],
});

if (code !== EXPECTED) throw new Error('Output doesnt match expected');

console.log('✅ Works as expected');
