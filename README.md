# Gimbli 

[![codecov](https://codecov.io/gh/rusith/gimbli/branch/master/graph/badge.svg)](https://codecov.io/gh/rusith/gimbli)
![](https://github.com/rusith/gimbli/workflows/Test/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/50acc66394c747e7b4cd642fb731cf5a)](https://www.codacy.com/manual/rusith/gimbli?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rusith/gimbli&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/v/gimbli?color=red&label=NPM)](https://www.npmjs.com/package/gimbli)
## NOT READY FOR GENERAL USE YET

Gimbli is a command line utility that can generate multiple files using a single template file. this tool is still in development and I **cannot recommend
it for the general use yet**. but you can give it a try.


## Why

Creating same set of files again and agin when creating components like React components is a pain in the ass. so I wrote this thing.

## How Gimbli Solves the Problem

Think you are doing a big time project and you have to write 3 files for each component you create.

1. ComponentName.tsx
2. ComponentName.module.css
3. index.tsx

Without a generator you have to create files again and again. But with Gimbli, you just have to create a template file inside the `templates` folder inside your project root and add a template with a name like component.gimbli.

and put your bilerplate code inside the template.

```
@# file($path/$name.tsx) #@
import React from "react";
import styles from "./$name.module.css";

interface IProps {
}

const Component: React.FC<IProps> = () => {
    return (
      <div className={styles.root}>
        Content
      </div>
    );
};

export default Component;
@#@


@# file($path/$name.module.css) #@
.root {

}
@#@


@# file($path/index.ts) #@
import $name from "./$name.tsx";
export default $name;
@#@
```

Now you can run the command `gimbli component components/button/Button`

That's it. Gimbli will go ahead and generate the files. you can pass arguments and change the content using those values. and you can use handlebars inside the template.

Not only React component, you can use Gimbli to generate any file you want.
