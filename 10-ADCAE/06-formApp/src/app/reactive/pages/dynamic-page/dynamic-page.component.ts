import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styleUrl: './dynamic-page.component.css',
})
export class DynamicPageComponent {
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array([
      ['Metal Gear', Validators.required],
      ['Mega Man X', Validators.required],
    ]),
  });

  newFavorite = new FormControl('', [Validators.minLength(3)]);

  constructor(private readonly formBuilder: FormBuilder) {}

  get favoriteGames() {
    return this.productForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: keyof typeof this.productForm.controls): boolean {
    return Boolean(
      this.productForm.controls[field].errors &&
        this.productForm.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return Boolean(
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(
    field: keyof typeof this.productForm.controls
  ): string | undefined {
    if (!this.productForm.controls[field]) return;

    const errors = this.productForm.controls[field].errors || {};

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

  addToFavorite() {
    if (!this.newFavorite.valid) return;
    if (!this.newFavorite.value) return;
    const favorite = this.newFavorite.value;
    this.favoriteGames.push(
      this.formBuilder.control(favorite, [Validators.minLength(3)])
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }
    (this.productForm.controls['favoriteGames'] as FormArray) =
      this.formBuilder.array([]);
    this.productForm.reset();
  }
}
