using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class ArrowExpressionClauseSerializer: SyntaxNodeSerializer<ArrowExpressionClauseSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, ArrowExpressionClauseSyntax value, JsonSerializerOptions options)
        {
            writer.WriteSerializedValue("expression", value.Expression, options);
        }
    }
}