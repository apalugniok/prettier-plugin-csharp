const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Field Declaration', () => {
  it('should format a single field', () => {
    const {
      code,
      formatCSharpWithPrettier,
    } = require('../helpers/testHelpers');
  });

  it('should format a field with modifiers', () => {
    const input = code`
      class Irrelevant {
        public static int foo;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          public static int foo;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a field with multiple declarations', () => {
    const input = code`
      class Irrelevant {
        int foo   , 
        bar;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          int foo, bar;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a field with an initializer', () => {
    const input = code`
      class Irrelevant {
        string foo   = "test"  ;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          string foo = "test";
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a field with an attribute list', () => {
    const input = code`
      class Irrelevant {
      [Bar]
        int foo;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          [Bar]
          int foo;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a field with multiple attribute lists', () => {
    const input = code`
      class Irrelevant {
      [Bar1]
            [Bar2]
        int foo;
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          [Bar1]
          [Bar2]
          int foo;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format fixed buffer fields', () => {
    const input = code`
      struct Irrelevant
      {
        public 
        unsafe   fixed int   Foo[1];
      }
    `;
    const expectedFormattedCode = code`
      struct Irrelevant
      {
          public unsafe fixed int Foo[1];
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
