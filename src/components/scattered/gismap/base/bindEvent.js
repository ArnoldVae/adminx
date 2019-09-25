import events from './event.js'
import { tokebabCase } from './utils.js'

export default function(instance, eventList) {
	const ev = eventList || events[tokebabCase(this.$options._componentTag)]
	const _this = this
	ev &&
		ev.forEach(event => {
			const hasOn = event.slice(0, 2) === 'on'
			const eventName = hasOn ? event.slice(2) : event
			const listener = _this.$listeners[eventName]
			listener && instance.addEventListener(event, listener.fns)
		})
}
