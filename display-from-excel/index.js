fetch(' https://read-from-excel.herokuapp.com/') 
.then(response => response.json())
.then(json => {
   /*  json.forEach(element => {
        var x = document.createElement('li');
        x.innerHTML = element.name;
        document.getElementById('tr').appendChild(x);
    }); */
    for (let index = 0; index < json.length; index++) {
   
        var tr = document.createElement('tr');
        //var td = document.createElement('td');
        var content = 
                    `
                        <td>`+ json[index].Rendering_engine +`</td>
                        <td>`+ json[index].Browser +`</td>                    
                        <td>`+ json[index].Platform +`</td>                    
                        <td>`+ json[index].Engine_version +`</td>
                        <td>`+ json[index].CSS_grade +`</td>
                    `;
        tr.innerHTML = content;
        
        
        document.getElementById('mytable').appendChild(tr);

   
}

})