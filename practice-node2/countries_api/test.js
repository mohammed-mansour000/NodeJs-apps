fetch('https://restcountries.eu/rest/v2/all')
.then(response => response.json())
.then(json => {
    for (let index = 0; index < json.length; index++) {
       
        var x = document.createElement('div');
        x.className = "col-lg-3 col-md-4 col-sm-6 col-12 edit";
        var content = 
        `<div class="card">
                <img class="card-img-top img-fluid" src="` + json[index].flag +`" alt="Card image">
                <div class="card-body">
                    <h4 class="card-title">`+ json[index].name +`</h4>
                    <p class="card-text">` + json[index].population +`</p>
                    <a href="#" class="btn btn-primary">See Country</a>
                </div>
        </div>`;
        x.innerHTML = content;
        
        
        document.getElementById('myul').appendChild(x);

        
    }
});
