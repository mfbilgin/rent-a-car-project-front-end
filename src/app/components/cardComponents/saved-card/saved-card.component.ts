import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card/card';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';
import { SavedCardService } from 'src/app/services/payment/savedCard.service';

@Component({
  selector: 'app-saved-card',
  templateUrl: './saved-card.component.html',
  styleUrls: ['./saved-card.component.css'],
})
export class SavedCardComponent implements OnInit {
  cards: Card[];
  dataLoaded = false;
  constructor(
    private savedCardService: SavedCardService,
    private localStorageService: LocalStorageService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSavedCardByUserId();
  }

  getSavedCardByUserId() {
    this.savedCardService
      .getCardByUserId(Number(this.localStorageService.get('userId')))
      .subscribe((response) => {
        this.cards = response.data;
        this.dataLoaded = true;
      });
  }
  deleteCard(card: Card) {
    this.savedCardService.deleteCard(card).subscribe((response) => {
      this.toasterService.info(response.message, 'Başarılı');
      setTimeout(function () {
        location.reload();
      }, 300);
    });
  }
}
