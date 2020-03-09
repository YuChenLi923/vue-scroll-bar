# Changes

## 0.1.0

- add feature: scrollbar in the direction of X axis
- add props: overflow,scrollTrackXStyle, scrollTrackYStyle...


## 1.0.0

- add feature: scrollbar is refreshing when content changing
- fix style: horizontal scrollBar is not visible

## 1.1.0

- add feature:support mobile device
- fix bug: when scrollBar move to the edge of tack,it can't follow in the opposite direction immediately.

## 1.2.0
- add feature: scrollbar is refreshing when scroll container has been resized
- fix bug: when scrollbar's height or width is the min value,the scrollbar's top or left does not change with size.
- fix style in demo: horizontal scrollBar is not visible
- scroll events handler are refactored to base on cross-browser `mouse-wheel` package
- delete props: scrollDis,scrollDisX,scrollDisY

## 1.2.1

- fix bug: When content items are removed one by one and content is scrolled to end, recalculation of scrollbars is going wrong.
- add feature:  handling scroll x event - for Apple MagicMouse/MagicTrackpad

## 1.2.2

- fix bug:When the container don't have scrollBar,it will prevent `touchmove`'s default action.
- modify demo style


## 1.2.3
- add a prop: mobile, scrollbar will be forced to show in mobile mode when it is set to true.
