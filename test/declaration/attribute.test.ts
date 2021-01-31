import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Attribute List', () => {
  it('should format a single attribute list', () => {
    const input = code`
      [Bar]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format multiple attributes within an attribute list', () => {
    const input = code`
      [Foo, 
        Bar]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Foo, Bar]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an attribute with single argument', () => {
    const input = code`
      [Bar(bar)]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar(bar)]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an attribute with an optional argument', () => {
    const input = code`
      [Bar(foo =
       bar)]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar(foo = bar)]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an attribute with a named argument', () => {
    const input = code`
      [Bar(foo :
       bar)]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar(foo: bar)]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an attribute with multiple arguments', () => {
    const input = code`
      [Bar(bar, foo)]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar(bar, foo)]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes with multiple long arguments with line breaks', () => {
    const input = code`
      [Bar(oneReallyLongArgumentToCauseLineBreak, anotherReallyLongArgumentToCauseLineBreak)]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar(
          oneReallyLongArgumentToCauseLineBreak,
          anotherReallyLongArgumentToCauseLineBreak
      )]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format multiple attribute lists', () => {
    const input = code`
      [Foo] [Bar]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Foo]
      [Bar]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an attribute lists with a target specifier', () => {
    const input = code`
      [type :   Foo]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [type: Foo]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes with multiple syntax features', () => {
    const input = code`
      [Bar(foo: oneReallyLongArgumentToCauseLineBreak, bar = anotherReallyLongArgumentToCauseLineBreak)] [Foo]
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar(
          foo: oneReallyLongArgumentToCauseLineBreak,
          bar = anotherReallyLongArgumentToCauseLineBreak
      )]
      [Foo]
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes with comments', () => {
    const input = code`
      ///DOCS
      [Bar/*foo*/]//barbar
      class Irrelevant {}
    `;
    const expectedFormattedCode = code`
      [Bar /* foo */ ] // barbar
      class Irrelevant
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
