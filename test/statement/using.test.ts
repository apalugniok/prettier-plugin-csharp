import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Using Statement', () => {
  it('should format a using statement with a variable declaration', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          using (var reader = new StreamReader(stream)) {
            reader.ReadToEnd();
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              using (var reader = new StreamReader(stream))
              {
                  reader.ReadToEnd();
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should use new line when the declaration is too long', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          using (var reallyLongLongLongLongLongVariable = new StreamReader(stream)) {
            reader.ReadToEnd();
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              using (
                  var reallyLongLongLongLongLongVariable = new StreamReader(stream)
              )
              {
                  reader.ReadToEnd();
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an await using statement with a variable declaration', () => {
    const input = code`
      class Irrelevant {
        async Task Irrelevant()
        {
          await using (var reader = new StreamReader(stream)) {
            reader.ReadToEnd();
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          async Task Irrelevant()
          {
              await using (var reader = new StreamReader(stream))
              {
                  reader.ReadToEnd();
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a single statement using statement in a block', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          using (var reader = new StreamReader(stream)) 
            reader.ReadToEnd();
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              using (var reader = new StreamReader(stream))
              {
                  reader.ReadToEnd();
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a using statement with an expression', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant()
        {
          var reader = new StringReader(manyLines);
          using (reader) {
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              var reader = new StringReader(manyLines);
              using (reader)
              { }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format attributes', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
        [Foo, Bar]
              [Baz]
          using (var reader = new StreamReader(stream))
          {reader.ReadToEnd();
          }
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              [Foo, Bar]
              [Baz]
              using (var reader = new StreamReader(stream))
              {
                  reader.ReadToEnd();
              }
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
