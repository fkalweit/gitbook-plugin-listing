
Gitbook listing plugin
==============

Displays sourcecode and output. Inspired by include-display-run gitbook plugin created by ZingChart. Uses html `<code>` to display Sourcecode and `<blockquote>` to display the output.

### 1. You can use install it via **NPM** and save it to package.json:
```
$ npm install gitbook-plugin-listing --save
```
### 2. Add the plugin to `book.json` config
```
{
    "plugins": [ "listing"]
}
```

### 3. Include displayrun block in your markdown files.
```
{% listing    src='src/helloWorld.py', display='both',
                    language='python' %}
{% endlisting %}

```



#### Attributes

* `src` *required* - The relative path to the file that will be displayed in the editor and run in page.
* `display` *optional* - Indicates how the code is included in the page.  Options are: `['both', 'listing', 'run']`
  * default: `both`
  * You can run all commands that run in your console. If you  use C++ or TypeScript-Code  the compiler will be called.  When using TypeScript start the file with `#!/usr/bin/env node`.
* `separator` *optional* - Any text/HTML that should be used between the listing and the executed code if the `display` option is set to `both`
	* default: `Output: <br>`
* `language` *optional* - Sets the programming language  used in the syntax highlighter http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html .
    * default: `bash`
* `readOnly` *optional* - If set to `true`, the editor will not be editable.
    * default: `false`




---
# License

MIT License
