document.addEventListener('alpine:init', () => {
    Alpine.data('pizzaCartWithAPIWidget', function(){
        return {
            init(){

                //alert('Pizza cart loading...')
                //Call the API to get all the pizzas
                //set this.pizzas

                axios
                    .get('https://pizza-cart-api.herokuapp.com/api/pizzas')
                    .then((result)=>{
                    this.pizzas=result.data.pizzas;
                })
                .then(()=>{
                    return this.createCart();
                    
                })
                .then((result)=>{
                    //console.log(result.data);
                    this.cartId=result.data.cart_code
                })
            },

            createCart(){
                    /*return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
                        .then((result)=>{
                        this.cartId=result.data.cart_code
                    })*/
            },

            showCart(){
                const url=`https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;
                axios
                    .get(url)
                    .then((result)=>{
                        this.cart= result.data;
                    });
            },


            message: 'Eating pizzas',
            username: 'Prince',
            pizzas:[],
            cartId:'gY6sn1yAMv',
            cart:{total:0},

            add(pizza){
                //to be able to add a pizza to the cart I need a cart Id

                const params={
                    cart_code: this.cartId,
                    pizza_id:pizza.id,
                }

                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/add', params)
                    .then(()=> {
                        this.message="Pizza added to the cart"
                        this.showCart();
                    }
                    )
                    .catch(err=> alert(err));
                //alert(pizza.id)
                //alert(JSON.stringify(pizza))
                //alert(this.pizza.flavour+' '+this.pizza.size+' pizza bought')
            },

            remove(pizza){
                //to be able to add a pizza to the cart I need a cart Id

                const params={
                    cart_code: this.cartId,
                    pizza_id:pizza.id,
                }

                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/remove', params)
                    .then(()=> {
                        this.message="Pizza removed from the cart"
                        this.showCart();
                    }
                    )
                    .catch(err=> alert(err));
                //alert(pizza.id)
                //alert(JSON.stringify(pizza))
                //alert(this.pizza.flavour+' '+this.pizza.size+' pizza bought')
            },
        }

    }); 
})