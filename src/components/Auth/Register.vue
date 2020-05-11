<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="6"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>Registration form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form"
                                v-model="valid"
                                :lazy-validation="true">
                            <v-text-field
                                    label="email"
                                    name="email"
                                    prepend-icon="person"
                                    type="email"
                                    :rules="emailRules"
                                    v-model="email"
                            />

                            <v-text-field
                                    label="Password"
                                    name="password"
                                    prepend-icon="lock"
                                    :counter="6"
                                    type="password"
                                    :rules="passwordRules"
                                    v-model="password"
                            />
                            <v-text-field
                                    label="Confirm Password"
                                    name="confirm-password"
                                    prepend-icon="repeat"
                                    :counter="6"
                                    type="password"
                                    :rules="confirmPasswordRules"
                                    v-model="confirmPassword"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn @click="onSubmit" :loading="loading" :disabled="!valid || loading" color="primary">Create account</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import { rulesMixin } from "../../mixins";
    export default {
        mixins:[rulesMixin],
        data() {
            return {
                email:'',
                password: '',
                confirmPassword:'',
                valid: false
            }
        },
        methods:{
            onSubmit() {
                if (this.$refs.form.validate()) {
                    const user = {
                        email: this.email,
                        password: this.password
                    };

                    this.$store.dispatch('registerUser', user)
                        .then(() => {
                            this.$router.push('/')
                        })
                        .catch(() => {})
                }
            }
        },
        computed: {
            loading(){
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>

</style>