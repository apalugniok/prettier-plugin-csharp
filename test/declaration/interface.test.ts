import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Interface Declaration', () => {
  it('should format an empty declaration', () => {
    const input = code`
      interface Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with modifiers', () => {
    const input = code`
      public 
        interface Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      public interface Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic declaration', () => {
    const input = code`
      interface Foo<T, U> {
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo<T, U>
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format variance keywords in a generic declaration', () => {
    const input = code`
      interface Foo< in T,
       out U> {
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo<in T, out U>
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a type constraint', () => {
    const input = code`
      interface Foo<T> where 
        T : Bar{
      
      }
    `;
    const expectedFormattedCode = code`
     interface Foo<T> where T : Bar
     {
     }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a type constraint with multiple constraints', () => {
    const input = code`
      interface Foo<T> where 
        T : Bar, class?,
         new(){
      
      }
    `;
    const expectedFormattedCode = code`
     interface Foo<T> where T : Bar, class?, new()
     {
     }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format multiple long type constraints with multiple constraints per type with line breaks', () => {
    const input = code`
      interface Foo<TypeOne, TypeTwo> where 
        TypeOne : Bar, class?,
         new() where TypeTwo :  struct,
         new(){
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo<TypeOne, TypeTwo>
          where TypeOne : Bar, class?, new()
          where TypeTwo : struct, new()
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a base type', () => {
    const input = code`
      interface Foo: 
      Base {
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo : Base
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with multiple base types', () => {
    const input = code`
      interface Foo: 
      BaseOne, 
        BaseTwo {
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo : BaseOne, BaseTwo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with multiple long base types with line breaks', () => {
    const input = code`
      interface Foo: 
      ReallyLongBaseTypeOneToCauseLineBreak, 
        ReallyLongBaseTypeTwoToCauseLineBreak {
      
      }
    `;
    const expectedFormattedCode = code`
      interface Foo :
          ReallyLongBaseTypeOneToCauseLineBreak,
          ReallyLongBaseTypeTwoToCauseLineBreak
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with an attribute', () => {
    const input = code`
      [Bar]
      interface Foo {
      
      }
    `;
    const expectedFormattedCode = code`
      [Bar]
      interface Foo
      {
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a single member', () => {
    const input = code`
      interface Foo {
        int    bar;
      }
    `;
    const expectedFormattedCode = code`
      interface Foo
      {
          int bar;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a declaration with a multiple members', () => {
    const input = code`
      interface Foo {
        int    bar;
        public int Bar {get;}
      }
    `;
    const expectedFormattedCode = code`
      interface Foo
      {
          int bar;
          public int Bar { get; }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
