<template>
  <div ref="scrollWindow" class="vue-scroll-window" >
    <div class="vue-scroll-body"
         :class="{'vue-scroll-animation': animation}"
         ref="scrollContent"
         :style="{marginTop: scrollTop + 'px', marginLeft: scrollLeft + 'px'}">
      <slot/>
    </div>
    <div class="vue-scroll-track left-track"
         @click.stop="(e) => {clickTo(e, 'y');}"
         v-if="showScrollY"
         :style="[scrollTrackYStyle || scrollTrackStyle]"
    >
      <button class="vue-scroll-bar left-bar"
              :class="{'vue-scroll-animation': !moveY}"
              :style="[{
                marginTop: top + 'px',
                height: (showScrollX ? height - 5: height) + 'px'
              }, scrollBarYStyle || scrollBarStyle]"
              @mousedown.stop="startMoveY"
      ></button>
    </div>
    <div class="vue-scroll-track bottom-track"
         @click.stop="(e) => {clickTo(e, 'x');}"
         v-if="showScrollX"
         :style="[scrollTrackXStyle || scrollTrackStyle]"
    >
      <button class="vue-scroll-bar bottom-bar"
              :class="{'vue-scroll-animation': !moveX}"
              :style="[{
                marginLeft: left + 'px',
                width: width + 'px'
              }, scrollBarXStyle || scrollBarStyle]"
              @mousedown.stop="startMoveX"
      ></button>
    </div>
  </div>
</template>

<script>
  import getElementCoordinate from './uitls/getElementCoordinate';
  import mouseWheel from 'mouse-wheel';

  export default {
    name: 'vue-scroll-bar',
    props: {
      scrollDis: {
        default: 130
      },
      scrollDisX: {
        default: false
      },
      scrollDisY: {
        default: false
      },
      barXMinHeight: {
        default: 20
      },
      barYMinWidth: {
        default: 40
      },
      scrollTrackStyle: {
        default: () => {}
      },
      scrollTrackYStyle: {
        default: null
      },
      scrollTrackXStyle: {
        default: null
      },
      scrollBarStyle: {
        default: () => {}
      },
      scrollBarXStyle: {
        default: null
      },
      scrollBarYStyle: {
        default: null
      },
      overflow: {
        default: 'none'
      },
      watchValue: {
        default: null
      },
      watchResize: {
        default: false
      }
    },
    data () {
      return {
        showScrollY: false,
        showScrollX: false,
        scrollTop: 0,
        scrollLeft: 0,
        top: 0,
        height: 0,
        left: 0,
        width: 0,
        scrollWinH: 0,
        scrollH: 0,
        contentH: 0,
        contentW: 0,
        startY: 0,
        startTop: 0,
        startX: 0,
        startLeft: 0,
        moveX: false,
        moveY: false,
        bottomMove: false,
        animation: true
      }
    },
    watch: {
      watchValue () {
        if (this.watchValue) {
          this.$nextTick(() => {
            this.recalculate();
            this.$nextTick(() => {
              if (this.showScrollY || this.showScrollX) {
                this.bindEvents();
              }
            });
          });
        }
      }
    },
    methods: {
      scrollXY (x, y) {
        if (this.showScrollY) this.scrollY(y);
        if (this.showScrollX) this.scrollX(x);
      },
      clickTo (e, type) {
        if (type === 'y') {
          const y = e.pageY - getElementCoordinate(this.$refs.scrollWindow).y;
          const scrollDis = this.scrollDisY || this.scrollDis;
          if (y > 0 && y < this.top) {
            this.moveUp(scrollDis);
          } else if (y > this.top + this.height) {
            this.moveDown(scrollDis);
          }
        } else {
          const x = e.pageX - getElementCoordinate(this.$refs.scrollWindow).x;
          const scrollDis = this.scrollDisX || this.scrollDis;
          if (x > 0 && x < this.left) {
            this.moveLeft(scrollDis);
          } else if (x > this.left + this.width) {
            this.moveRight(scrollDis);
          }
        }
      },
      moveToY (y) {
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
      moveToX (x) {
        if (this.startLeft + x < 0) {
          this.left = 0;
          this.scrollLeft = 0;
        } else if (this.startLeft + x > this.scrollWinW - this.width) {
          this.left = this.scrollWinW - this.width;
          this.scrollLeft = -this.scrollW;
        } else {
          this.left = this.startLeft + x;
          this.scrollLeft = -1 * this.scrollW * (this.left / (this.scrollWinW - this.width));
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
        if (this.scrollTop + dis <= 0) {
          this.scrollTop = 0;
          this.top = 0;
        } else {
          this.scrollTop = this.scrollTop + dis;
          this.top = (Math.abs(this.scrollTop) / this.scrollH) * (this.scrollWinH - this.height);
        }
      },
      scrollY (dis) {
        if (dis < 0 && this.scrollTop + dis <= 0) {
          this.scrollTop = 0;
          this.top = 0;
        } else if (dis > 0 && this.scrollTop + dis < this.scrollH) {
          this.scrollTop = -this.scrollH;
          this.top = this.scrollWinH - this.height;
        } else {
          this.scrollTop = this.scrollTop - dis;
          this.top = (Math.abs(this.scrollTop) / this.scrollH) * (this.scrollWinH - this.height);
        }
      },
      scrollX (dis) {
        if (dis < 0 && this.scrollLeft + dis <= 0) {
          this.scrollLeft = 0;
          this.left = 0;
        } else if (dis > 0 && this.scrollLeft + dis < this.scrollW) {
          this.scrollLeft = -this.scrollW;
          this.left = this.scrollWinW - this.width;
        } else {
          this.scrollLeft = this.scrollLeft - dis;
          this.left = (Math.abs(this.scrollLeft) / this.scrollW) * (this.scrollWinW - this.width);
        }
      },
      moveLeft (dis) {
        if (this.scrollLeft + dis > 0) {
          this.scrollLeft = 0;
          this.left = 0;
        } else {
          this.scrollLeft = this.scrollLeft + dis;
          this.left = (Math.abs(this.scrollLeft) / this.scrollW) * (this.scrollWinW - this.width);
        }
      },
      moveRight (dis) {
        if (Math.abs(this.scrollLeft - dis) > this.scrollW) {
          this.scrollLeft = -this.scrollW;
          this.left = this.scrollWinW - this.width;
        } else {
          this.scrollLeft = this.scrollLeft - dis;
          this.left = (Math.abs(this.scrollLeft) / this.scrollW) * (this.scrollWinW - this.width);
        }
      },
      startMoveX (e) {
        this.moveX = true;
        this.startX = e.clientX;
        this.startLeft = this.left;
      },
      startMoveY (e) {
        this.moveY = true;
        this.startY = e.clientY;
        this.startTop = this.top;
      },
      recalculate () {
        let {scrollWindow, scrollContent} = this.$refs;
        scrollContent = scrollContent.firstElementChild || scrollContent;
        const scrollWinH = scrollWindow.offsetHeight;
        const scrollWinW = scrollWindow.offsetWidth;
        const contentH = scrollContent.offsetHeight;
        const contentW = scrollContent.offsetWidth;
        const scrollH = contentH - scrollWinH;
        const scrollW = contentW - scrollWinW;
        const minHeight = this.barXMinHeight;
        const minWidth = this.barYMinWidth;
        const overflow = this.overflow;
        this.scrollH = scrollH;
        this.scrollW = scrollW;
        this.contentW = contentW;
        this.contentH = contentH;
        this.scrollWinH = scrollWinH;
        this.scrollWinW = scrollWinW;
        this.showScrollY = scrollH > 0 && (overflow !== 'hidden-y' && overflow !== 'hidden');
        this.showScrollX = scrollW > 0 && (overflow !== 'hidden-x' && overflow !== 'hidden');
        this.width = scrollWinW / ((scrollW / scrollWinW) + 1) < minWidth ? minWidth : scrollWinW / ((scrollW / scrollWinW) + 1);
        this.height = scrollWinH / ((scrollH / scrollWinH) + 1) < minHeight ? minHeight : scrollWinH / ((scrollH / scrollWinH) + 1);
      },
      bindEvents () {
        let { scrollWindow } = this.$refs;
        window.addEventListener('mouseup', () => {
          this.moveY = false;
          this.moveX = false;
        });
        window.addEventListener('mousemove', (e) => {
          if (this.moveY) {
            this.moveToY(e.clientY - this.startY);
          }
          if (this.moveX) {
            this.moveToX(e.clientX - this.startX);
          }
        });
        mouseWheel(scrollWindow, (dx, dy) => {
          this.scrollXY(dx, dy);
        });
      },
      handleResize (e) {
        this.recalculate();
      }
    },
    mounted () {
      this.recalculate();
      this.bindEvents();
      if (this.watchResize) {
        window.addEventListener('resize', this.handleResize);
      }
    },
    destroy () {
      window.removeEventListener('mouseup');
      window.removeEventListener('mousemove');
    },
    beforeDestroy () {
      if (this.watchResize) {
        window.removeEventListener('resize', this.handleResize);
      }
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
}
.left-track{
  position: absolute;
  z-index:1;
  width:5px;
  right: 0;
  top:0;
  bottom: 0px;
}
.bottom-track {
  position: absolute;
  z-index:1;
  left: 0;
  bottom:0;
  right: 0;
  height: 5px;
}
.vue-scroll-bar{
  padding: 0;
  border: none;
  display: block;
  border-radius: 2px;
  outline: none;
}
.left-bar{
  width:100%;
  background: #C0C0C0;
}
.bottom-bar {
  height: 100%;
  background: #C0C0C0;
}
.vue-scroll-animation{
  transition:margin-top 0.1s ease, margin-left 0.1s ease;
}
</style>
