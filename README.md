# vue-scroll-bar
[![Build Status](https://travis-ci.org/YuChenLi923/vue-scroll-bar.svg?branch=master)](https://travis-ci.org/YuChenLi923/extend-assign)
![NPM version](https://badge.fury.io/js/vue-scroll-bar.svg)
![Downloads](http://img.shields.io/npm/dm/vue-scroll-bar.svg?style=flat)

> a simple custom scrollbar vue component

![show](show.gif)

## Install

```

npm i vue-scroll-bar --save

```

## Usage

```

<template>
   <scroll-bar class="warp" :scrollTrackStyle="scrollTrackStyle" :scrollBarStyle="scrollBarStyle">
      <div class="test">
         <p>select1</p>
         <p>select2</p>
         <p>select3</p>
         <p>select4</p>
         <p>select5</p>
         <p>select6</p>
      </div>
   </scroll-bar>
</template>

import scrollBar from 'vue-date-picker';
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
| scrollBarStyle    |  Object     | {} | the style of scroll bar
| barMinHeight | Number | 20 |  the min height of scroll bar
| scrollDis | Number | 130| The distance of each scroll
