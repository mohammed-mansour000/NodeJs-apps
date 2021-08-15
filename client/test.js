fetch('https://mohammad-mansour.herokuapp.com/') 
.then(response => response.json())
.then(json => {
   /*  json.forEach(element => {
        var x = document.createElement('li');
        x.innerHTML = element.name;
        document.getElementById('tr').appendChild(x);
    }); */
    for (let index = 0; index < json.length; index++) {
   
        var x = document.createElement('div');
        x.className = "col-lg-3 col-md-4 col-sm-6 col-12 edit";
        var content = 
        `<div class="card">
                <img class="card-img-top img-fluid" src="` + json[index].image +`" alt="Card image">
                <div class="card-body">
                    <h3 class="card-title">`+ json[index].name +`</h3>
                    <p class="card-text"><span>created by: </span> ` + json[index].creater +`</p>
                    <p class="card-text"><span>date of release: </span>` + json[index].date_of_release +`</p>
                    <a href="` + json[index].site +  `" class="btn btn-info">See More</a>
                </div>
        </div>`;
        x.innerHTML = content;
        
        
        document.getElementById('myul').appendChild(x);

   
}

})