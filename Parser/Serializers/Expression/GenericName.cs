using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class GenericNameSerializer : SyntaxNodeSerializer<GenericNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, GenericNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.Text);
            writer.WriteSerializedValue("typeArguments", value.TypeArgumentList, options);
        }
    }
}