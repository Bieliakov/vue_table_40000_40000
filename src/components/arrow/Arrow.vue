<template>
  <div class="arrow-container centrify-container"  @click="clickArrow">
    <div class="arrow" :class="arrowClass"></div>
  </div>
</template>

<script>
  export default {
    props: {
      // number in px
      size: {
        type: Number,
        required: true
      },
      direction: {
        type: String,
        validator: (value) => {
          return [
            'right',
            'up',
            'left',
            'down'
          ].indexOf(value) !== -1;
        },
        require: true
      }
    },
    computed: {
      arrowClass() {
        return 'is-arrow-' + this.direction;
      }
    },
    methods: {
      clickArrow() {
        this.$emit('clickedArrow');
      }
    }
  }
</script>

<style scoped>
  .arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    cursor: pointer;
  }

  .arrow-container {
    width: 100%;
    height: 100%;
  }

  .is-arrow-right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .is-arrow-left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .is-arrow-up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .is-arrow-down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
</style>
