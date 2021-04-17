import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/user/operationClaim';
import { User } from 'src/app/models/user/user';
import { UserOperationClaim } from 'src/app/models/user/userOperationClaim';
import { ClaimService } from 'src/app/services/claim/claim.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-claim-add',
  templateUrl: './claim-add.component.html',
  styleUrls: ['./claim-add.component.css'],
})
export class ClaimAddComponent implements OnInit {
  claimAddForm: FormGroup;
  userClaim: OperationClaim;
  claims: OperationClaim[];
  users: User[];
  dataLoaded: boolean = false;
  constructor(
    private claimService: ClaimService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClaims();
    this.getUsers();
    this.createClaimAddForm();
  }
  createClaimAddForm() {
    this.claimAddForm = this.formBuilder.group({
      operationClaimId: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }
  getUsers() {
    this.userService.getAllUser().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = response.success;
    });
  }

  getClaims() {
    this.claimService.getClaim().subscribe((response) => {
      this.claims = response.data;
      this.dataLoaded = response.success;
    });
  }

  add() {
    if (this.claimAddForm.valid) {
      let claimModel = Object.assign({}, this.claimAddForm.value);
      this.claimService.add(claimModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.router.navigate(['cars']);
        setTimeout(function () {
          location.reload();
        }, 400);
      });
    } else {
      this.toastrService.error(environment.formInvalid, 'Hata');
    }
  }
}
