import { Component, Input } from '@angular/core';
import { User } from 'src/app/auth/store/auth.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() mobileQuery: any = null;
  @Input() opened:boolean = false
  @Input() user!:User;
  fillerNav = [
    {name: 'Dashboard', route: '/dashboard', 'icon': 'dashboard'},
  ];
  ngOnInit(){
    this.fillerNav = this.user.role == 'admin' || this.user.role == 'superadmin' 
    ? [
      ...this.fillerNav,
      {name: 'User', route: '/user', 'icon': 'group'},
    ]
    : this.fillerNav;




    this.fillerNav = this.user.role == 'user' || this.user.role == 'admin' 
    ? [
      ...this.fillerNav,
      {name: 'Project', route: '/project', icon: 'fact_check'},
    ]
    : this.fillerNav
  }

  
  // fillerNav = [
  //   {name: 'Dashboard', route: '/dashboard', 'icon': 'dashboard'},
  //   //{name: 'User', route: '/user', 'icon': 'group'},
  //   {name: 'Category', route: '/category', icon: 'list'},
  //   {name: 'Post', route: '/post', icon: 'article'},
  //   {name: 'Task', route: '/task', icon: 'task'},
  //   {name: 'Project', route: '/project', icon: 'fact_check'}
  // ];



}
