using System;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace PrettierCSharpPlugin.Parser
{
    public static class SerializerOptionsBuilder {
        public static  JsonSerializerOptions Build()
        {
            var options = new JsonSerializerOptions();

            foreach (var type in Assembly.GetExecutingAssembly().GetTypes())
            {
                if (!typeof(JsonConverter).IsAssignableFrom(type))
                {
                    continue;
                }

                var serializer = (JsonConverter) type
                    .GetConstructor(new Type[] { })
                    ?.Invoke(new object[] { });

                if (serializer != null)
                {
                    options.Converters.Add(serializer);
                }
            }

            return options;
        }
    }
}