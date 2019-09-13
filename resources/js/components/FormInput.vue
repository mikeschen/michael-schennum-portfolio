<template>
    <div class="Form__input-container">
	<div class="Form__group" :class="{'Form--filled': notEmpty, 'Form--error': errors}">
        <textarea v-if="type == 'textarea'" :id="formId" type="text"  class="Form__control" :name="name" v-model="value" @keydown="clearErrros"></textarea>
        <input v-else :id="formId" type="text"  class="Form__control" :name="name" v-model="value" @keydown="clearErrros">
        <label class="Form__label" :for="formId">{{label}}</label>
        </div>
        <transition name="slide-fade">
             <ul v-if="errors" class="Form__errors">
                    <li v-for="error in errors">{{error}}</li>
            </ul>
        </transition>
    </div>
</template>

<script>
	export default{
		props: ['name', 'label', 'type'],

		data() {
			return{
				value: '',
				focus: false,
                errors: false
			}
		},

        watch: {
            value() {
                this.syncWithParent();
            }
        },

		mounted() {
			this.syncWithParent();
            Event.listen('contact-form-error', (errors) => this.handleErrors(errors));
		},

		computed: {
			formId() {
				return 'form-' + this.name;
			},
			notEmpty() {
				return this.focus || this.value.length > 0;
			}
		},	

		methods: {
			syncWithParent() {
				this.$parent.values[this.name] = this.value;
			},
            handleErrors(errors) {
                if( errors[this.name] ) {
                    this.errors = errors[this.name];
                   // this.value = ''
                }
            },
            clearErrros() {
                this.errors = false;
            }
		}
	}
</script>

<style lang="scss" scoped>
	.Form {
    &__input-container{
         margin-bottom: 20px;
    }
    &__group {
        position: relative;
        overflow: hidden;
        padding-top: 0.6em;
        &:hover, &:focus, &.Form--filled {
            .Form__label {
                top: 0em;
                font-size: 0.6em;
            }
        }
        textarea{
        	min-height: 150px;
        }
    }
    &__control {
        width: 100%;
        background: transparent;
        border: none;
        padding: 0.5em 1em 0.2em 1em;
        font-size: 1em;
        &:focus {outline: none;
			+ .Form__label{
				top: 0em;
                font-size: 0.6em;
			}
    	}

    }
    &__label {
        transition: 0.3s ease-in-out;
        position: absolute;
        top: 1.4em;
        left: 0;
        font-size: 0.8em;
        margin: 0px;
        margin-left: 1em;
        font-weight: normal;
    }
    &__errors{
        font-size: 0.6em;
        padding-left: 15px;
        color: red;
        list-style-type: none;
        margin-top: 4px;
    }
}
</style>