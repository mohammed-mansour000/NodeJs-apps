fetch(' https://al-saadi-coffe.herokuapp.com/') 
.then(response => response.json())
.then(json => {
   /*  json.forEach(element => {
        var x = document.createElement('li');
        x.innerHTML = element.name;
        document.getElementById('tr').appendChild(x);
    }); */
    for (let index = 0; index < json.length; index++) {
   
        var p = document.createElement('p');
        //var td = document.createElement('td');
        var content = 
                    
                        json[index].arabic_instructions
                      
                    ;
        p.innerHTML = content;
        
        
        document.getElementById('ar-inst').appendChild(p);

   
}

})