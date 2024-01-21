import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { tap, catchError, EMPTY } from "rxjs";
import { Account } from "../model/account";
import { AccountService } from "../service/account.service";


export interface AccountState {
  accounts?: Account;
  searchTerm?: string;
  loading?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountListStore extends ComponentStore<AccountState> {

  constructor(private _accountService: AccountService) {
    super({});
  }

  selectSearchTerm$ = this.select((state) => state.searchTerm);
  selectLoading$ = this.select((state) => state.loading);
  selectFilteredData$ = this.select(({ accounts, searchTerm }) => this._accountService.search(accounts as Account, searchTerm));

  readonly updateAccounts = this.updater((state, accounts: Account) => ({ ...state, accounts: accounts }));
  readonly updateLoading = this.updater((state, loading: boolean) => ({ ...state, loading: loading }));

  getAccount$ = this.effect(() => {
    this.updateLoading(true);
    return this._accountService.getAccountList().pipe(
      tap((account: Account) => {
        this.updateAccounts(account);
        this.updateLoading(false);
      }),
      catchError(() => EMPTY),
    );
  });

}
