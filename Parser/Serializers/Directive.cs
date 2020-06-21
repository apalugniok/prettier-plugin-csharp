using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers
{
    public class UsingDirectiveSerializer : SyntaxNodeSerializer<UsingDirectiveSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, UsingDirectiveSyntax value, JsonSerializerOptions options)
        {
            writer.WriteBoolean("static", value.StaticKeyword.Value != null);
            writer.WriteSerializedValueOrNull("alias", value.Alias, options);
            writer.WriteSerializedValue("name", value.Name, options);
        }
    }
    
    public class ExternAliasDirectiveSerializer: SyntaxNodeSerializer<ExternAliasDirectiveSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ExternAliasDirectiveSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.ValueText);
        }
    }
}