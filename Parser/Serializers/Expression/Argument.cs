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

    public class ArgumentListSerializer : SyntaxNodeSerializer<ArgumentListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ArgumentListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("arguments", value.Arguments, options);
        }
    }

    public class BracketedArgumentListSerializer : SyntaxNodeSerializer<BracketedArgumentListSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, BracketedArgumentListSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("arguments", value.Arguments, options);
        }
    }

    public class ArgumentSerializer : SyntaxNodeSerializer<ArgumentSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ArgumentSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValueOrNull("nameColon", value.NameColon, options);
            writer.WriteSerializedValue("expression", value.Expression, options);
            writer.WriteString("referenceKind", value.RefKindKeyword.ValueText);
        }
    }
    
    public class NameColonSerializer: SyntaxNodeSerializer<NameColonSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, NameColonSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("name", value.Name.Identifier.ValueText);
        }
    }
}