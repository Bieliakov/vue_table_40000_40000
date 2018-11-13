export default {
  props: {
    parentRefs: {
      type: Object,
      validator: function (value) {
        if (value.scrollEventContainer) {
          return value.scrollEventContainer instanceof HTMLElement;
        }
        return true;
      },
      required: true
    },
    depthSize: {
      type: Number,
      required: true
    },
    mainSize: {
      type: Number,
      requied: true
    },
    positions: {
      type: Object,
      default: () => ({
        previous: {
          percentage: 0,
          pixels: 0
        },
        current: {
          percentage: 0,
          pixels: 0
        }
      })
    }
  },
  data() {
    return {
      initialPositionRelative: 0,
    }
  },
  computed: {
    arrowBlockSizeStyles() {
      return {
        height: this.depthSize + 'px',
        width: this.depthSize + 'px'
      }
    },
    scrollBlockSize() {
      // TODO: change it to be relative to full table cells dimentions with handling of edge cases
      // now it is a contant - not like native scrollbar width
      return this.depthSize * 3;
    },
    scrollAreaLength() {
      return this.mainSize - 2 * this.depthSize;
    },
    widthWithoutScroll() {
      return this.scrollAreaLength - this.scrollBlockSize;
    },
  },
  methods: {
    onDragStart(mdEvent, direction = 'X') {
      const eventClientPropertyName = 'client' + direction;

      const container = this.parentRefs.scrollEventContainer;

      if (!this.initialPositionRelative) {
        this.initialPositionRelative = mdEvent[eventClientPropertyName];
      }

      const mouseMoveListener = (mvEvent) => {
        this.positions.previous = this.positions.current;

        const currentDifference = mvEvent[eventClientPropertyName] - this.initialPositionRelative;
        let currentPositionInPixels;
        if (currentDifference < this.widthWithoutScroll
          && currentDifference > 0) {
          currentPositionInPixels = currentDifference;
        } else if (currentDifference > this.widthWithoutScroll) {
          currentPositionInPixels = this.widthWithoutScroll;
        } else {
          currentPositionInPixels = 0;
        }
        this.scrollStylePosition = currentPositionInPixels + 'px';

        this.positions.current = {
          pixels: currentPositionInPixels,
          percentage: currentPositionInPixels / this.widthWithoutScroll * 100
        };

        this.$emit('positionUpdated', this.positions);
      };

      const mouseUpListener = () => {
        container.removeEventListener('mouseup', mouseUpListener);
        container.removeEventListener('mousemove', mouseMoveListener );
      };

      container.addEventListener('mousemove', mouseMoveListener);
      container.addEventListener('mouseup', mouseUpListener);
    }
  }
}
