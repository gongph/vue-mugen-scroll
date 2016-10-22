import throttle from 'lodash.throttle'
import inViewport from './in-viewport'

const triggers = ['scroll', 'resize', 'load']

const MugenScroll = {
  name: 'mugen-scroll',
  props: {
    handler: {
      type: Function,
      required: true
    },
    shouldHandle: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.checkInView()
  },
  methods: {
    checkInView() {
      this.check = throttle(() => {
        const inView = inViewport(this.$refs.scroll, this.threshold)
        if (this.shouldHandle && inView) {
          this.handler()
        }
      }, 200)

      triggers.forEach(event => window.addEventListener(event, this.check))
    }
  },
  render(h) {
    return h('div', {
      staticClass: 'mugen-scroll',
      ref: 'scroll'
    }, this.$slots.default)
  },
  beforeDestory() {
    triggers.forEach(event => window.removeEventListener(event, this.check))
  }
}

export default MugenScroll