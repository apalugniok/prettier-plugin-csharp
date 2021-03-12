using System;
using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Plugin.Parser;

var text = await Console.In.ReadToEndAsync();
var tree = CSharpSyntaxTree.ParseText(text);

await JsonSerializer.SerializeAsync(
    Console.OpenStandardOutput(),
    (CompilationUnitSyntax) await tree.GetRootAsync(),
    SerializerOptionsBuilder.Build()
);