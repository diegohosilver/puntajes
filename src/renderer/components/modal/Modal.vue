<template>

    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" :class="modalClasses" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"></slot>
                    <button type="button" class="close" aria-label="Close" @click="$emit('close')">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>

</template>
<script>

export default {

    props: {

        size: undefined,

        isScrollable: undefined
    },

    computed: {

        modalClasses() {

            return {
                'modal-sm': this.size == 'sm',
                'modal-lg': this.size == 'lg',
                'modal-xl': this.size == 'xl',
                'modal-dialog-scrollable': this.isScrollable    
            }
        },
    }
}

</script>
<style lang="scss">

    .invalid-feedback, 
    .valid-feedback {
        display: block !important;
    }

    .modal {
        background: linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) );
        display: block !important;
    }

</style>