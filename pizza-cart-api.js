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
                    return axios
                    .get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
                })
                .then((result)=>{
                    console.log(result.data);
                    this.cartId=result.data.cart_code
                })
            },

            createCart(){
                    return axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/create?username=' + this.username)
                        .then((result)=>{
                        this.cartId=result.data.cart_code
                    })
            },

            message: 'Eating pizzas',
            username: 'Prince',
            pizzas:[],
            cartId:'',
            buy(pizza){
                //to be able to add a pizza to the cart I need a cart Id

                alert(pizza.id)
                alert(JSON.stringify(pizza))
                //alert(this.pizza.flavour+' '+this.pizza.size+' pizza bought')
            },
        }

    }); 
})