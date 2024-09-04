import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styleUrl: './basic-page.component.css',
})
export class BasicPageComponent implements OnInit {
  myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  isValidField(field: keyof typeof this.myForm.controls): boolean {
    return Boolean(
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: keyof typeof this.myForm.controls): string | undefined {
    if (!this.myForm.controls[field]) return;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es Requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength}`;
      }
    }

    return;
  }

  ngOnInit() {
    this.myForm.reset();
  }

  onSave() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset({
      price: 10,
      inStorage: 0,
    });
  }
}
