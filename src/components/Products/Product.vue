<template>
    <v-container>
       <section class="product mt-3 elevation-10" v-if="!loading">
           <v-layout row wrap>
               <v-flex xs12 lg6>
                   <img :src="product.imageSrc" class="product_img" alt="">
               </v-flex>
               <v-flex xs12 lg6>
                   <div class="product-info">
                       <h5 class="product_title display-1 mb-3 mt-3">{{product.title}}</h5>
                       <p class="product_category title">
                           <span class="product_title">Vendor: </span>{{product.vendor.charAt(0).toUpperCase() + product.vendor.substr(1)}}
                       </p>
                       <p class="product_price title">
                           <span class="product_title">Price: </span>$ {{product.price}}
                       </p>
                       <p class="product_color title">
                           <span class="product_title">Color: </span>
                           <span
                                   :title="product.color"
                                   :style="{backgroundColor: product.color}" class="product_color__bg"></span>
                       </p>
                       <p class="title">
                            <span class="product_title">Material:</span> {{product.material.charAt(0).toUpperCase() + product.material.substr(1)}}
                       </p>
                       <div class="title mb-5">
                           <p class="product_title mb-2">Description </p> {{product.description}}
                       </div>
                       <app-edit-product :product="product" v-if="isOwner"></app-edit-product>
                       <app-buy-dialog :product="product"></app-buy-dialog>
                   </div>
               </v-flex>
           </v-layout>
       </section>
        <section v-else class="text-center">
            <v-progress-circular
                    :size="100"
                    :width="4"
                    color="purple"
                    indeterminate
            ></v-progress-circular>
        </section>
    </v-container>
</template>

<script>
    import fb from 'firebase'
    import EditProduct from './EditProduct'
    export default {
        props:['id'],
        computed: {
            product() {
                const id = this.id;
                return this.$store.getters.productById(id)
            },
            loading() {
                return this.$store.getters.loading
            },
            isOwner() {
                if (this.$store.getters.isUserLoggedIn) {
                    return this.product.ownerId === fb.auth().currentUser.uid;
                } else {
                    return null
                }
            }
        },
        components: {
            appEditProduct: EditProduct
        }
    }
</script>

<style scoped>
    .product{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border: 1px solid #1c771d;
        padding: 30px;
        margin-bottom: 100px;
    }
    .product_img{
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
    }
    .product-info{
        margin-left: 50px;
    }
    .product_title{
        font-size: 1.6rem;
        font-weight: bold;
        color: #1855d0;
        margin-bottom: 0;
    }
    .product_price{
        color: red;
    }
    .product_color__bg{
        display: inline-block;
        width: 50px;
        height: 20px;
        border: 1px solid #2b2b2b;
        border-radius: 10px;
    }
    @media screen and (max-width: 380px){
        .product-info{
            margin-left: 0;
        }
    }
</style>