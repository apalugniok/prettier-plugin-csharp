import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Global Statement', () => {
  it('should format a top level declaration', () => {
    const input = code`
      using Foo;
      
      var text = "test";
      text.Trim();
    `;
    const expectedFormattedCode = code`
      using Foo;
      
      var text = "test";
      text.Trim();
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
