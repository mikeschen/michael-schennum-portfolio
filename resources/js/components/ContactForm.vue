<template>
	<div>
        <form class="Form" @submit.prevent="onSubmit">
            <slot></slot>
            <div class="buttons-group">
                <button class="btn btn-white" :class="{'btn-disabled': waiting}"><i v-if="waiting" class="icon-refresh spinning"></i> {{sendMessage}}</button>
            </div>
        </form>
        <transition name="slide-fade">
                <div v-if="success" class="Form__success">
                    {{success}}
                </div>
        </transition>
        <transition name="slide-fade">
                <div v-if="serverError" class="Form__error">
                    {{serverError}}
                </div>
        </transition>
    </div>
</template>

<script>
	export default{
		data() {
			return{
				sendMessage: Config.translations.sendMessage,
                values: {},
                success: false,
                waiting: false,
                serverError: false
			}
		},


        methods: {
            onSubmit() {
                if( this.waiting == false ){
                    this.waiting = true;
                    this.success = false;
                    this.serverError = false;
                    axios.post(Config.contactForm.mailScriptLocation, this.values)
                        .then(response => {
                            this.success = Config.contactForm.successMessage;
                            this.waiting = false;
                        })
                        .catch(error => {
                            this.assignErrors(error.response.data);
                            this.waiting = false;
                        })
                }
            },
            assignErrors(errors) {
                if( errors.server_error ) {
                    this.serverError = errors.server_error;
                } else {
                    Event.fire('contact-form-error', errors);
                }
            },
        }
	}
</script>

<style lang="scss" scoped>
.Form{
    .btn{
        i{
            margin-right: 10px;
            font-size: 1.2em;
        }
    }
}

</style>