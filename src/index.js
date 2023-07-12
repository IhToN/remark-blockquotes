// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM3.965 13.096a6.5 6.5 0 0 0 9.131-9.131ZM1.5 8a6.474 6.474 0 0 0 1.404 4.035l9.131-9.131A6.499 6.499 0 0 0 1.5 8Z"></path></svg>

// from github.com/syntax-tree/unist-util-map/blob/bb0567f651517b2d521af711d7376475b3d8446a/index.js
const Octicons = require("./octicons");
const map = (tree, iteratee) => {
    const preorder = (node, index, parent) => {
        const newNode = iteratee(node, index, parent);

        if (Array.isArray(newNode.children)) {
            newNode.children = newNode.children.map((child, index) => {
                return preorder(child, index, node);
            });
        }

        return newNode;
    };

    return preorder(tree, null, null);
};

const toKebabCase = str =>
    str &&
    str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('-');

const parseQuoteHeader = (text) => {
    const REGEX = /([\w\s]+)(?:\[(.*)])?/g;
    const [, type, message] = REGEX.exec(text);

    const title = {
        type: 'strong',
        children: [{
            type: 'text',
            value: message || type
        }]
    }

    let svgBlock;

    let quoteType = toKebabCase(type);

    switch (quoteType) {
        case 'error':
            svgBlock = Octicons.CircleSlash;
            break;
        case 'warning':
            svgBlock = Octicons.Alert;
            break;
        case 'note':
            svgBlock = Octicons.Info;
            break;
        default:
            svgBlock = Octicons.Info;
            quoteType = 'note';
            break;
    }

    const quoteHeader = {
        type: quoteType,
        blocks: [{
            type: 'parent',
            children: [svgBlock, title],
            data: {
              hName: 'span',
              hProperties: {
                class: 'blockquote__header',
              }
            }
        }],
        attributes: {
            class: `blockquote blockquote--${quoteType}`,
            "data-type": quoteType,
            "data-original-title": type,
        }
    };
    return quoteHeader;
}

module.exports = () => (tree) => {
    return map(tree, (node) => {
        const {
            children = []
        } = node;
        if (node.type !== 'blockquote') {
            return node;
        }

        const [block] = children;
        if (block.type !== 'paragraph') {
            return node;
        }

        const [first] = block.children;
        let quoteHeader = null;
        if (first.type === 'strong' && first.children.length > 0 && first.children[0].type === 'text') {
            quoteHeader = parseQuoteHeader(first.children[0].value);
            block.children = [...quoteHeader.blocks, ...block.children.slice(1)];

            node.data = {
                hProperties: {
                    ...quoteHeader.attributes,
                }
            }
        }

        return node;
    });
};