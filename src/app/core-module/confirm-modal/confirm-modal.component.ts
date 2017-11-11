import { Component, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ConfirmModalService } from 'app/core-module/confirm-modal/confirm-modal.service';
import { ModalDirective } from 'ngx-bootstrap';
 
@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.html'
})
export class ConfirmModalComponent {
 
  constructor(
    public bsModalRef: BsModalRef,
    private confirmModalService: ConfirmModalService,
    private bsModalService: BsModalService,
  ) { }
 
  confirm(): void {
    this.confirmModalService.confirm()
    this.bsModalRef.hide();
  }

  decline(): void {
    this.confirmModalService.decline()
    this.bsModalRef.hide();
  }

}