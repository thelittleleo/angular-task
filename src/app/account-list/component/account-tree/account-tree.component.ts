import { Component, Input, OnInit } from '@angular/core';
import { Account } from '../../model/account';

@Component({
  selector: 'account-tree',
  templateUrl: './account-tree.component.html',
  styleUrls: ['./account-tree.component.scss']
})
export class AccountTreeComponent implements OnInit {

  @Input() account!: Account;

  isExpanded: boolean = true;

  constructor() {

  }

  ngOnInit(): void {

  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }

  isExpandable(): boolean {
    return this.account.accounts.length > 0;
  }

}
