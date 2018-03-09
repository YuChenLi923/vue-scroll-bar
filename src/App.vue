<template>
  <div id="app">
    <scroll-bar class="warp" overflow="hidden-x">
      <div class="test">
        <p>select1</p>
        <p>select2</p>
        <p>select3</p>
        <p>select4</p>
        <p>select5</p>
        <p>select6</p>
      </div>
    </scroll-bar>
    <scroll-bar class="warp" overflow="hidden-y">
      <div class="test">
        <p>select1</p>
        <p>select2</p>
        <p>select3</p>
        <p>select4</p>
        <p>select5</p>
        <p>select6</p>
      </div>
    </scroll-bar>
    <scroll-bar class="warp" overflow="auto">
      <div class="test">
        <p>select1</p>
        <p>select2</p>
        <p>select3</p>
        <p>select4</p>
        <p>select5</p>
        <p>select6</p>
      </div>
    </scroll-bar>
    <div class="warp-button">
      <button @click="addItem">Add item to recalculate</button>
    </div>
    <scroll-bar class="warp"
                overflow="hidden-x"
                :watchValue="items">
      <div class="test">
        <p v-for="(item, $index) in items">
          item no {{$index}}
        </p>
      </div>
    </scroll-bar>
    <div class="warp-button">
      <button @click="addItem2">Add item to recalculate for resize test</button>
    </div>
    <scroll-bar class="warp2"
                :watchValue="items2"
                :watchResize="true"
                overflow="hidden-y"
    >
      <div class="test2">
        <p v-for="(item, $index) in items2">
          item no {{$index}}  to recalculate for resize test
        </p>
      </div>
    </scroll-bar>
  </div>
</template>

<script>
import scrollBar from './index'
export default {
  name: 'app',
  data () {
    return {
      items: [new Date()],
      items2: [new Date()]
    }
  },
  components: {
    scrollBar
  },
  methods: {
    addItem () {
      this.items.push(new Date());
    },
    addItem2 () {
      this.items2.push(new Date());
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

p{
  padding-left: 20px;
  height: 20px;
}
p:hover {
  background: #999;
  cursor: default;
}
.warp{
  height: 80px;
  overflow: hidden;
  width: 300px;
  margin: auto;
  border-radius: 2px;
  box-shadow: 0 1px 10px 0 #d0d6e2;
  margin-top: 20px;
}

.warp2{
  height: 80px;
  overflow: hidden;
  width: 100%;
  margin: auto;
  border-radius: 2px;
  box-shadow: 0 1px 10px 0 #d0d6e2;
  margin-top: 20px;
}

.warp2 p {
  display: inline-block;
  padding: 0 10px;
}

.warp2 .test2 {
  display: inline-block;
  white-space: nowrap;
}
.warp-button {
  margin: auto;
  width: 300px;
  margin-top: 20px;
}
button {
  border-radius: 2px;
  box-shadow: 0 1px 10px 0 #d0d6e2;
}
.test{
  width: 400px;
}
</style>
