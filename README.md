# remark-blockquotes

Add custom blockquotes to your markdown. This package is intended to work over remark using mdast \
It is based on the GFM implementation: https://github.com/orgs/community/discussions/16925

## Installation

```bash
npm i remark-blockquotes
```

## Usage

### Block Types

#### Note block

This block is intended to be used for notes, tips, etc. If the block type specified does not exist, it will be rendered as a note block.

```markdown
> **Note** \
> Lorem ipsum
```

Will be transformed to:

```html
<blockquote class="blockquote blockquote--note" data-type="note" data-original-title="Note">
  <p>
    <span class="blockquote__header">
      <svg class="octicon octicon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
        ></path>
      </svg>
      <strong>Note</strong>
    </span>
    <br />
    Lorem ipsum
  </p>
</blockquote>
```

#### Warning block

This block is intended to be used for warnings, alerts, etc.

```markdown
> **Warning** \
> Lorem ipsum
```

Will be transformed to:

```html
<blockquote class="blockquote blockquote--warning" data-type="warning" data-original-title="Warning">
  <p>
    <span class="blockquote__header">
      <svg class="octicon octicon-info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
        <path
          d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
        ></path>
      </svg>
      <strong>Warning</strong>
    </span>
    <br />
    Lorem ipsum
  </p>
</blockquote>
```

#### Error block

This block is intended to be used for errors, failures, etc.

```markdown
> **Error**
> Lorem ipsum \
> Dolor sit amet
```

Will be transformed to:

```html
<blockquote class="blockquote blockquote--error" data-type="error" data-original-title="Error">
  <p>
    <span class="blockquote__header">
      <svg
        class="octicon octicon-circle-slash"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="16"
        height="16"
      >
        <path
          d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM3.965 13.096a6.5 6.5 0 0 0 9.131-9.131ZM1.5 8a6.474 6.474 0 0 0 1.404 4.035l9.131-9.131A6.499 6.499 0 0 0 1.5 8Z"
        ></path>
      </svg>
      <strong>Error</strong>
    </span>
    <br />
    Lorem ipsum <br />
    Dolor sit amet
  </p>
</blockquote>
```

### Custom Header Message

You can also customize the header message by adding a custom header message after the block type between brackets.

```markdown
> **Error[Ay mecachis]** \
> Lorem ipsum \
> Dolor sit amet
```

### Adding the script

And our script looks as follows:

```javascript
const remark = require('remark');

remark()
  .use(require('remark-blockquotes'))
  .use(require('remark-html'))
  .process(src, (err, file) => console.log(String(file)));
```
