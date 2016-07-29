import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  private url = 'http://jsonplaceholder.typicode.com/posts'

  //posts: Observable<any>;
  posts: Promise<any>;

  real_posts;

  constructor (private http: Http) {
  };

  ngOnInit() {
      console.log(`La url es esta ${this.url}`);

      // -- WITH OBSERVABLES --
      //this.posts = this.http.get(this.url)
                            //.map(this.extractData);

      //this.posts.subscribe(data => this.real_posts = data);

      // -- WITH PROMISES --
      this.posts = this.http.get(this.url)
                            .toPromise()
                            .then(this.extractData);

      this.posts.then(data => this.real_posts = data);
  }

  private extractData(res: Response) {
      let body = res.json();
      //return body.data || { };
      return body;
  }
}
