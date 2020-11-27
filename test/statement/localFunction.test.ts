const { code, formatCSharpWithPrettier } = require('../helpers/testHelpers');

describe('Local Function Statement', () => {
  it('should format a block local function', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          int Foo(){  }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int Foo()
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic local function', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
        
           int Foo<T>() {}
           }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int Foo<T>()
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a generic local function with type constraints', () => {
    const input = code`
      class Irrelevant {
      void Irrelevant() {
        
           int Foo<TValue, TArgument>() where TValue: class, new() where TArgument:class,new() {}
           }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              int Foo<TValue, TArgument>()
                  where TValue : class, new()
                  where TArgument : class, new()
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a local function with long arguments using new lines', () => {
    const input = code`
      class Irrelevant {
      void Irrelevant() {
        void Foo(int reallyReallyArgumentNameToCauseALineBreakToHappen, 
        string otherReallyReallyArgumentNameToCauseALineBreakToHappen ) {}
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              void Foo(
                  int reallyReallyArgumentNameToCauseALineBreakToHappen,
                  string otherReallyReallyArgumentNameToCauseALineBreakToHappen
              )
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a local function with statements in the body', () => {
    const input = code`
      class Foo {
      void Irrelevant(){
          void Method(Foo foo) {
           var a = 1;
           var b = "foo";
         }
      }
    `;

    const expectedFormattedCode = code`
      class Foo
      {
          void Irrelevant()
          {
              void Method(Foo foo)
              {
                  var a = 1;
                  var b = "foo";
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a local function with a long expression body with a new line', () => {
    const input = code`
      class Foo {
         static void Method(Foo foo) => reallyReallyLongReturnVariableToCauseTheLineLimitToBeExceeded;
      }
    `;

    const expectedFormattedCode = code`
      class Foo
      {
          static void Method(Foo foo) =>
              reallyReallyLongReturnVariableToCauseTheLineLimitToBeExceeded;
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
