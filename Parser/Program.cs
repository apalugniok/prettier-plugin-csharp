using System;
using System.Diagnostics;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser
{
    class Program
    {
        public static async Task Main(string[] args)
        {
            var text = Console.In.ReadToEnd();
            var tree = CSharpSyntaxTree.ParseText(text);

            await JsonSerializer.SerializeAsync(
                Console.OpenStandardOutput(),
                (CompilationUnitSyntax) await tree.GetRootAsync(),
                SerializerOptionsBuilder.Build()
            );
        }
    }
}