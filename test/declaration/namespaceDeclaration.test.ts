const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Namespace Declaration', () => {
  it('simple', () => {
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

  it('with using', () => {
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
})