import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  habilitado = true;

  constructor( private postService:PostService ) {}

  ngOnInit(){

    this.siguientes();
    this.postService.nuevoPost.subscribe( post => {
          this.posts.unshift(post);
    });
    
  
  }


  recargar(event) {

    this.siguientes( event, true );
    this.habilitado = true;
    this.posts = [];

  }

  siguientes( event?, pull: boolean = false) {


    this.postService.getPost( pull ).subscribe( resp => {
      console.log (resp)
      this.posts.push( ...resp.post );

      if( event ) {
        event.target.complete();
        if( resp.post.length === 0 ){
          this.habilitado = false;

        }
      }
    });


  }



}
