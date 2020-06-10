# week09

1.图形实现 data uri + svg

```
data:image/svg+xml,<svg></svg>
```

homework：css总结   不要webkit前缀的总结属性，
```
getComputedStyle(document.body);
```

## 二、HTML

```
<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->
```
## 三、重学DOM

1.操作dom，直接执行，不需要把它先从dom tree 摘下来
appendChild是把元素挪过去，不是加上去

### 高级操作

1.compareDocumentPosition 是一个用于比较两个节点中关系的函数
2.contains  检查一个节点是否包含另一个节点的函数
3.isEqualNode   检查两个节点是否完全相同
4.isSameNode    
5.cloneNode



用while不会使数组长度不会变 (leaving collection)

### DOM events
```

addEventListener('click', { handleEvent: function(e){
    console.log('!!')
}})
```