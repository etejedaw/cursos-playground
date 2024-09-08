import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styleUrl: './switches-page.component.css',
})
export class SwitchesPageComponent {
  switchForm = this.formBuilder.group({
    gender: ['M', [Validators.required]],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [true, Validators.requiredTrue],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  onSave() {
    if (!this.switchForm.valid) return this.switchForm.markAllAsTouched();
    this.switchForm.reset();
  }

  isValidField(field: keyof typeof this.switchForm.controls): boolean {
    return Boolean(
      this.switchForm.controls[field].errors &&
        this.switchForm.controls[field].touched
    );
  }
}
