//状态机初始化
const css = require('css');

const EOF = Symbol("EOF");//EOF:End Of File

let currentToken = null;

let currentAttribute = null;

let stack = [{type: "document", children: []}];
let currentTextNode = null;

let rules = [];

/**
 * 收集CSS
 * @param {String} text 
 */
function addCSSRules(text) {
    var ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

/**
 * 元素匹配选择器
 * @param {*} element 
 * @param {*} selector 
 */
function match(element, selector) {
    if(!selector || !element.attributes)
        return false;

    if (selector.chartAt(0) == "#") {
        var attr = element.attributes.filter(attr => attr.name === "id")[0];
        if(attr && attr.value === selector.replace("#", ''))
            return true;
    } else if (selector.chartAt(0) == ".") {
        var attr = element.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value === selector.replace(".", ''))
            return true;
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }
    return false;
}
/**
 * 匹配规则
 * @param {Object} element 
 */
function computeCSS(element) {
    var elements= stack.slice().reverse();//
    if (!element.computedStyle) 
        element.computedStyle = {};

    for (let rule of rules) {
        var selectorParts = rule.selectors[0].split(" ").reverse();

        if (!match(element, selectorsParts[0])) 
            continue;
        
        let matched = false;

        var j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length) 
            matched = true;

        if (matched) {
            //如果匹配到，我们要加入
            console.log("Element", element, "matched rule", rule);
            
            var sp = specificity(rule.selectors[0]);
            var computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property]) 
                    computedStyle[declaration.property] = {};
                
                if(!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                } else {
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }
        }
    }
    // let inlineStyle = element.attributes.filter(p => p.name == "style");
    // css.parse("{" + inlineStyle + "}");
    // sp = [1, 0, 0, 0];
    // for(...){...}
}
/**
 * 权重、优先级
 * @param {*} selector 
 */
function specificity(selector) {
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(" ");
    for (const part of selectorParts) {
        if (part.chartAt(0) == "#") {
            p[1] += 1;
        } else if (part.chartAt(0) == ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
}s
/**
 * 
 * @param {*} sp1 
 * @param {*} sp2 
 */
function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        
    } else {
        
    }
}

function emit(token) {
    let top = stack[stack.length - 1];

}


function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if(c == EOF) {
        emit({
            type: "EOF"
        });
        return ;
    } else {
        emit({
            type: "text",
            content: c
        });
        return data;
    }
}

function tagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        };
        return tagName(c);//recon
    } else {
        return ;
    }
}

function endTagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);//recon
    } else {
        return ;
    }
}


function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c //.toLowerCase();
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        return 
    }
}

function beforeAttributeName(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);//recon
    } else {
        return ;
    }
}

function selfClosingStartTag(c) {
    if (c == ">") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName(c);//recon
    } else {
        return ;
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == "/") {
        
    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function UnquoteAttributeValue(c) {
    if (c.match(/^[]$/)) {
        
    } else {
        
    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}