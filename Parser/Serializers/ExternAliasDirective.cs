using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers
{
    public class ExternAliasDirectiveSerializer: SyntaxNodeSerializer<ExternAliasDirectiveSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ExternAliasDirectiveSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.ValueText);
        }
    }
}