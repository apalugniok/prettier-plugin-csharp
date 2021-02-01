import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Interpolated String', () => {
  it('should format an interpolated string', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = $"Some text";
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $"Some text";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an interpolated string with interpolations', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = $"Some text {foo}";
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $"Some text {foo}";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an interpolated string with an interpolation alignment', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = $"Some text {foo,1}";
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $"Some text {foo, 1}";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an interpolated string with an interpolation format', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = $"Some text {foo:HH:mm:ss}";
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $"Some text {foo:HH:mm:ss}";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an interpolated string with an interpolation alignment and format', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = $"Some text {foo,1:HH:mm:ss}";
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $"Some text {foo, 1:HH:mm:ss}";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an interpolated verbatim string', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = @$"Some text 
          more text
          and more";
        }
      }
    `;

    // In the input code the string new lines are indented by 4 spaces from the level of indentation for the class
    // which must be preserved when formatting the verbatim string
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $@"Some text 
          more text
          and more";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format an interpolated verbatim string with interpolations ', () => {
    const input = code`
      class Irrelevant {
        void Irrelevant() {
          Irrelevant = @$"Some text 
          more text {foo}
          {bar}and more";
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void Irrelevant()
          {
              Irrelevant = $@"Some text 
          more text {foo}
          {bar}and more";
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
