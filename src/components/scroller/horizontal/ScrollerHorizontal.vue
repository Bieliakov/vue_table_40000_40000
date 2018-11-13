<template>
  <div class="scroller-container"
       :style="containerSizeStyles">
      <app-arrow  :style="arrowBlockSizeStyles"
                  :size="depthSize"
                  direction="left">
      </app-arrow>

      <div class="scroller-container-central ">
        <!-- prevent modificator for preventing unwanted selection -->
        <div class="scroll"
             :style="scrollStyles"
             @mousedown.prevent="onDragStart($event, 'X')"></div>
      </div>

      <app-arrow :style="arrowBlockSizeStyles"
                 :size="depthSize"
                 direction="right" >
      </app-arrow>
    </div>
</template>

<script>
  import scrollerMixin from '../scrollerMixin';

  export default {
    mixins: [
      scrollerMixin
    ],
    data() {
      return {
        // style property value that will be changed during scrolling
        scrollStylePosition: 0,
        // style property that will be changed during scrolling
        scrollProperty: 'left'
      }
    },
    computed: {
      containerSizeStyles() {
        return {
          width: this.mainSize + 'px',
          height: this.depthSize + 'px'
        }
      },
      scrollStyles() {
        const scrollStyle = {
          width: this.scrollBlockSize + 'px'
        };
        scrollStyle[this.scrollProperty] = this.scrollStylePosition || 0;
        return scrollStyle;
      }
    }

  }
</script>

<style scoped>
  .scroller-container {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
    display: inline-flex;
  }

  .scroller-container-central {
    width: 100%;
    position: relative;
  }

  .scroll {
    height: 100%;
    background-color: #c9c9c9;
    position: absolute;
    top: 0;
  }
</style>
