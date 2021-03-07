<p align="center">
    :construction: Work in Progress! :construction:
</p>

<div align="center">
<img alt="Prettier" height="210"
  src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">
</div>

<h2 align="center">Prettier C# Plugin</h2>

## What does it do?

**:warning: Warning :warning:** This plugin is still in development and in certain cases it may emit
formatted code that does not compile or not format code in a sensible way. It is **not** ready to be used
as part of a prettier pre-commit hook.

Before trying formatting with this plugin please commit your changes.

Prettier C# Plugin is a [Prettier plugin](https://prettier.io/docs/en/plugins.html)
that uses the [Rosyln](https://github.com/dotnet/roslyn) API to provide
Prettier with a syntax tree it can transform and print in a standardized way.

## Prerequisites

In order to run the plugin you need the following:

1. [.NET 5 Runtime or SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
2. [Prettier](https://prettier.io/)

## Install

###npm

```bash
npm install --save-dev prettier-csharp-plugin
```

### yarn

```bash
yarn add --dev prettier-csharp-plugin
```

## Use

```bash
prettier --write "**/*.cs"
```

## Maintainers

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/sirlantis">
          <img width="150" height="150" src="https://github.com/apalugniok.png?v=3&s=150">
          </br>
          Andrew Palugniok
        </a>
      </td>
    </tr>
  <tbody>
</table>
