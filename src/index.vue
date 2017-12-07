<template>
  <div ref="scrollWindow" class="vue-scroll-window" >
    <div class="vue-scroll-body"
         :class="{'vue-scroll-animation': animation}"
         ref="scrollContent"
         :style="{marginTop: scrollTop + 'px'}">
      <slot></slot>
    </div>
    <div class="vue-scroll-track" @click.stop="clickTo" v-if="showScroll" :style="scrollTrackStyle">
      <button class="vue-scroll-bar"
              :class="{'vue-scroll-animation': !move}"
              :style="[{
                marginTop: top + 'px',
                height: height + 'px'
              }, scrollBarStyle]"
              @mousedown.stop="startMove"
      ></button>
    </div>
  </div>
</template>

<script>
  import getElementCoordinate from './uitls/getElementCoordinate';
  const isFireFox = window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  export default {
    name: 'vue-scroll-bar',
    props: {
      scrollDis: {
        default: 130
      },
      barMinHeight: {
        default: 20
      },
      scrollTrackStyle: {
        default: () => {}
      },
      scrollBarStyle: {
        default: () => {}
      }
    },
    data () {
      return {
        showScroll: false,
        scrollTop: 0,
        top: 0,
        height: 0,
        scrollWinH: 0,
        scrollH: 0,
        contentH: 0,
        startMoveY: 0,
        startTop: 0,
        move: false,
        animation: true
      }
    },
    methods: {
      scroll (e) {
        let scrollDis = this.scrollDis;
        let dis = Math.abs(e.wheelDelta || e.detail);
        let down = (e.wheelDelta < 0) || e.detail > 0;
        if (isFireFox) {
          scrollDis = (scrollDis * dis) / 3
        } else {
          scrollDis = (scrollDis * dis) / 120
        }
        if (down) {
          this.moveDown(scrollDis);
        } else {
          this.moveUp(scrollDis);
        }
      },
      clickTo (e) {
        const y = e.pageY - getElementCoordinate(this.$refs.scrollWindow).y;
        if (y > 0 && y < this.top) {
          this.moveUp(this.scrollDis);
        } else if (y > this.top + this.height) {
          this.moveDown(this.scrollDis);
        }
      },
      moveTo (y) {
        if (this.startTop + y < 0) {
          this.top = 0;
          this.scrollTop = 0;
        } else if (this.startTop + y > this.scrollWinH - this.height) {
          this.top = this.scrollWinH - this.height;
          this.scrollTop = -this.scrollH;
        } else {
          this.top = this.startTop + y;
          this.scrollTop = -this.scrollH * (this.top / (this.scrollWinH - this.height));
        }
      },
      moveDown (dis) {
        if (Math.abs(this.scrollTop - dis) > this.scrollH) {
          this.scrollTop = -this.scrollH;
          this.top = this.scrollWinH - this.height;
        } else {
          this.scrollTop = this.scrollTop - dis;
          this.top = (Math.abs(this.scrollTop) / this.scrollH) * (this.scrollWinH - this.height);
        }
      },
      moveUp (dis) {
        if (this.scrollTop + dis > 0) {
          this.scrollTop = 0;
          this.top = 0;
        } else {
          this.scrollTop = this.scrollTop + dis;
          this.top = (Math.abs(this.scrollTop) / this.scrollH) * (this.scrollWinH - this.height);
        }
      },
      startMove (e) {
        this.move = true;
        this.startMoveY = e.clientY;
        this.startTop = this.top;
      }
    },
    mounted () {
      const {scrollWindow, scrollContent} = this.$refs;
      const scrollWinH = scrollWindow.offsetHeight;
      const contentH = scrollContent.offsetHeight;
      const scrollH = contentH - scrollWinH;
      const minHeight = this.barMinHeight;
      this.scrollH = scrollH;
      this.contentH = contentH;
      this.scrollWinH = scrollWinH;
      this.showScroll = scrollH > 0;
      this.height = scrollWinH / ((scrollH / scrollWinH) + 1) < minHeight ? minHeight : scrollWinH / ((scrollH / scrollWinH) + 1);
      window.addEventListener('mouseup', () => {
        this.move = false;
      });
      window.addEventListener('mousemove', (e) => {
        if (this.move) {
          this.moveTo(e.clientY - this.startMoveY);
        }
      });
      if (isFireFox) {
        scrollH > 0 && scrollWindow.addEventListener('DOMMouseScroll', this.scroll, false);
      } else {
        scrollH > 0 && scrollWindow.addEventListener('mousewheel', this.scroll, false, { passive: false });
      }
    },
    destroy () {
      this.scrollWindow.removeListener('DOMMouseScroll');
      this.scrollWindow.removeListener('mousewheel');
      window.removeEventListener('mouseup');
      window.removeEventListener('mousemove');
    }
  };
</script>

<style lang="css" scoped>
.vue-scroll-window{
  overflow: hidden;
  position: relative;
}
.vue-scroll-track{
  background: #EFF6FA;
  height: 100%;
  position: absolute;
  z-index:1;
  width:5px;
  right: 0;
  top:0;
}
.vue-scroll-bar{
  padding: 0;
  border: none;
  width:100%;
  background: #C0C0C0;
  display: block;
  border-radius: 2px;
  outline: none;
}
.vue-scroll-animation{
  transition:margin-top 0.1s ease;
}
</style>
