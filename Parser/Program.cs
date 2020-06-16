using System;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser
{
    class Program
    {
        public static void Main(string[] args)
        {
            var text = Console.In.ReadToEnd();
            var tree = CSharpSyntaxTree.ParseText(text);
            Console.Out.Write(
                JsonSerializer.Serialize(
                    (CompilationUnitSyntax)tree.GetRoot(),
                    SerializerOptionsBuilder.Build()
            ));
        }
    }
}