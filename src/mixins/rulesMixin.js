export default {
    data() {
        return {
            email:'',
            password: '',
            confirmPassword:'',
        }
    },
    computed: {
        emailRules() {
            return [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
        },
        passwordRules() {
            return [
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || 'Password must be equal or than 6 characters'
            ]
        },
        confirmPasswordRules() {
            return [
                v => !!v || 'Password is required',
                v => v === this.password || 'Password should match'
            ]
        }
    }
}
