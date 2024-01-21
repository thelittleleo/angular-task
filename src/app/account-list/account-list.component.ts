import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { AccountListStore } from './store/account.store';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  private _destroy: DestroyRef = inject(DestroyRef);

  public searchControl: FormControl = new FormControl('');

  public filteredAccountData$ = this._accountStore.selectFilteredData$;
  public loading$ = this._accountStore.selectLoading$;

  constructor(private _accountStore: AccountListStore) { }

  ngOnInit(): void {
    this._accountStore.getAccount$();
    
    this.searchControl?.valueChanges.pipe(takeUntilDestroyed(this._destroy), debounceTime(300))
    .subscribe((searchTerm: string) => {
      this._accountStore.patchState({ searchTerm: searchTerm });
    });
  }

}
