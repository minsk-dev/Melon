﻿using Jint;
using Jint.Native;
using Melon.Engine.Builders;
using System;
using Xunit;

namespace Melon.Tests.Melon.std
{
    public class EnvironmentTests
    {
        private readonly Jint.Engine _engine;

        public EnvironmentTests()
        {
            var builder = new EngineBuilder();
            builder.Load("Bundle/core");
            _engine = builder.Build();
        }

        [Fact(DisplayName = "Melon.std.environment.baseDirectory should have the correct value")]
        public void EnvironmentBaseDirectoryShouldHaveTheCorrectValue()
        {
            var script = @"Melon.std.environment.baseDirectory";
            var result = _engine.Evaluate(script).AsString();

            Assert.Equal(Environment.CurrentDirectory, result);
        }

        [Fact(DisplayName = "Melon.std.environment.setEnvironmentVariable should work correctly")]
        public void EnvironmentSetEnvironmentVariableShouldWorkCorrectly()
        {
            var script =
                @"
                Melon.std.environment.setEnvironmentVariable('test', 123);
                Melon.std.environment.getEnvironmentVariables()['test'];
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(123, result);
        }

        [Fact(DisplayName = "Melon.std.environment.getEnvironmentVariables should work correctly")]
        public void EnvironmentGetEnvironmentVariablesShouldWorkCorrectly()
        {
            var script =
                @"
                Melon.std.environment.setEnvironmentVariable('test', 123);
                Melon.std.environment.getEnvironmentVariables()['test'];
            ";
            var result = _engine.Evaluate(script).AsNumber();

            Assert.Equal(123, result);
        }

        [Fact(
            DisplayName = "Melon.std.environment.clearLocalEnvironmentVariables should work correctly"
        )]
        public void EnvironmentClearLocalEnvironmentVariablesShouldWorkCorrectly()
        {
            var script =
                @"
                Melon.std.environment.setEnvironmentVariable('test', 123);
                Melon.std.environment.clearLocalEnvironmentVariables();
                Melon.std.environment.getEnvironmentVariables()['test'];
            ";
            var result = _engine.Evaluate(script);

            Assert.Equal(JsValue.Undefined, result);
        }
    }
}
