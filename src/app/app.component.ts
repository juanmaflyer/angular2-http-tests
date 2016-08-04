import { Component, OnInit } from '@angular/core';
import { Http, Response, Request, RequestOptions, RequestMethod, Headers } from '@angular/http';

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
  private url2 = 'http://jsonplaceholder.typicode.com/comments'

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

      this.sendCustomFullRequest();

      this.sendCustomEasyRequest();
  }

  private sendCustomFullRequest() {
      let requestMethod: RequestMethod = RequestMethod.Get;

      let headers = new Headers();
      headers.append('X-CUSTOM-PEPE','pepe-power');

      let headers2 = new Headers({'Accept': 'application/json'});

      let options = new RequestOptions({
          method: requestMethod,
          url: this.url2,
          search: 'active=1',
          headers: new Headers({
              'Accept': 'wtf/pdf2',
              'X-CUSTOM-PEPE': 'pepe-power'
          })
      });

      let req: Request = new Request(options);


      this.http.request(req).subscribe(data => console.log(data.json()));
  }

  private sendCustomEasyRequest() {
      this.http.get(this.url, {
          url: this.url2,
          method: 'post',
          headers: new Headers({
              'x-custom-header': 'holaz'
          })
      }).subscribe();
  }

  private extractData(res: Response) {
      let body = res.json();
      //return body.data || { };
      return body;
  }
}
