<template>
    <div class="" v-if="!loading">
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-carousel>
                        <v-carousel-item
                                v-for="(item,i) in promoProducts"
                                :key="i"
                                :src="item.imageSrc"
                                reverse-transition="fade-transition"
                                transition="fade-transition"
                                class="carousel--contain"
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout row class="">
                <v-flex xs12 sm6 md4 v-for="(product, i) in products" :key="i" class="cart">

                    <v-card class="" max-width="400">
                        <router-link :to="'/product/' + product.id">
                            <v-img class="white--text align-end" height="350px" :src="product.imageSrc">
                                <v-card-title>{{product.title}}</v-card-title>
                            </v-img>
                        </router-link>

                        <v-card-subtitle class="subheadingpb-0">{{product.description.substring(0,60)}}</v-card-subtitle>
                        <p class="subheading card_price"><span class="title">Цена: </span>{{product.price}}</p>
                        <v-card-actions>
                            <v-btn color="light-blue darken-4 product-desc" dark :to="'/product/' + product.id">Description</v-btn>
                            <app-buy-dialog :product="product"></app-buy-dialog>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
    <div class="" v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-center pt-5">
                    <v-progress-circular
                            :size="100"
                            :width="4"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        computed: {
            promoProducts() {
                return this.$store.getters.promoProducts
            },
            products() {
                return this.$store.getters.products
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style scoped>
    .cart{
        flex-basis: auto;
        margin-right: 30px;
    }
    .card_price{
        padding: 16px;
    }
    .product-desc{
        margin-right: 15px;
    }
</style>