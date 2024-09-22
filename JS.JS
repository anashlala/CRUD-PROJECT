let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let count = document.getElementById('count');
let create = document.getElementById('create');


let mood = "create";
let globali;

//get totla price

function gettotal(){
    if(price.value != ''){

        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.innerHTML = '';
        total.style.background = 'darkturquoise';
    }
} 


//create product
let productsaver;

if(localStorage.products != null){
    productsaver = JSON.parse(localStorage.products);
}else{
    productsaver =[];
}

create.onclick = function(){
    let newobject = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        category: category.value,
        total: total.innerHTML,
    }

if(mood === "create")
{
    let productCount = parseInt(count.value);

    for(let i = 0; i < productCount ; i++){
    productsaver.push(newobject);
    }

}else
{
    productsaver[  globali  ] = newobject;
    mood = "create";
    create.innerHTML = "create";
    create.style.background = "darkturquoise";
    count.style.display="block";
}


localStorage.setItem('products' , JSON.stringify(productsaver));
    
clear();
showdata();
deleteall();

}



// clear data

function clear(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value ='';
    category.value = '';
    count.value = '';
    total.innerHTML = '';
}

// raed data

function showdata(){

    let table = '';
    for(let i=0; i < productsaver.length ; i++){
        table += 
        
        `
                     <tr>
                        <td>${[i]}</td>
                        <td>${productsaver[i].title}</th>
                        <td>${productsaver[i].price}</th>
                        <td>${productsaver[i].taxes}</th>
                        <td>${productsaver[i].ads}</th>
                        <td>${productsaver[i].discount}</th>
                        <td>${productsaver[i].category}</th>
                        <td>${productsaver[i].total}</td>    
                        <td><button onclick="uodatedata(${i})" id="Update">Update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
}
showdata();



// delete data

function deletedata(i){
    productsaver.splice(i,1);
    localStorage.products = JSON.stringify(productsaver);
    showdata();
    deleteall()
}


// Delete All

function deleteall(){
let deleteall = document.getElementById('deleteall');
if(productsaver.length === 0){
    deleteall.classList.add('removeall');
}else{
    deleteall.classList.remove('removeall');
    showdata();
}
}
deleteall()

function deletesllfucntion(){
    localStorage.clear();
    productsaver.splice(0);
    showdata();
    deleteall();
}


//Update:

function uodatedata(i){
    title.value = productsaver[i].title;
    price.value = productsaver[i].price;
    taxes.value = productsaver[i].taxes;
    ads.value = productsaver[i].ads;
    discount.value = productsaver[i].discount;
    category.value = productsaver[i].category;
    gettotal();
    count.style.display = 'none';
    create.innerHTML = "Update";
    create.style.background = "green";
    mood = "update";
    scroll({
        top: 0,
        behavior: "smooth"
    })


    globali = i;
}
