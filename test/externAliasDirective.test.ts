const { code, formatCSharpWithPrettier } = require('./helpers/testHelpers');

describe('Extern Alias Directive', () => {
  it('simple', () => {
    const input = code`
      extern
       alias   Foo   
          ;
    `;
    const expectedFormattedCode = code`
      extern alias Foo;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })

  it('multiple', () => {
    const input = code`
      extern
       alias   Foo   
          ;
         extern alias Bar;
    `;
    const expectedFormattedCode = code`
      extern alias Foo;
      extern alias Bar;
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })
})