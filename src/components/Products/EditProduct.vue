<template>
    <v-dialog
            v-model="dialog"
            width="400px"
    >
        <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" class="light-blue darken-4 mr-2">EDIT</v-btn>
        </template>
        <v-card>
            <v-container>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-title>
                            <h1>Edit Product</h1>
                        </v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    label="title"
                                    name="title"
                                    type="text"
                                    v-model="editedTitle"
                            />
                            <v-text-field
                                    label="descriptions"
                                    name="descriptions"
                                    type="text"
                                    multi-line
                                    v-model="editedDescriptions"
                            />
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn dark color="light-blue darken-4" outlined @click="onCancel">Cancel</v-btn>
                            <v-btn dark color="light-blue darken-4" @click="onSave">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:['product'],
        data() {
            return{
                dialog: false,
                editedTitle: this.product.title,
                editedDescriptions: this.product.description
            }
        },
        methods: {
            onCancel() {
                this.editedTitle = this.product.title;
                this.editedDescriptions = this.product.description;
                this.dialog = false;
            },
            onSave() {
                if (this.editedTitle !== '' && this.editedDescriptions !== '') {
                    this.$store.dispatch('updateProduct',{
                        title: this.editedTitle,
                        description: this.editedDescriptions,
                        id: this.product.id
                    });
                    this.dialog = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>