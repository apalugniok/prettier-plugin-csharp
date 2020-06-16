using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Attribute
{
    public class AttributeArgumentListSerializer: SyntaxNodeSerializer<AttributeArgumentListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AttributeArgumentListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("arguments", value.Arguments, options);
        }
    }
}