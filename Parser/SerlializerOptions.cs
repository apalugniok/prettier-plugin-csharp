using System.Text.Json;
using PrettierCSharpPlugin.Parser.Serializers;

namespace PrettierCSharpPlugin.Parser
{
    public static class SerializerOptionsBuilder {
        public static  JsonSerializerOptions Build()
        {
            var options = new JsonSerializerOptions();

            options.Converters.Add(new SyntaxNodeSerializer());
            options.Converters.Add(new SyntaxTokenSerializer());
            options.Converters.Add(new SyntaxTriviaSerializer());

            return options;
        }
    }
}