import { code, formatCSharpWithPrettier } from '../helpers/testHelpers';

describe('Switch Expression', () => {
  it('should format a switch expression', () => {
    const input = code`
      class Irrelevant {
        void IrrelevantMethod() {
          statement switch {
            1 => "One",
          };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void IrrelevantMethod()
          {
              statement switch
              {
                  1 => "One",
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a switch expression with no arms', () => {
    const input = code`
      class Irrelevant {
        void IrrelevantMethod() {
          statement switch {
           
          };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void IrrelevantMethod()
          {
              statement switch {};
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a switch expression with multiple arms', () => {
    const input = code`
      class Irrelevant {
        void IrrelevantMethod() {
          statement switch {
             1 => "One",
             2 => "Two",
          };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void IrrelevantMethod()
          {
              statement switch
              {
                  1 => "One",
                  2 => "Two",
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a switch expression with multiple arms', () => {
    const input = code`
      class Irrelevant {
        void IrrelevantMethod() {
          statement switch {
             1 => "One",
             2 => "Two",
          };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void IrrelevantMethod()
          {
              statement switch
              {
                  1 => "One",
                  2 => "Two",
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a switch expression with an arm with a when clause', () => {
    const input = code`
      class Irrelevant {
        void IrrelevantMethod() {
          list switch {
             var list when list.Count() < 3 => list.Last(),
          };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void IrrelevantMethod()
          {
              list switch
              {
                  var list when list.Count() < 3 => list.Last(),
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });

  it('should format a complicated switch expression', () => {
    const input = code`
      class Irrelevant {
        void IrrelevantMethod() {
          sequence switch
            {
              System.Array { Length: 0 } => default(T),
              System.Array { Length: 1 } array => (T) array.GetValue(0),
              System.Array { Length: 2 } array => (T) array.GetValue(1),
              System.Array array => (T) array.GetValue(2),
              var list when !list.Any() => default(T),
              var list when list.Count() < 3 => list.Last(),
              IList<T> list => list[2],
              var seq => seq.Skip(2).First()
            };
        }
      }
    `;
    const expectedFormattedCode = code`
      class Irrelevant
      {
          void IrrelevantMethod()
          {
              sequence switch
              {
                  System.Array { Length: 0 } => default(T),
                  System.Array { Length: 1 } array => (T) array.GetValue(0),
                  System.Array { Length: 2 } array => (T) array.GetValue(1),
                  System.Array array => (T) array.GetValue(2),
                  var list when !list.Any() => default(T),
                  var list when list.Count() < 3 => list.Last(),
                  IList<T> list => list[2],
                  var seq => seq.Skip(2).First(),
              };
          }
      }
    `;

    const actualFormattedCode = formatCSharpWithPrettier(input);

    expect(actualFormattedCode).toEqual(expectedFormattedCode);
  });
});
