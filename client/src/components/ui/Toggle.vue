<template id="sheep-toggle">  
  <label class="switch">
    <input type="checkbox" v-bind:id="id" v-bind:checked="value" v-on:change="onChange">
    <div class="switch-slider round"></div>
  </label>
</template>

<script>
export default {
	name: 'sheep-toggle',
	methods: {
    onChange: function(event) {
      if (event.type === 'keyup') {
		    this.$refs[this.id].checked = !this.$refs[this.id].checked;
	    }
      this.$emit('input', event.type === 'keyup' ? this.$refs[this.id].checked : event.target.checked);
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    }
  }
};
</script>

<style lang="scss" scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 32px;
    margin: 8px; 
    input {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }
    .switch-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #d0d0d0;
      -webkit-transition: .4s;
      transition: .4s;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.25);

      &:before {
        position: absolute;
        content: "";
        height: 24px;
        width: 24px;
        left: 6px;
        bottom: 4px;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.25);
        -webkit-transition: .4s;
        transition: .4s;
      }

      &.round {
        border-radius: 34px;
        &:before {
          border-radius: 50%;
        }
      }
    }
  }

  input:checked + .switch-slider {
    background-color: #bfd99c;
  }

  input:focus + .switch-slider {

  }    

  input:checked + .switch-slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }
</style>