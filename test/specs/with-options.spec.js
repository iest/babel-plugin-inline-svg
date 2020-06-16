const { transform } = require('babel-core');

const FIXTURE = `
  import test from './test/fixtures/icons.svg';
`;

const expected = 'var test = \'<svg width="58" height="58" xmlns="http://www.w3.org/2000/svg"><g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="logo"><circle id="shadow" fill="#000" opacity=".07" cx="31" cy="32" r="24"/><circle id="circle" fill="#FFF" cx="29" cy="29" r="24"/><path d="M40.525 42.956c-4.82 4.158-11.59 5.478-17.665 3.439-6.078-2.04-10.577-7.136-11.75-13.306-.136-.724-.85-1.2-1.591-1.067-.743.133-1.234.827-1.096 1.55 1.35 7.112 6.541 12.99 13.547 15.34 1.6.539 3.24.872 4.888 1.012 5.566.473 11.191-1.275 15.482-4.975a1.307 1.307 0 00.116-1.878 1.393 1.393 0 00-1.93-.115" id="mouth" fill="#29AB02"/><path d="M17.338 30.34c1.186 0 2.147-.96 2.147-2.144a2.147 2.147 0 00-2.147-2.146 2.147 2.147 0 100 4.29z" id="left-eye" fill="#37AB2F"/><path d="M40.4 30.34c1.185 0 2.147-.96 2.147-2.144a2.147 2.147 0 00-2.148-2.146 2.147 2.147 0 100 4.29z" id="right-eye" fill="#37AB2F"/><path d="M30.22 29.94h-6.463c-.885 0-1.599-.739-1.599-1.643 0-.903.714-1.64 1.6-1.64l6.462.012-1.99-2.062a1.672 1.672 0 010-2.31 1.574 1.574 0 012.272 0l4.684 4.843a1.666 1.666 0 010 2.313l-4.683 4.845a1.568 1.568 0 01-1.137.485c-.426 0-.83-.168-1.136-.484a1.675 1.675 0 010-2.312l1.99-2.048z" id="arrow" fill="#37AB2F"/></g></g></svg>\';';

describe('with options', () => {
  it('should support SVGO options', () => {
    const { code } = transform(FIXTURE, {
      plugins: [[ './lib/index.js', { svgo: { plugins: [{ cleanupIDs: false }] } }]]
    });

    expect(code).toBe(expected);
  });
});
