# vue-scroll-bar
[![npm](https://img.shields.io/npm/l/vue-scroll-bar.svg)]()
[![Build Status](https://travis-ci.org/YuChenLi923/vue-scroll-bar.svg?branch=master)](https://travis-ci.org/YuChenLi923/vue-scroll-bar)
![NPM version](https://badge.fury.io/js/vue-scroll-bar.svg)
![Downloads](http://img.shields.io/npm/dm/vue-scroll-bar.svg?style=flat)

> a simple custom scrollbar vue component, it can support pc and mobile.

![show-y](show-y.gif)

![show-x](show-x.gif)

[DEMO](https://yuchenli923.github.io/vue-scroll-bar/example/index.html)
## Install

```
npm i vue-scroll-bar --save
```

## Usage

```

<template>
   <scroll-bar class="warp" :scrollTrackStyle="scrollTrackStyle" :scrollBarStyle="scrollBarStyle">
      <div class="test">
        <p v-for="index in 6">
           item no {{index}}
        </p>
      </div>
   </scroll-bar>
</template>

import scrollBar from 'vue-scroll-bar';
export default {
    components: { scrollBar },
    data() {
      return {
        scrollTrackStyle: {
          backgroundColor: 'red'
        },
        scrollBarStyle: {
         ...
        }
      };
    }
};
<style>
.warp{
  height: 80px;
  overflow: hidden;
}
</style>
```

## Props

| Props               | Type      | Default                                         | Description  |
| --------------------|:----------| ------------------------------------------------|--------------|
| scrollTrackStyle    |  Object     | {} | the style of scroll track
| scrollTrackYStyle    |  Object     | scrollTrackStyle | the style of scroll track  in the direction of Y axis
| scrollTrackXStyle    |  Object     | scrollTrackStyle | the style of scroll track  in the direction of X axis
| scrollBarStyle    |  Object     | {} | the style of scroll bar
| scrollBarYStyle    |  Object     | scrollBarStyle | the style of scroll bar in the direction of Y axis
| scrollBarXStyle    |  Object     | scrollBarStyle | the style of scroll bar in the direction of X axis
| barYMinHeight | Number | 20 |  the min height of scroll bar in the direction of Y axis
| barXMinWidth | Number | 20 |  the min width of scroll bar in the direction of X axis
| overflow | String | 'auto'| 'auto', 'hidden', 'hidden-x', 'hidden-y'
| watchValue | Any | `null` |  when content expands, bar would be refreshed
| mobile | Boolean | false | scrollbar will be forced to show in mobile mode when it is set to true
