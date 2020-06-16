using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class AliasQualifiedNameSerializer : SyntaxNodeSerializer<AliasQualifiedNameSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, AliasQualifiedNameSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("alias", value.Alias, options);
            writer.WriteSerializedValue("name", value.Name, options);
        }
    }
}