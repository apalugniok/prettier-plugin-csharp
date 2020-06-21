using global::System;
using AliasToMyClass = NameSpace1.Foo.MyClass;
using UsingAlias;
namespace NameSpace1.Foo
{
    public static class MyClass
    {
        public static int Baz { get; set; } = 1;
    }
}
namespace NameSpace2
{
    class MyClass<T, U>
        where T : class, new(), int
        where U : class?, new(), NameSpace3.MainClass
    {
        public static int Baz { get {} set => 3; } = 1;
        private string Bar => "foo";
        int reallyReallyLongFieldNameToCauseALineBreakToHappen;
        int Foo
        {
            get => reallyReallyLongFieldNameToCauseALineBreakToHappen;
            set {}
        }
    }
    enum Foo
    {
        A = 1,
        B = 2,
        C
    }
}
namespace NameSpace3
{
    class MainClass
    {
    }
}
