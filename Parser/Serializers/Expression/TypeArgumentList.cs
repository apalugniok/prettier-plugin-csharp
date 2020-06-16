using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class TypeArgumentListSerializer : SyntaxNodeSerializer<TypeArgumentListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, TypeArgumentListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("arguments", value.Arguments, options);
        }
    }
}