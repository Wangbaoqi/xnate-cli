# usage

::: info 
1. 单节点更新之后为单节点
2. 多节点更新之后为单节点

::


在**react**中，更新`UI`必须生成新的`JSX`对象（称之为`visual DOM`），而`新的JSX`对象和`老的visual DOM`之间对比以最小的操作次数来获取`差异节点`（也称之为副作用），从而高效的更新`UI`。

用现在[最优的算法](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)解决也需要时间复杂度为`O(n^3)`来解决，这对于web页面这么多的节点而言，采用这种算法代价太高了，可以说是灾难。

不过，**react**在两个假设的基础上提出了一套时间复杂度为`O(n)`的算法，而这种算法在操作DOM的场景下都成立。

1. **不同类型的元素会产生不同的树**，比如之前节点类型是`p`，之后又变成了`div`，那么这两个节点是不同的两棵树。
2. **节点的属性key值可以限制节点能否复用**，如果前后前两个节点的`key`值不同，则两个节点也是不同的两个树。

最重要的一点，执行这两个限制条件的前提是**必须是同级对比**，如果节点跨层级了，那么也不会去复用，而是去新建一个节点。这样才能保证该算法的时间复杂度为`O(n)`,`n`为节点的个数。

**react**中，有两种类型的`diff`算法，**单节点diff**和**多节点diff**。

> 从源码看，`diff`算法是在`render阶段`的[beginWork](https://github.com/Wangbaoqi/react/blob/17.0.2/packages/react-reconciler/src/ReactFiberBeginWork.old.js#L3083)中。

`beginWork`主要有两个过程（`mount`和`update`）：

* `update`（更新）阶段主要是`diff算法`的过程。
* `mount`(挂载)阶段主要是`创建Fiber树`的过程。

下面是`diff算法`的入口：

```js
// react/packages/react-reconciler/src/ReactChildFiber.old.js
reconcileChildFibers(
    returnFiber: Fiber,
    currentFirstChild: Fiber | null,
    newChild: any,
    lanes: Lanes,
  ): Fiber | null {
    const isObject = typeof newChild === 'object' && newChild !== null;
    if (isObject) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            // 单节点 diff
            reconcileSingleElement(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes,
            ),
          );
      }
    }
    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // reconcileSingleTextNode
    }
    if (isArray(newChild)) {
      // reconcileChildrenArray 多节点diff
    }
    //... 其他处理
    // 没有找到上述类型，则删除节点
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  }
  return reconcileChildFibers;
}
```

## 单节点Diff

> `单节点Diff源码`[这里](https://github.com/Wangbaoqi/react/blob/17.0.2/packages/react-reconciler/src/ReactChildFiber.old.js#L1135)

单节点更新的类型：

1. 单节点更新之后为单节点
2. 多节点更新之后为单节点

首先看一下入口函数：

```js
// react/packages/react-reconciler/src/ReactChildFiber.old.js
/**
 * returnFiber 指向当前构建的workInProgress Fiber节点 的父级节点
 * currentFirstChild 当前页面展示的 current Fiber，也是需要更新的节点
 * element 当前需要更新的最新节点 也就是JSX对象
 */
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
  lanes: Lanes,
): Fiber {
  const key = element.key;
  let child = currentFirstChild;
  // update 阶段 child 不为 null 
  while (child !== null) {
    if (child.key === key) {
      switch (child.tag) {
        case Fragment: {
          // 处理 Fragment
        }
        case Block:
          // 处理 Block
        default: {
          if (
            child.elementType === element.type
          ) {
            // 为当前节点的所有兄弟节点打上Deletion的EffectTag，因为单节点一旦复用，其他兄弟节点都会被标记删除
            // 同时构建EffectList链表
            deleteRemainingChildren(returnFiber, child.sibling);
            const existing = useFiber(child, element.props);
            existing.ref = coerceRef(returnFiber, child, element);
            existing.return = returnFiber;
            return existing;
          }
          break;
        }
      }
      // Didn't match.
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // 给需要删除的节点打上Deletion的EffectTag，并且构建effectList链表
      deleteChild(returnFiber, child);
    }
    // 存在 多节点更新之后变为单节点
    child = child.sibling;
  }

  if (element.type === REACT_FRAGMENT_TYPE) {
    // 处理 Fragment
  } else {
    // 创建新的Fiber节点 根据JSX type
    const created = createFiberFromElement(element, returnFiber.mode, lanes);
    created.ref = coerceRef(returnFiber, currentFirstChild, element);
    created.return = returnFiber;
    return created;
  }
}
```

首先，有一个`while`循环，这里有两次含义：

1. 首次渲染的时候，因为`currentFiber`不存在，因此`currentFirstChild == null`，直接创建`Fiber`节点。
2. 当更新的时候，`currentFiber`已经存在，如果是**多节点更新为单节点**，此时会走`while`循环。

接着，如果是**更新**的场景，则会判断是否能够**复用节点**。这里是`单节点diff`的核心。

最后，将当前的`Fiber`节点（不管是复用的还是新创建的）返回作为`workInProgress.child`的值。

下面为单节点**diff**的流程图

![diff-single-loop](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-single-loop.webp)

其中，最核心还是`oldFiber`和`element`的`diff`对比过程，

从`diff`单节点的两个场景分别看下如果进行`diff`对比，以及最终生成的`effectList`。

### 单节点到单节点对比

如下代码，

```html
<!-- 更新前 -->
<div>
  <span key='a'>0</span>
</div>

<!-- 更新后 -->
<div>
  <span key='a'>1</span>
</div>
```

更新前后，元素的`key`和`type`都没有变化，因此在`diff`过程中可以复用`oldFiber`作为当前构建的`workInProgress`。

因为前后都是单节点，所以不存在去删除其兄弟节点（为其兄弟节点打上`Deletion`的`effectTag`），所以`diff`过程是没有生成`effectList`的，但是节点更新了，肯定会生成`effectList`的，这个过程是在`render阶段`中[completeWork](https://github.com/Wangbaoqi/react/blob/17.0.2/packages/react-reconciler/src/ReactFiberCompleteWork.old.js#L645)中，

`completeWork`也有两个过程（`mount`和`update`）：

* `update`（更新）阶段主要是计算`newProps`和`oldProps`的差异，如果存在，则为当前`Fiber`打上`Update`的`effectTag`。
* `mount`(挂载)阶段主要是`创建Fiber节点对应的DOM节点`的过程。

所以，更新前后的`span`标签的`children`更新的，所以`span`标签的`Fiber`节点会有`Update`的`effectTag`。

有了`effectTag`，在`completeUnitOfWork`阶段的最后会生成`effectList`

> [这里](https://github.com/facebook/react/blob/17.0.2/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L1706)可以看到在`completeWork`阶段处理`effectList`链表的源码

### 多节点到单节点对比

如下代码：

```html
<!-- 更新前 -->
<div>
  <span key='a'>0</span>
  <span key='b'>1</span>
  <span key='c'>2</span>
  <span key='d'>3</span>
</div>

<!-- 更新后 -->
<div>
  <span key='c'>4</span>
</div>
```

因为`oldFiber div`节点是多节点，遍历其每一个节点与更新后的`JSX`对象对比，如上图，如果没有复用的节点，就执行`deleteRemainingChildren(returnFiber, child);`，给当前`oldFiber`节点打上`Deletion`的`effectTag`，同时生成`effectList`链表。

如果碰到可以复用的节点，执行`deleteRemainingChildren(returnFiber, child.sibling);`，注意，这里的参数是`child.sibling`，因为此时已经匹配到了节点，需要删除当前节点的所有兄弟节点，并且将要删除的节点添加到`effectList`链表中。

这样，多节点到单节点的`diff`操作结束，返回复用的节点作为父节点的`child`。

之后，同样进入`render阶段`中的[completeWork](https://github.com/Wangbaoqi/react/blob/17.0.2/packages/react-reconciler/src/ReactFiberCompleteWork.old.js#L645)，对复用的节点进行`oldProps`和`newProps`的对比，如果有差异，则给当前节点打上`Update`的`effectTag`，并且将该节点添加到`effectList`链表中。

至此，多节点到单节点的整个`协调过程`全部结束，生成的`effectList`链表被保存在`父节点`的`firstEffect`属性中。

下图，展示了最终生成的`effectList`链表。**黄色**的线是`effectList`的走向。

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diif-single-m.webp)

## 多节点Diff

> 从`源码`[这里](https://github.com/Wangbaoqi/react/blob/main/packages/react-reconciler/src/ReactChildFiber.old.js#L750)角度来看，多节点`Diff`算法会有两轮循环。

多节点主要有以下几种方式需要更新：

1. 节点更新
2. 节点增加或者减少
3. 节点位置变化

由于**Web UI**的更新主要以`更新`为主，所以第一轮循环主要解决节点的更新。

首先看下源码入口:

```js
// 多节点 Diff 入口
function reconcileChildrenArray(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChildren: Array<*>,
  lanes: Lanes
): Fiber | null {
  // * 最终返回的fiber节点 - 也就是带有sibling的子链表
  let resultingFirstChild: Fiber | null = null;
  // * 中间变量 用来保存每一次新生成的newFiber
  let previousNewFiber: Fiber | null = null;

  // * 用来跟newChildren对比的currentFiber
  let oldFiber = currentFirstChild;
  // * 中间变量 用来保存oldFiber 链表的当前节点
  let nextOldFiber = null;

  // * 用来记录Fiber节点对应的DOM节点的位置
  let lastPlacedIndex = 0;

  // * 遍历更新元素数组的索引
  let newIdx = 0;

  // TODO ...
  return resultingFirstChild;
}
```

首先可以看到，多节点更新逻辑的输入参数为`currentFirstChild`、`newChildren`和`returnFiber`，以及初始化定义的参数，在后面会具体说明。

`returnFiber`就是当前需要对比节点的父节点对应的`current Fiber`树。

`currentFirstChild`为当前页面呈现的`current fiber`树的第一个子`Fiber`节点。

`newChildren`为页面更新之后的包含`新JSX对象`的数组。

而返回的`resultingFirstChild`是`WorkInProgress Fiber`节点，也就是`diff`操作之后最新的`Fiber`，可以看到上图右上侧对应的`Fiber 双缓存`树上的节点。

### 第一轮循环

![first-loop](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-first-loop.webp)

从*第一轮循环图*可以看到，如果`oldFiber`老节点和`newChildren[newIdx]`新节点的`type`和`key`相同，因此，在生成新的 Fiber 节点的时候，会直接`复用oldFiber`节点，而这种场景节点`数量`、`顺序`都没有变化，所以在第一轮循环中，`newChildren`和`oldFiber`都遍历完了。

```js
// 第一遍轮换
for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
  if (oldFiber.index > newIdx) {
    nextOldFiber = oldFiber;
    oldFiber = null;
  } else {
    nextOldFiber = oldFiber.sibling;
  }
  const newFiber = updateSlot(
    returnFiber,
    oldFiber,
    newChildren[newIdx],
    lanes
  );
  // key值不同，不能复用，直接跳出循环，进入第二轮循环
  if (newFiber === null) {
    if (oldFiber === null) {
      oldFiber = nextOldFiber;
    }
    break;
  }
  // shouldTrackSideEffects 更新节点为true
  if (shouldTrackSideEffects) {
    // 新创建的Fiber节点 alternate 为 null
    if (oldFiber && newFiber.alternate === null) {
      deleteChild(returnFiber, oldFiber);
    }
  }

  lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);

  if (previousNewFiber === null) {
    resultingFirstChild = newFiber;
  } else {
    previousNewFiber.sibling = newFiber;
  }
  previousNewFiber = newFiber;
  oldFiber = nextOldFiber;
}
// newChildren 遍历结束 直接跳出第一轮循环
if (newIdx === newChildren.length) {
  // We've reached the end of the new children. We can delete the rest.
  deleteRemainingChildren(returnFiber, oldFiber);
  return resultingFirstChild;
}
```

第一轮遍历主要判断`Fiber节点`是否能复用，而复用的逻辑主要在`updateSlot`函数**源码**[这里](https://github.com/Wangbaoqi/react/blob/main/packages/react-reconciler/src/ReactChildFiber.old.js#L564)中。

`updateSlot`会根据`oldFiber`和`newChildren[newIdx]`的`key`、`elementType`对比，如果`key`不同，直接返回`null`空节点，此时`newFiber=null`，则跳出第一轮循环。

否则根据`elementType`判断，相同则复用`oldFiber`，不同则创建新的`Fiber`的节点，如果是新增的节点，则会在`oldFiber`节点打上`Delete`的`effectTag`，标记需要删除，同时处理`current Fiber`树的`EffectList`。

否则在新`Fiber`节点上打上`Placement`的`effectTag`，标记需要更新的节点。

最后更新`resultingFirstChild`链表，进行下一次循环，直到`newChildren`遍历结束，然后跳出循环。

### 第二轮循环

从第一轮的图看到，只有当`oldFiber`和`newChildren`都遍历结束之后，第一轮才会结束。

那么进入第二轮循环的条件是：

1. `oldFiber`没有遍历完，`newChildren`没有遍历完
2. `oldFiber`没有遍历，`newChildren`遍历结束
3. `oldFiber`遍历完，`newChildren`没有遍历完

进入第二轮主要的场景有:

* 节点增加 - 符合上述场景`3`
* 节点减少 - 符合上述场景`2`
* 节点移动 - 符合上述场景`1`

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-second-loop.webp)

从上图中可以看到，当符合场景`3`的时候，会为每一个新增的节点闯将对应的`Fiber`节点，然后打上`Placement`的`effectTag`，然后结束`Diff 算法`。

```js
// 符合场景3 的源码
if (oldFiber === null) {
  for (; newIdx < newChildren.length; newIdx++) {
    // 创建Fiber
    const newFiber = createChild(returnFiber, newChildren[newIdx], lanes);
    if (newFiber === null) {
      continue;
    }
    // 为Fiber添加Placement的Tag
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
  return resultingFirstChild;
}
```

当符合场景`1`和场景`2`的时候，此时`oldFiber`和`newChildren`都没有遍历完，为了降低算法的时间复杂度，采用了`空间换时间`的方式。

将剩余的`oldFiber`加入了哈希表中，然后只遍历`newChildren`，根据`newChildren[newIdx]`的`key`来判定是否可以复用节点，之后的流程就跟第一轮的复用逻辑一致了。最后，返回`workInProgress`的`fiber`子树，作为其`return Fiber`的`child`子属性。

```js
// 符合场景1、2的源码

// oldFiber添加Map
const existingChildren = mapRemainingChildren(returnFiber, oldFiber);

for (; newIdx < newChildren.length; newIdx++) {
  // 复用逻辑
  const newFiber = updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChildren[newIdx],
    lanes,
  );
  if (newFiber !== null) {
    if (shouldTrackSideEffects) {
      if (newFiber.alternate !== null) {
        existingChildren.delete(
          newFiber.key === null ? newIdx : newFiber.key,
        );
      }
    }
    lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
}
//  map中还存在oldFiber节点的话，直接当上Deletion的EffectTag
if (shouldTrackSideEffects) {
  existingChildren.forEach(child => deleteChild(returnFiber, child));
}
return resultingFirstChild;
```

至此，多节点的`Diff算法`的大致过程就结束了，下面针对每种不同的场景看下对应的`双缓存的Fiber`树和其产生的`effectList`。

### 节点更新

节点更新有`节点属性更新`和`节点类型更新`

**节点属性更新**

如下图，更新之前和之后，元素的类型`type`和`key`都没有变化。

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-mult-update-v.webp)

```html
<!-- 更新前 -->
<div>
  <span className="a">0</span>
  <span className="b">1</span>
</div>

<!-- 更新前1 -->
<div>
  <span className="a">0</span>
  <span className="b">1</span>
  <span className="c">2</span>
</div>

<!-- 更新后 -->
<div>
  <span className="a">0</span>
  <span className="b">2</span>
</div>
```

这种场景，在`Diff`的过程，会直接复用`oldFiber`节点，此时更新后的节点全部遍历了，进入到了`newIdx === newChildren.length`，如果还存在`oldFiber`没有遍历(*更新前1*场景)，则执行`deleteRemainingChildren`将没有遍历的`oldFiber`节点都打上`Deletion`的`effectTag`

**节点类型更新**

如下图，节点类型更新，`key`相同，而`elementType`不同，不用复用`oldFiber`，直接创建`new Fiber`节点

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-mult-update.webp)

```html
<!-- 更新前 -->
<div>
  <span className="a">0</span>
  <span className="b">1</span>
</div>

<!-- 更新后 -->
<div>
  <span className="a">0</span>
  <div className="b">2</div>
</div>
```

`类型更新`的节点跟`属性更新`的节点之间在执行没有太大的区别，都是在`oldFiber`节点打上`Deletion`的`effectTag`，只是在执行的顺序上有所不同。

我们知道，**React Diff** 的最终目的是将对比出来具有`effectTag`的`Fiber`节点生成一个`effectList链表`，在`commit阶段`遍历此链表进行`DOM操作`。

接下来看下在`节点更新`中`属性更新`和`类型更新`在生成`effectList`有什么不同？

**节点属性更新 - Fiber树**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-update-Fiber.webp)

可以看到，当`节点属性`更新之后，`workInProgress Fiber`中更新的节点都复用了`current Fiber`中的节点，因此`workInProgress Fiber`中的每一个节点都会指向(`alternate`)对应的`current Fiber`节点。

当所有的节点都被复用之后（**新老节点的位置、个数一致**），在`Diff 算法`的过程中是不会产生`EffectList`的，如下图：

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-update-effectList.webp)

上图是`render阶段 - completeWork`生成的`effectList`，这里具有`effectTag`的节点就是`div Fiber节点`，在`completeWork阶段`会判断如果`workInProgress Fiber节点`具有`effectTag`的话，就会将其挂载在其`return Fiber 节点`的`firstEffect`和`lastEffect`属性上。

> [这里](https://github.com/facebook/react/blob/17.0.2/packages/react-reconciler/src/ReactFiberWorkLoop.old.js#L1706)可以看到在`completeWork`阶段处理`effectList`链表的源码

**节点类型更新 - Fiber树**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-updatev-fiber.webp)

可以看到，当`节点类型`更新之后，`workInProgress Fiber`是不会复用`oldFiber`的，因此更改的`div Fiber`是不会有`alternate`指向其`current Fiber`的。

由于更新了**节点类型**，就会产生`effectTag`，`oldFiber span`节点就会被打上`Deletion`的`effectTag`，从而在`Diff 算法`的过程中产生`EffectList`。

如下图：

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-updatev-effectlist.webp)

在第一轮遍历中，`div Fiber`不能复用`span Fiber`节点，因此新创建了`Fiber`节点，只有为`span Fiber`节点打上`Deletion`的`EffectTag`，同时在其`return Fiber`节点上产生`EffectList`（上图左侧）。之后在`completeWork`阶段会在其基础上继续生成带有`EffectTag`的`effectList`（上图右侧）。

> [这里](https://github.com/facebook/react/blob/17.0.2/packages/react-reconciler/src/ReactChildFiber.old.js#L275)可以看到在`Diff 算法`的过程中产生`EffectList`的源码

### 节点增加

如下图：新增了一个子节点

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-add1.webp)

```html
<!-- 更新前 -->
<div>
  <span className="a">0</span>
  <span className="b">1</span>
</div>

<!-- 更新后 -->
<div>
  <span className="a">0</span>
  <div className="b">1</div>
  <span className="c">2</span>
</div>
```

这里，第一轮循环结束之后，会继续遍历`newChildren`，生成第三个`span Fiber`节点，为其打上`Placement`的`effectTag`，然后生成`effectList`。

下图为节点增加的**双缓存Fiber树**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-add-fiber.webp)

同理，不能复用的节点或者新增的节点都会生成Fiber节点，都没有`alternate`指向其`current Fiber`。

下面看下节点增加最后产生的**effectList**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-add-effectlist.webp)

新增的`fiber`节点打上了`effectTag`，在`completeWork`中产生了`diff 算法`之后的`effectList`。

### 节点减少

如下图：新增了一个子节点

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-mult-short.webp)

```html
<!-- 更新前 -->
<div>
  <span className="a">0</span>
  <span className="b">1</span>
</div>

<!-- 更新后 -->
<div>
  <span className="a">0</span>
</div>
```

此时，`newChildren`遍历结束，`oldFiber`还有的话，需要为每一个`oldFiber`节点打上`Deletion`的`effectTag`，然后产生`effectList`。

下图为节点减少的**双缓存Fiber树**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-short-fiber.webp)

下面看下节点增加最后产生的**effectList**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diiff-multi-short-effectlist.webp)

### 节点移动

如下图：节点的位置发生了变化

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-position.webp)

```html
<!-- 更新前 -->
<div>
  <span className="a">0</span>
  <span className="b">1</span>
</div>

<!-- 更新后 -->
<div>
  <span className="b">1</span>
  <span className="a">0</span>
</div>
```

这里，只是节点的位置发生了变化，因此节点是可以复用的，如下图**双缓存Fiber树**

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-position-fiber.webp)

这里问题来了，如何对位置变化的`Fiber` 打上`effectTag`呢？

这个例子中，`span a`和`span b`元素的位置发生了变化，简单的`DOM`操作的话，直接获取`span a`元素的`dom`对象，通过`appendChildren`直接插入到`div`中。

在`diff`的过程中，会将`span a`元素的`Fiber`对象打上`Placement` 的`EffectTag`，这个过程就是位置变化对比新旧`fiber`的过程。

如下图：

![](https://media.wangbaoqi.tech/assets/blog/react/diff/diff-multi-position1.webp)

在遍历`newChildren`的过程中，`lastPlaceIndex`会保存可复用节点的上一次位置索引`index`，初始值为`0`

* 如果可复用节点的索引`oldIndex < lastPlaceIndex`，那么当前`newChildren[newIdx]`的`Fiber`节点会打上`Placement`的`effectTag`的tag，表示该节点需要移动；同时下一次循环复用该`lastPlaceIndex`.
* 如果可复用节点的索引`oldIndex >= lastPlaceIndex`, 那么用`oldIndex`更新`lastPlaceIndex`，表示该节点此次不需要移动。

> [这里](https://github.com/Wangbaoqi/react/blob/main/packages/react-reconciler/src/ReactChildFiber.old.js#L332)可以看到此次`Diff`的位置对比源码，在`placeChild`方法中。

最后，关于多节点的`diff`还有其他的场景，上面罗列了一些比较常见的方式。其中最重要的就是判断新老节点是否能够复用，节点的`effectTag`以及`effectList`的产生。

而最终产生的`effectList`会在**commit**阶段遍历，从而更新真实的`DOM`节点。

## 总结

**React diff**算法是在被限制场景下进行的高效对比算法，在`双缓存 Fiber树`的前提下，构建`workInProgress Fiber`树完全是在内存中进行的，这也是`diff`操作的一个优点，并不会干扰页面的呈现。

**React diff**算法也是**render阶段**（也被称为协调过程）中最重要的一环，在`mount`阶段创建`workInProgress Fiber`树，然后在**commit阶段**将`workInProgress Fiber`指向`current Fiber`树；在`update`阶段进行`diff`算法，对比`current Fiber`节点同级的`JSX`对象，生成`worKInProgress Fiber`树，同时产生`effectList`链表，在**commit阶段**遍历这条链表，依次执行副作用。

这里**React diff**算法大致就结束了，在后面会继续深入**commit阶段**，是如何遍历`effectList`链表的。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `primary` `info` `warning` `danger` | _string_ | `default` |
| size | 尺寸，可选值为 `large` `small` `mini` | _string_ | `normal` |
| text | 按钮文字 | _string_ | - |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | _string_ | - |
| icon | 按钮 Icon | _ReactNode_ | - |
| iconPosition | 图标展示位置，可选值为 `right` | _string_ | `left` |
| tag | 按钮根节点的 HTML 标签 | _string_ | `Button` |
| nativeType | 原生 Button 标签的 type 属性 | _string_ | `Button` |
| block | 是否为块级元素 | _boolean_ | `false` |
| plain | 是否为朴素按钮 | _boolean_ | `false` |
| square | 是否为方形按钮 | _boolean_ | `false` |
| round | 是否为圆形按钮 | _boolean_ | `false` |
| shadow | 显示阴影，可选值为 `1` `2` `3` | _boolean\|number_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 边框 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean_ | `false` |
| loadingText | 加载状态提示文字 | _string_ | - |
| loadingType | [加载图标类型](/components/loading)，可选值为 `spinner` | _string_ | `circular` |
| loadingSize | 加载图标大小 | _string_ | `20px` |



![](https://opencollective.com/react-vant/contributors.svg?width=960)