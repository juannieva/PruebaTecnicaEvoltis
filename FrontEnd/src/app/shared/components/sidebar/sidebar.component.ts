import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';


import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule, PanelMenuModule,MenuModule,MenubarModule],
})
export class SidebarComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit(){ this.items = [
    {
      label: 'Productos',
      icon: 'pi pi-box',
      routerLink: '/admin/products'
    },
    {
      label: 'Marcas',
      icon: 'pi pi-tags',
      routerLink: '/admin/brands'
    },
    {
      label: 'Categorías',
      icon: 'pi pi-list',
      routerLink: '/admin/categories'
    }
  ];
}

}
