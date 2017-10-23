import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SurnameShortcutPipe } from './pipes/surname-shortcut.pipe';
import { CurrencyCustomPipe } from './pipes/currency-custom.pipe';
import { ImportantDirective } from './directives/important.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, 
    SurnameShortcutPipe, 
    CurrencyCustomPipe, 
    ImportantDirective],
  declarations: [
    HeaderComponent, 
    SurnameShortcutPipe, 
    CurrencyCustomPipe,
    ImportantDirective]
})
export class SharedModule {
}

