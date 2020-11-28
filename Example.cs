using System;
using System.Collections.Generic;
using System.Linq;
namespace PrettierCSharpPlugin
{
    public class Example
    {
        private class Point
        {
            public double X { get; set; }
            public double Y { get; set; }
        }
        public void Method()
        {
            var point = new Point { X = 1, Y = 4 };
            if (point is Point { Y: 3 })
            {
                Console.WriteLine("we're 3 high");
            }
            else
            {
                var a = point.X;
                Console.WriteLine($"we're at x {a}");
                var b = new List<int> { 1, 2, 3 };
                var c = from score in b
                    let baz = score
                    orderby baz
                    where baz > 3
                    select baz into c2
                    group c2 by c2;
            }
        }
        public static T CaseGuardExample<T>(IEnumerable<T> sequence) =>
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
