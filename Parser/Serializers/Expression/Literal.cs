using System.Text.Json;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PrettierCSharpPlugin.Parser.Serializers.Expression
{
    public class LiteralExpressionSerializer: SyntaxNodeSerializer<LiteralExpressionSyntax>
    {
        protected override void WriteObjectProperties(Utf8JsonWriter writer, LiteralExpressionSyntax value, JsonSerializerOptions options)
        {
            writer.WriteString("value", value.Token.ToString());
        }
    }
}