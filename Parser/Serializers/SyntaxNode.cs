using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.CodeAnalysis;

namespace PrettierCSharpPlugin.Parser.Serializers
{
    public abstract class SyntaxNodeSerializer<T> : JsonConverter<T> where T: SyntaxNode
    {
        public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public sealed override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();
            
            writer.WriteString("type", typeof(T).Name.Replace("Syntax", ""));
            
            writer.WriteNumber("start", value.Span.Start);
            writer.WriteNumber("end", value.Span.End);
            
            WriteObjectProperties(writer, value, options);
            
            writer.WriteEndObject();
        }

        protected abstract void WriteObjectProperties(Utf8JsonWriter writer, T value, JsonSerializerOptions options);
    }
}