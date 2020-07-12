using System;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using PrettierCSharpPlugin.Parser.Utils;

namespace PrettierCSharpPlugin.Parser.Serializers
{
    public class SyntaxNodeSerializer : JsonConverter<SyntaxNode>
    {
        public override bool CanConvert(Type typeToConvert)
        {
            return typeof(SyntaxNode).IsAssignableFrom(typeToConvert);
        }

        public override SyntaxNode Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public sealed override void Write(Utf8JsonWriter writer, SyntaxNode value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            var type = value.GetType();

            writer.WriteString("nodeType", type.Name.Replace("Syntax", ""));
            writer.WriteNumber("start", value.Span.Start);
            writer.WriteNumber("end", value.Span.End);

            var typeDeclaredProperties = type.GetProperties().Where(p => p.DeclaringType == type);

            foreach (var property in typeDeclaredProperties)
            {
                writer.WriteSerializedValueOrNull(property.Name.ToCamelCase(), property.GetValue(value), options);
            }

            writer.WriteEndObject();
        }
    }
}