import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { StepsComponent } from './steps/steps.component';

@NgModule({
  declarations: [StepsComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [StepsComponent, HeaderComponent]
})
export class ComponentsModule {}
