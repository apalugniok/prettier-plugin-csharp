using Nuke.Common;
using Nuke.Common.CI;
using Nuke.Common.Execution;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using static Nuke.Common.Tools.DotNet.DotNetTasks;

[CheckBuildProjectConfigurations]
[ShutdownDotNetAfterServerBuild]
class Build : NukeBuild
{
    public static int Main () => Execute<Build>(x => x.Pack);

    readonly Configuration Configuration = Configuration.Release;

    [Solution] readonly Solution Solution;

    AbsolutePath PluginDirectory => RootDirectory / "Plugin";
    AbsolutePath BuildOutputDirectory => RootDirectory / "build-output";
    string PluginPackageName => "prettier-csharp-plugin";

    Target Clean => _ => _
        .Executes(() =>
        {
            DotNetClean(s => s
                .SetConfiguration(Configuration)
                .SetProject(Solution));
        });

    Target Restore => _ => _
        .After(Clean)
        .Executes(() =>
        {
            DotNetRestore(s => s
                .SetProjectFile(Solution));
        });

    Target PublishParser => _ => _
        .After(Restore)
        .DependsOn(Restore, Clean)
        .Executes(() =>
        {
            DotNetPublish(s => s
                .SetConfiguration(Configuration)
                .SetOutput(PluginDirectory / "dist-parser")
                .EnableNoRestore());
        });

    Target RestorePlugin => _ => _
        .Executes(() =>
        {
            ProcessTasks.StartProcess("yarn", "install", PluginDirectory).AssertZeroExitCode();
        });

    Target BuildPlugin => _ => _
        .DependsOn(RestorePlugin)
        .Executes(() =>
        {
            ProcessTasks.StartProcess("yarn", "build", PluginDirectory).AssertZeroExitCode();
        });

    Target TestPlugin => _ => _
        .DependsOn(PublishParser, BuildPlugin)
        .Executes(() =>
        {
            ProcessTasks.StartProcess("yarn", "test", PluginDirectory).AssertZeroExitCode();
        });

    Target Pack => _ => _
        .DependsOn(TestPlugin)
        .Executes(() =>
        {
            ProcessTasks.StartProcess("yarn", $"pack --filename {PluginPackageName}.tgz", PluginDirectory).AssertZeroExitCode();
            FileSystemTasks.CopyFileToDirectory(PluginDirectory / $"{PluginPackageName}.tgz", BuildOutputDirectory);
        });

}
