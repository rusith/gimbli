# Gimbli 

It is a command-line utility that can generate multiple files using a single template file.

[![codecov](https://codecov.io/gh/rusith/gimbli/branch/master/graph/badge.svg)](https://codecov.io/gh/rusith/gimbli)
![](https://github.com/rusith/gimbli/workflows/Test/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/50acc66394c747e7b4cd642fb731cf5a)](https://www.codacy.com/manual/rusith/gimbli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rusith/gimbli&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/gimbli?color=red&label=NPM)](https://www.npmjs.com/package/gimbli)

## Installation

#### You will need NodeJS installed to run Gimbli.

you can install Gimbly by running 

```
npm i -g gimbli
```

This will register the command `gimbli` globally.

Or you can use NPX to run Gimbli (`npx gimbli`)

## Reporting Issues

This tools is still young and needs feedback to improve. if you find anything wrong, just add an issue in [Github](https://github.com/rusith/gimbli/issues)


## Why This?

When writing software, sometimes we have to repeat the task of creating the same set of files again and again. this is especially apparent when working with front-end frameworks like React, Angular, Vue and so on. This repetitive task is certainly a pain and is time-consuming. If we could take the repeated boilerplate code and create a command that will do the file generation for us, that will save many minutes of the developer's time. this is what this tool tries to achieve.

## How Gimbli Solves the Problem?

Gimbli allows the user to create templates that can contain content for multiple files in them. and the developer can run the template using one command. Gimbli supports Handlebars inside the template so the developer can create dynamic content easily.

## An Example

If we take a react app as an example, we most of the time create 3 files for one component. which are `Component.jsx`, `Component.module.css`, `index.js`.

Instead of creating these three files manually, we can use Gimbli.

for that, we have to create a `templates` folder inside the project folder. and put a file named `component.gimbli`. the name will be the name of the command but the `.gimbli`  extension is required.

The template can be something like below.

```
@#args
props
initialContent
#@


@#file($path/$name.jsx)
import React from "react"
import styles from "./$name.module.css";

const $name = ({{props}}) => {
  return (
    <>{{initialContent}}</>
  );
};

export default $name;
#@

@#file($path/index.js)
import $name from "./$name";
export default $name;
#@


@#file($path/$name.module.css)
.root {

}
#@
```

What are all these?
`@#args` declare the arguments that can be used in this template. args can be passed through the command. and you can use these values inside the files. or even inside file paths.

`@#file` declares a file. in this template, there are three files. and inside the parentheses of the declaration, you can provide where the individual file should go.

each section must end with `#@`.

So now the template is ready, we can run Gimbli to execute the template. 

The command should look like below.

```sh
gimbli component myapp/components/button/Button -props "text, onClick" -initialContent "Button"
```
Running this will generate the three files (`Button.jsx`, `Button.module.css` and `index.js`) inside `myapp/components/button` folder.


## Template Syntax

A template file (.gimbli) file can have two types of sections. `args` and `file`.

### Args

The `args` section lists the arguments used in the template. each argument should be in a new line.

example:

```
@#args
name
isAbstract
#@
```

### Files

A file section declares the content of a file and its location.

example:

```
@#file($path/$name.ts)
content
#@
```

Inside the parenthesis, you provide the path (relative to the current directory) that the file will be created. You can use `$path` and `$name` placeholders inside the parenthesis. and you can use arguments inside the parenthesis. eg: `$path/{{className}}.cs`

Within the section, you can provide the dynamic content of the file. in here the Handlebars syntax is fully supported. you can also use `$path` and `$name` placeholders here.

**Files can have a condition which tells the file should only be created if the condition evaluates to true.**

eg:

```
@#if(name.startsWith("App"))
@#file($path/$name.ts)
content
#@
```

Inside the parenthesis is a Javascript expression that will be evaluated safely on the argument values. you can use any argument including `name` and `path` inside this condition.


## Arguments

*Only the arguments that are defined in the template are taken into consideration*. for example, if you pass `-name SomeName` into the command and if `name` is not declared in the template, it will be ignored.

The default value of arguments is `true`. so if you pass `-isAbstract` without a value it will be true by default.

There are two types of arguments you can provide with a command. 

### Value Arguments

These are passed into the template and must be defined in the template's args section. value arguments should start with one hyphen (`-argName`)


You can pass anything to the value. the value should be the next immediate argument in the command. eg: `-componentName TestComponent`.

You can wrap the value in quotes if the value contains spaces.

**Passing compound values** such as arrays and objects can be done by adding `#j` at the beginning of the value. this will tell Gimbli to parse the value as a JavaScript value and pass it to the template. (this will be evaluated safely)

eg: `gimbli class Main/TestClass -props "#j["name", "id"]"`

eg: `gimbli class Main/TestClass -props "#j{ name: "TestClass", isAbstract: true }"`

### Special Arguments

These are the arguments that are passed for changing Gimbli behavior. Special arguments must start with two hyphens. (`--argName`). 

All special arguments can be in the configuration file also and **passing the argument will override the configuration file values**

These arguments won't be passed into the template.

Supported arguments:

* `templateDir` - passing a relative folder path to this will tell Gimbli to search template files inside the given folder instead of the `./templates` folder.


## Configuration File

You can add a `gimbli.json` file in the project root to specify config values instead of passing them to the command every time. currently, there is only one configuration value that is `templateDir`

eg:
```json
{
  "templateDir": "./gimbli-templates"
}
```

## Contributing

Feel free to send pull requests at any time. And any type of contribution is greatly appreciated.