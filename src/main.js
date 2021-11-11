const baseUrl = "http://localhost:5000/api/items/";

const app = Vue.createApp({
    data() {
        return {
            item: {
                "id": 1,
                "name": "New Item",
                "productQuality": 1,
                "quantity": 1
                } ,
                items: [],
                itemId: 0,
                message: null,
                itemName: null       
        }
    },
    created (){
        this.getAllItems()
    },
    computed: {

    },
    methods: {
        getAllItems: function() {
            axios.get(baseUrl)
            .then(response=>{
                console.log(response.status)
                console.log(response.data)
                this.items=response.data
            })
            .catch(function(error){
                console.log(error)
            })
        },
        getItemById: function() {
            axios.get(baseUrl + this.itemId)
            .then(response=>{
                console.log(response.status)
                this.items = []
                this.items.push(response.data)
            })
            .catch(function(error){
                console.log(error)
            })
        },
        deleteItemById: function(){
            axios.delete(baseUrl + this.itemId)
            .then(response=> {
                console.log(response.status)
                if (response.status == 200){
                    this.message = "Item deleted"
                    this.getAllItems()
                    document.getElementById("message").setAttribute("class", "text-success")
                } else {
                    this.message = "There was an error"
                    document.getElementById("message").setAttribute("class", "text-success")
                }
            })
            .catch(function(error){
                console.log(error)
                this.message = "There was an error"
                console.log(this.message)
                document.getElementById("message").setAttribute("class", "text-success")

            })
        },
        addItem: function () {
            axios.post(baseUrl, this.item)
            .then(response => {
                console.log(response.status)
                if (response.status == 201){
                    this.message = "Item added"
                    this.getAllItems()
                    document.getElementById("message").setAttribute("class", "text-success")

                }
            })
            .catch(function(error){
                console.log(error)
            })
        },
        selectItem:function (index) {
            this.item = this.items[index]
        },
        updateItem: function () {
            axios.put(baseUrl + this.item.id, this.item)
            .then(response=> {
                console.log(response.status)
                this.getAllItems()
                this.message = "Item updated"
                document.getElementById("message").setAttribute("class", "text-success")
                
            })
            .catch(function(error){
                console.log(error)
            })
        },
        getItemByName: function () {
            axios.get(baseUrl + "filter?name=" + this.itemName )
            .then(response=> {
                console.log(response.status)
                console.log(response.data)
                this.items = []
                for(let i = 0; i < response.data.length; i++){
                    this.items.push(response.data[i])
                }
                
            })
            .catch(function(error){
                console.log(error)
            })
        }
                
    }
        
    
});

// mount the app.
const vm = app.mount('#app');