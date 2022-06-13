import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';


@Injectable()
export class MegaMenuService {
    constructor(private http: HttpClient) { }

    getMegaMenu() {
        return this.http.get<any>('assets/data/menu/megamenu.json')
        .toPromise()
        .then(res => res.data as MegaMenuItem[])
        .then(data => data);
    }       
}