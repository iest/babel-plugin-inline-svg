const { transform } = require("babel-core");
const { EOL: UNSCAPEDEOL } = require("os");

// expected raw version of the .svg file will have escaped EOL,
// so we need to compare with an escaped version of os-based EOL.
const EOL = JSON.stringify(UNSCAPEDEOL).replace(/"/g, "");

const FIXTURE = `
import test from './test/fixtures/icons.svg';
`;

const expectedWithSVGOOptions =
  'var test = \'<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg width="58" height="58" xmlns="http://www.w3.org/2000/svg"><g id="test-icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="test-logo"><circle id="test-shadow" fill="#000" opacity=".07" cx="31" cy="32" r="24"/><circle id="test-circle" fill="#FFF" cx="29" cy="29" r="24"/><path d="M40.525 42.956c-4.82 4.158-11.59 5.478-17.665 3.439-6.078-2.04-10.577-7.136-11.75-13.306-.136-.724-.85-1.2-1.591-1.067-.743.133-1.234.827-1.096 1.55 1.35 7.112 6.541 12.99 13.547 15.34 1.6.539 3.24.872 4.888 1.012 5.566.473 11.191-1.275 15.482-4.975a1.307 1.307 0 00.116-1.878 1.393 1.393 0 00-1.93-.115" id="test-mouth" fill="#29AB02"/><path d="M17.338 30.34c1.186 0 2.147-.96 2.147-2.144a2.147 2.147 0 00-2.147-2.146 2.147 2.147 0 100 4.29z" id="test-left-eye" fill="#37AB2F"/><path d="M40.4 30.34c1.185 0 2.147-.96 2.147-2.144a2.147 2.147 0 00-2.148-2.146 2.147 2.147 0 100 4.29z" id="test-right-eye" fill="#37AB2F"/><path d="M30.22 29.94h-6.463c-.885 0-1.599-.739-1.599-1.643 0-.903.714-1.64 1.6-1.64l6.462.012-1.99-2.062a1.672 1.672 0 010-2.31 1.574 1.574 0 012.272 0l4.684 4.843a1.666 1.666 0 010 2.313l-4.683 4.845a1.568 1.568 0 01-1.137.485c-.426 0-.83-.168-1.136-.484a1.675 1.675 0 010-2.312l1.99-2.048z" id="test-arrow" fill="#37AB2F"/></g></g></svg>\';';

const expectedRaw = `var test = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>${EOL}<svg width="58px" height="58px" viewBox="0 0 58 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${EOL}    <!-- Generator: Sketch 40.2 (33826) - http://www.bohemiancoding.com/sketch -->${EOL}    <title>icons</title>${EOL}    <desc>Created with Sketch.</desc>${EOL}    <defs></defs>${EOL}    <g id="test-icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">${EOL}        <g id="test-logo">${EOL}            <circle id="test-shadow" fill="#000000" opacity="0.07" cx="31" cy="32" r="24"></circle>${EOL}            <circle id="test-circle" fill="#FFFFFF" cx="29" cy="29" r="24"></circle>${EOL}            <path d="M40.5253231,42.955661 C35.7046478,47.1136294 28.9351343,48.4336591 22.8597981,46.3947517 C16.7818908,44.3558443 12.2825939,39.2585759 11.1102057,33.0892529 C10.9739413,32.3653657 10.2591958,31.8894536 9.5187401,32.0222081 C8.77571337,32.1549625 8.28464725,32.8487921 8.4234827,33.5726794 C9.77327176,40.6838072 14.9641748,46.5625733 21.9702228,48.9120759 C23.5694015,49.450608 25.2097165,49.7837464 26.8577447,49.9240152 C32.4240177,50.3974225 38.0494243,48.6490719 42.340468,44.949482 C42.9035228,44.4610459 42.9575144,43.6219379 42.4561642,43.0708818 C41.9548139,42.5198258 41.0909489,42.467225 40.5253231,42.955661" id="test-mouth" fill="#29AB02"></path>${EOL}            <path d="M17.3376979,30.3407821 C18.5237867,30.3407821 19.4854517,29.3804032 19.4854517,28.1955307 C19.4854517,27.0106582 18.5237867,26.0502793 17.3376979,26.0502793 C16.1516091,26.0502793 15.1899441,27.0106582 15.1899441,28.1955307 C15.1899441,29.3804032 16.1516091,30.3407821 17.3376979,30.3407821 L17.3376979,30.3407821 Z" id="test-left-eye" fill="#37AB2F"></path>${EOL}            <path d="M40.3991504,30.3407821 C41.5852393,30.3407821 42.5469042,29.3804032 42.5469042,28.1955307 C42.5469042,27.0106582 41.5852393,26.0502793 40.3991504,26.0502793 C39.2130616,26.0502793 38.2513966,27.0106582 38.2513966,28.1955307 C38.2513966,29.3804032 39.2130616,30.3407821 40.3991504,30.3407821 L40.3991504,30.3407821 Z" id="test-right-eye" fill="#37AB2F"></path>${EOL}            <path d="M30.2199993,29.93933 L23.7573096,29.93933 C22.8718633,29.93933 22.1583799,29.2013753 22.1583799,28.2967542 C22.1583799,27.3942392 22.8723684,26.6567949 23.7573096,26.6567949 L30.2202638,26.6686205 L28.2306636,24.6069679 C27.6129756,23.9689877 27.6129756,22.9376215 28.2300324,22.2969737 C28.8531322,21.6500521 29.8738785,21.6510949 30.5019829,22.296475 L35.1857978,27.1401221 C35.4842922,27.4484225 35.651676,27.8652716 35.651676,28.2967542 C35.651676,28.7299808 35.4848888,29.1444696 35.1860132,29.4531636 L30.5030903,34.2984995 C30.2011727,34.613584 29.7920741,34.7831319 29.3662484,34.7831319 C28.9399328,34.7831319 28.5357511,34.614915 28.2300324,34.2991512 C27.6130807,33.6586127 27.6130807,32.6277326 28.2303888,31.9868246 L30.2199993,29.93933 Z" id="test-arrow" fill="#37AB2F"></path>${EOL}        </g>${EOL}    </g>${EOL}</svg>${EOL}';`;

const expectedWithoutNamesapce =
  'var test = \'<svg width="58" height="58" xmlns="http://www.w3.org/2000/svg"><g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="logo"><circle id="shadow" fill="#000" opacity=".07" cx="31" cy="32" r="24"/><circle id="circle" fill="#FFF" cx="29" cy="29" r="24"/><path d="M40.525 42.956c-4.82 4.158-11.59 5.478-17.665 3.439-6.078-2.04-10.577-7.136-11.75-13.306-.136-.724-.85-1.2-1.591-1.067-.743.133-1.234.827-1.096 1.55 1.35 7.112 6.541 12.99 13.547 15.34 1.6.539 3.24.872 4.888 1.012 5.566.473 11.191-1.275 15.482-4.975a1.307 1.307 0 00.116-1.878 1.393 1.393 0 00-1.93-.115" id="mouth" fill="#29AB02"/><path d="M17.338 30.34c1.186 0 2.147-.96 2.147-2.144a2.147 2.147 0 00-2.147-2.146 2.147 2.147 0 100 4.29z" id="left-eye" fill="#37AB2F"/><path d="M40.4 30.34c1.185 0 2.147-.96 2.147-2.144a2.147 2.147 0 00-2.148-2.146 2.147 2.147 0 100 4.29z" id="right-eye" fill="#37AB2F"/><path d="M30.22 29.94h-6.463c-.885 0-1.599-.739-1.599-1.643 0-.903.714-1.64 1.6-1.64l6.462.012-1.99-2.062a1.672 1.672 0 010-2.31 1.574 1.574 0 012.272 0l4.684 4.843a1.666 1.666 0 010 2.313l-4.683 4.845a1.568 1.568 0 01-1.137.485c-.426 0-.83-.168-1.136-.484a1.675 1.675 0 010-2.312l1.99-2.048z" id="arrow" fill="#37AB2F"/></g></g></svg>\';';

const expectedDataURI =
  "var test = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTgiIGhlaWdodD0iNTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgaWQ9InRlc3QtaWNvbnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGlkPSJ0ZXN0LWxvZ28iPjxjaXJjbGUgaWQ9InRlc3Qtc2hhZG93IiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMDciIGN4PSIzMSIgY3k9IjMyIiByPSIyNCIvPjxjaXJjbGUgaWQ9InRlc3QtY2lyY2xlIiBmaWxsPSIjRkZGIiBjeD0iMjkiIGN5PSIyOSIgcj0iMjQiLz48cGF0aCBkPSJNNDAuNTI1IDQyLjk1NmMtNC44MiA0LjE1OC0xMS41OSA1LjQ3OC0xNy42NjUgMy40MzktNi4wNzgtMi4wNC0xMC41NzctNy4xMzYtMTEuNzUtMTMuMzA2LS4xMzYtLjcyNC0uODUtMS4yLTEuNTkxLTEuMDY3LS43NDMuMTMzLTEuMjM0LjgyNy0xLjA5NiAxLjU1IDEuMzUgNy4xMTIgNi41NDEgMTIuOTkgMTMuNTQ3IDE1LjM0IDEuNi41MzkgMy4yNC44NzIgNC44ODggMS4wMTIgNS41NjYuNDczIDExLjE5MS0xLjI3NSAxNS40ODItNC45NzVhMS4zMDcgMS4zMDcgMCAwMC4xMTYtMS44NzggMS4zOTMgMS4zOTMgMCAwMC0xLjkzLS4xMTUiIGlkPSJ0ZXN0LW1vdXRoIiBmaWxsPSIjMjlBQjAyIi8+PHBhdGggZD0iTTE3LjMzOCAzMC4zNGMxLjE4NiAwIDIuMTQ3LS45NiAyLjE0Ny0yLjE0NGEyLjE0NyAyLjE0NyAwIDAwLTIuMTQ3LTIuMTQ2IDIuMTQ3IDIuMTQ3IDAgMTAwIDQuMjl6IiBpZD0idGVzdC1sZWZ0LWV5ZSIgZmlsbD0iIzM3QUIyRiIvPjxwYXRoIGQ9Ik00MC40IDMwLjM0YzEuMTg1IDAgMi4xNDctLjk2IDIuMTQ3LTIuMTQ0YTIuMTQ3IDIuMTQ3IDAgMDAtMi4xNDgtMi4xNDYgMi4xNDcgMi4xNDcgMCAxMDAgNC4yOXoiIGlkPSJ0ZXN0LXJpZ2h0LWV5ZSIgZmlsbD0iIzM3QUIyRiIvPjxwYXRoIGQ9Ik0zMC4yMiAyOS45NGgtNi40NjNjLS44ODUgMC0xLjU5OS0uNzM5LTEuNTk5LTEuNjQzIDAtLjkwMy43MTQtMS42NCAxLjYtMS42NGw2LjQ2Mi4wMTItMS45OS0yLjA2MmExLjY3MiAxLjY3MiAwIDAxMC0yLjMxIDEuNTc0IDEuNTc0IDAgMDEyLjI3MiAwbDQuNjg0IDQuODQzYTEuNjY2IDEuNjY2IDAgMDEwIDIuMzEzbC00LjY4MyA0Ljg0NWExLjU2OCAxLjU2OCAwIDAxLTEuMTM3LjQ4NWMtLjQyNiAwLS44My0uMTY4LTEuMTM2LS40ODRhMS42NzUgMS42NzUgMCAwMTAtMi4zMTJsMS45OS0yLjA0OHoiIGlkPSJ0ZXN0LWFycm93IiBmaWxsPSIjMzdBQjJGIi8+PC9nPjwvZz48L3N2Zz4=';";

describe("with options", () => {
  it('supports "ignorePattern" argument', () => {
    const { code } = transform(FIXTURE, {
      plugins: [["./lib/index.js", { ignorePattern: "fixtures" }]],
    });

    expect(code).toEqual(`
import test from './test/fixtures/icons.svg';`);
  });

  it("supports SVGO options", () => {
    const { code } = transform(FIXTURE, {
      plugins: [
        [
          "./lib/index.js",
          {
            svgo: {
              plugins: [{ cleanupIDs: false }, { removeXMLProcInst: false }],
            },
          },
        ],
      ],
    });

    expect(code).toBe(expectedWithSVGOOptions);
  });

  it("supports disabling SVGO", () => {
    const { code } = transform(FIXTURE, {
      plugins: [["./lib/index.js", { disableSVGO: true }]],
    });

    expect(code).toBe(expectedRaw);
  });

  it("supports disabling namespacing of IDs", () => {
    const { code } = transform(FIXTURE, {
      plugins: [["./lib/index.js", { disableNamespaceIds: true }]],
    });

    expect(code).toBe(expectedWithoutNamesapce);
  });

  it("supports output as a data URI", () => {
    const { code } = transform(FIXTURE, {
      plugins: [["./lib/index.js", { exportDataURI: true }]],
    });

    expect(code).toBe(expectedDataURI);
  });
});
