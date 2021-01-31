using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;

namespace PrettierCSharpPlugin.Parser.Serializers
{
    public class SyntaxTriviaSerializer : JsonConverter<SyntaxTrivia>
    {
        public override SyntaxTrivia Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        public override void Write(Utf8JsonWriter writer, SyntaxTrivia value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            writer.WriteString("triviaType", Enum.GetName(typeof(SyntaxKind), value.Kind())!.Replace("Trivia", ""));
            writer.WriteNumber("start", value.FullSpan.Start);
            writer.WriteNumber("end", value.FullSpan.End);
            writer.WriteString("text", value.ToFullString());

            writer.WriteEndObject();
        }
    }
}