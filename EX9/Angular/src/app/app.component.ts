import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';

  constructor(private http: HttpClient) {
  }

  onSubmit(data: any) {
    this.http.post('http://localhost:3000/user', data)
      .subscribe((result: any) => {
        console.log(result)
      })
    //console.warn(data)
  }
}


