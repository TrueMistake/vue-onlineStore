<template>
    <div class="">
        <v-navigation-drawer app temporary v-model="sideNav">
            <v-list tag="ul">
                <v-list-item v-for="(link, i) in links" :key="i" :to="link.url">
                    <v-list-item-icon>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="link.title"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="onLogout" v-if="isUserLoggedIn">
                    <v-list-item-icon>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="'Logout'"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-card>
            <v-toolbar dark color="primary">
                <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-md-and-up"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link to="/"><span class="logo">Online Store</span></router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn dark depressed color="primary" v-for="(link, i) in links" :key="i" :to="link.url">
                        <v-icon left>{{link.icon}}</v-icon>
                        {{link.title}}
                    </v-btn>
                    <v-btn  dark depressed color="primary" @click="onLogout" v-if="isUserLoggedIn">
                        <v-icon left>exit_to_app</v-icon>
                        onLogout
                    </v-btn>
                </v-toolbar-items>

            </v-toolbar>
        </v-card>
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                sideNav: false
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logoutUser');
                this.$router.push('/')
            }
        },
        computed: {
            isUserLoggedIn() {
                return this.$store.getters.isUserLoggedIn
            },
            links() {
                if (this.isUserLoggedIn) {
                    return [
                        {title:'Cart', icon:'shopping_cart',url:'/checkout'},
                        {title:'New Product', icon:'add',url:'/new'},
                        {title:'My Products', icon:'account_box',url:'/list'}
                    ]
                }
                return [
                    {title:'Login', icon:'account_box',url:'/login'},
                    {title:'Register', icon:'face',url:'/register'}
                ]
            }
        }
    }
</script>

<style scoped>
    .logo{
        color: #fff;
    }
</style>