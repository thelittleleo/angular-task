import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable()
export class AccountService {

  constructor(private _http: HttpClient) {}

  getAccountList(): Observable<Account> {
    return this._http.get<Account>('https://71013f65-b118-41be-9b20-f062e0e58598.mock.pstmn.io/accounts');
  }


  search(account: Account, searchTerm?: string): Account | null {
    if (!account) {
      return null;
    }

    if (!searchTerm) {
      return account;
    }

    // Check if the current account's name matches the search term
    const isMatch = account.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (isMatch) {
      // If there's a match, return a new object with only the current account
      return { ...account, accounts: [] };
    } else {
      // If there's no match, recursively search in child accounts
      const matchingChildren = account.accounts
        .map((child) => this.search(child, searchTerm))
        .filter((childResult) => !!childResult) as Account[];

      // If any child has a match, return a new object with the current account and matching children
      if (matchingChildren.length > 0) {
        return { ...account, accounts: matchingChildren };
      } else {
        // If no match is found in the current account or its children, return null
        return null;
      }
    }
  }

}
