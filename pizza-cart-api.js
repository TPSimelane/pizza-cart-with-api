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

            payCart(){

                const url = `https://pizza-cart-api.herokuapp.com/api/pizza-cart/${this.cartId}/get`;
      
                axios
                    .get(url)
                    .then((result) => {
                      this.cart = result.data.total;
                    });
      
              },

            activeCart(){
                return
                axios.get('https://pizza-cart-api.herokuapp.com/api/pizza-cart/username/:username/active')
              },

            message: 'Eating pizzas',
            username: 'Prince',
            pizzas:[],
            cartId:'RmPklbymA2',
            cart:{total:0},
            payNow: false,
            paymentAmount: 0.00,
            paymentMessage:'',
            display: true,            

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

            pay(pizza){

                const params = {
                  cart_code: this.cartId,
                }
                
                axios
                    .post('https://pizza-cart-api.herokuapp.com/api/pizza-cart/pay', params)
                    .then(() => {
                      if(!this.paymentAmount){
                        this.paymentMessage = 'No amount entered!'
                    }  
                   else if(this.paymentAmount >= this.cart.total ) {
                        this.paymentMessage = 'Payment successful!'
          
                        setTimeout(() => {
                          this.payNow = false;
                          this.cart.total= 0;
                          this.userName="";
                          this.display=false;
                          this.cart=[];
                     },3000);
          
          
                    } else {
                        this.paymentMessage = 'Insufficient amount!'
                    }  
                    
                     
                    } )
                    //.catch(err => alert(err));
          
            },
        }

    }); 
})