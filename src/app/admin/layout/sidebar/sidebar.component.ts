import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() mobileQuery: any = null;
  @Input() opened:boolean = false

  fillerNav = [
    {name: 'Dashboard', route: '/dashboard', 'icon': 'dashboard'},
    {name: 'User', route: '/user', 'icon': 'group'},
    {name: 'Category', route: '/category', icon: 'list'},
    {name: 'Post', route: '/post', icon: 'article'},
    {name: 'Task', route: '/task', icon: 'task'},
    {name: 'Project', route: '/project', icon: 'fact_check'},
    
  ];
}
