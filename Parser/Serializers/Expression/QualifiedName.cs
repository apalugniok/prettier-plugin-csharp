using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class QualifiedNameSerializer : SyntaxNodeSerializer<QualifiedNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, QualifiedNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("left", value.Left, options);
            writer.WriteSerializedValue("right", value.Right, options);
        }
    }
}