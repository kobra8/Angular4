import { Component, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfirmModalService } from 'app/core-module/confirm-modal/confirm-modal.service';
 
@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.html'
})
export class ConfirmModalComponent {
  message: string

  constructor(
    public bsModalRef: BsModalRef,
    private confirmModalService: ConfirmModalService,
    private bsModalService: BsModalService
  ) {}
 
  confirm(): void {
    this.message = "OK"
    this.confirmModalService.confirm()
    
    this.bsModalRef.hide();
  }

  decline(): void {
    this.message = "NO"
    this.confirmModalService.decline()
    this.bsModalRef.hide();
  }
}