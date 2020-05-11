<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary md-3">Create New Product</h1>
                <v-form ref="form" class="mb-3"
                        v-model="valid"
                        :lazy-validation="true">
                    <v-text-field
                            label="title"
                            name="title"
                            type="text"
                            aria-required="true"
                            :rules="[v => !!v || 'Title is required']"
                            v-model="title"
                    />

                    <v-text-field
                            label="vendor Product"
                            name="vendor"
                            type="text"
                            v-model="vendor"
                    />
                    <v-text-field
                            label="color Product"
                            name="color"
                            type="text"
                            v-model="color"
                    />
                    <v-text-field
                            label="Material Product"
                            name="material"
                            type="text"
                            v-model="material"
                    />
                    <v-text-field
                            label="Price Product"
                            name="price"
                            type="text"
                            aria-required="true"
                            :rules="[v => !!v || 'Price is required']"
                            v-model="price"
                    />
                    <v-text-field
                            label="Description Product"
                            name="description"
                            type="text"
                            multi-line
                            v-model="description"
                    />
                </v-form>
                <v-layout row class="mb-3">
                    <v-flex xs12>
                        <v-btn class="warning" @click="upload">
                            Upload
                            <v-icon right dark>cloud_upload</v-icon>
                        </v-btn>
                        <input ref="fileInput" @change="onFileChange" type="file" style="display: none;" accept="image/*">
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <img :src="imageSrc" height="200px" alt="" >
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-switch color="primary" v-model="promo" class="ma-2" label="Add to Promo?"></v-switch>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn class="success"
                               @click="createProduct"
                               :loading="loading"
                               :disabled="!valid || !image || loading">Create Product</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                vendor: '',
                color: '',
                material: '',
                price: 0,
                description: '',
                promo: false,
                valid: false,
                image: null,
                imageSrc: ''
            }
        },
        computed: {
            loading() {
                return this.$store.getters.loading
            }
        },
        methods:{
            createProduct() {
                if (this.$refs.form.validate() && this.image) {
                    const product = {
                        title: this.title,
                        vendor: this.vendor,
                        color: this.color,
                        material: this.material,
                        price: this.price,
                        description: this.description,
                        promo: this.promo,
                        image: this.image
                    };

                    this.$store.dispatch('createProduct', product)
                        .then(() => {
                            this.$router.push('/list')
                        }).catch(() => {})
                }
            },
            upload() {
                this.$refs.fileInput.click()
            },
            onFileChange(event) {
                const file = event.target.files[0];
                const reader = new FileReader();

                console.log('reader',reader);
                reader.onload = () => {
                    this.imageSrc = reader.result
                };
                reader.readAsDataURL(file);
                this.image = file
            }
        }
    }
</script>

<style scoped>

</style>