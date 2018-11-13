<template>
  <div class="scroller-container"
       :style="containerSizeStyles">
    <app-arrow :size="depthSize" direction="up" :style="arrowBlockSizeStyles"></app-arrow>

    <div class="scroller-container-central ">
      <!-- prevent modificator for preventing unwanted selection -->
      <div class="scroll"
           :style="scrollStyles"
           @mousedown.prevent="onDragStart($event, 'Y')"></div>
    </div>

    <app-arrow :size="depthSize" direction="down" :style="arrowBlockSizeStyles"></app-arrow>
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
        scrollProperty: 'top'
      }
    },
    computed: {
      containerSizeStyles() {
        return {
          height: this.mainSize + 'px',
          width: this.depthSize + 'px'
        }
      },

      scrollStyles() {
        const scrollStyle = {
          height: this.scrollBlockSize + 'px'
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
    top: 0;
    right: 0;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
  }

  .scroller-container-central {
    height: 100%;
    position: relative;
  }

  .scroll {
    width: 100%;
    background-color: #c9c9c9;
    position: absolute;
    top: 0;
  }
</style>
