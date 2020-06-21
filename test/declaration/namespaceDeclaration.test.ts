const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Namespace Declaration', () => {
  it('should format an empty declaration', () => {
    const input = code`
      namespace Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      namespace Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })

  it('should format a declaration with a using directive', () => {
    const input = code`
      namespace Foo {
        using System;
      }
    `;
    const expectedFormattedCode = code`
      namespace Foo
      {
          using System;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })

  it('should format a declaration with an extern alias directive', () => {
    const input = code`
      namespace Foo {
        extern 
        alias Bar;
      }
    `;
    const expectedFormattedCode = code`
      namespace Foo
      {
          extern alias Bar;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  })
})