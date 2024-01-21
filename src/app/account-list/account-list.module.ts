import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AccountListComponent } from './account-list.component';
import { AccountTreeComponent } from './component/account-tree/account-tree.component';

const routes: Routes = [
  {
    path: '',
    component: AccountListComponent
  }
];

@NgModule({
  declarations: [
    AccountListComponent,
    AccountTreeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class AccountListModule { }
