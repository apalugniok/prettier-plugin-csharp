using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers
{
    public class CompilationUnitSerializer : SyntaxNodeSerializer<CompilationUnitSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, CompilationUnitSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("externs", value.Externs, options);
            writer.WriteSerializedValue("usings", value.Usings, options);
            writer.WriteSerializedValue("members", value.Members, options);
        }
    }
}