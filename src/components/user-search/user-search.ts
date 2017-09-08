import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { BackendApiService } from '../../app/backend-api.service';

/*
  Emits onSearchResults
*/
@Component({
  selector: 'user-search',
  templateUrl: 'user-search.html',
  outputs: ['onSearchResults'],
})
export class UserSearchComponent implements OnInit {
  onSearchResults: EventEmitter<any[]> = new EventEmitter<any[]>();
  searchInput: string = '';
  searchControl: FormControl;
  
  constructor(private el: ElementRef, private backendApiService: BackendApiService) {
    this.searchControl = new FormControl(); 
  }

  ngOnInit(): void {
    //Tracks
    // convert the `keyup` event into an observable stream
    this.searchControl.valueChanges
      .filter((text: string) => text.startsWith('@'))
      .filter((text: string) => text.length > 2) // filter out if empty
      .debounceTime(250)                         // only once every 250ms
      .flatMap((query) => {
          let name = query.slice(1);
          return this.backendApiService.searchUser(name);
      })
      .subscribe((res:any) => {
        this.onSearchResults.emit(res);
        console.log("res", JSON.stringify(res));
      },
      (err: any) => {
        console.log(err);
      },
      () => {
        console.log("complete");
      });
  }

  onInput(event: any){
    console.log("onInput", event);
    if(!event.target.value || event.target.value.length < 3){
      this.onSearchResults.emit([]);
    }
  }

}
