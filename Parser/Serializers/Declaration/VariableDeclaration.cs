using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Declaration
{
    public class VariableDeclarationSerializer: SyntaxNodeSerializer<VariableDeclarationSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, VariableDeclarationSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("variables", value.Variables, options);
            writer.WriteSerializedValue("variableType", value.Type, options);
        }
    }

    public class VariableDeclaratorSerializer: SyntaxNodeSerializer<VariableDeclaratorSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, VariableDeclaratorSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Identifier.ValueText);
            writer.WriteSerializedValueOrNull("initializer", value.Initializer, options);
            writer.WriteSerializedValueOrNull("arguments", value.ArgumentList, options);
        }
    }

    public class EqualsValueClauseSerializer : SyntaxNodeSerializer<EqualsValueClauseSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, EqualsValueClauseSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("value", value.Value, options);
        }
    }
}