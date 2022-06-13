import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable()
export class LeftMenuService {
    constructor(private http: HttpClient) { }

    getMenuItems() {
        return this.http.get<any>('assets/data/menu/leftmenu.json')
        .toPromise()
        .then(res => res.data as MenuItem[])
        .then(data => data);
    }       
}