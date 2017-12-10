<template>
	<label v-bind:for="id" tabindex="0" v-on:keyup.enter="onChange">
		<div class="sheep-toggle" v-bind:class="isDisabled" v-bind:style="toggleStyle.containerStyle">
			<div class="sheep-toggle-circle" v-bind:style="toggleStyle.circleStyle">
			</div>
		</div>
		<input v-bind:ref="id" type="checkbox" v-bind:id="id" v-bind:checked="value"
			v-on:change="onChange" v-bind:disabled="isDisabled.disabled" hidden />
	</label>
</template>

<script>

function onChange(event) {
	if (event.type === 'keyup') {
		this.$refs[this.id].checked = !this.$refs[this.id].checked;
	}
	this.$emit('input', event.type === 'keyup' ? this.$refs[this.id].checked : event.target.checked);
}

function isDisabled() {
	return { disabled: this.$attrs.disabled };
}

function toggleStyle() {
	const widthParent = this.width;
	const heightParent = this.height;
	const widthCircle = this.height - 6;
	const heightCircle = this.height - 6;
	const translateX = this.value ? 3 : ((widthParent - widthCircle) - 3);
	const containerStyle = {
		'background-color': this.value ? this.activeColor : this.inactiveColor,
		height: `${heightParent}px`,
		width: `${widthParent}px`,
	};
	const circleStyle = {
		height: `${heightCircle}px`,
		transform: `translateX(${translateX}px)`,
		width: `${widthCircle}px`,
	};
	return { containerStyle, circleStyle };
}

export default {
	name: 'sheep-toggle',
	computed: {
		isDisabled,
		toggleStyle,
	},
	methods: {
		onChange,
	},
	props: {
		activeColor: {
			type: String,
			default: '#30d126',
		},
		colorGradient: {
			type: Boolean,
			default: false,
		},
		height: {
			type: Number,
			default: 38.4,
		},
		inactiveColor: {
			type: String,
			default: '#ff3333',
		},
		id: {
			type: [String, Number],
			required: true,
		},
		value: {
			type: Boolean,
			default: false,
		},
		width: {
			type: Number,
			default: 107.5,
		},
	},
};
</script>

<style lang="scss" scoped>
	.sheep-toggle-container {
		display: inline-block;
	}
	.sheep-toggle {
  		border: solid 0.5px #d9d9d9;
  		border-radius: 100px;
		cursor: pointer;
		display: inline-block;
  		height: 38.4px;
		position: relative;
		transition: background-color 0.2s ease-in-out;
  		width: 107.5px;

		&.disabled {
			cursor: not-allowed;
			opacity: 0.4;
		}

		&.inactive {
			background-color: #ff3333;
		}

		.sheep-toggle-circle {
			background-color: #fff;
			border-radius: 50%;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
			position: absolute;
			margin-top: 3px;
			transition: transform 0.2s cubic-bezier(0,0,.2,1);
		}
	}
</style>