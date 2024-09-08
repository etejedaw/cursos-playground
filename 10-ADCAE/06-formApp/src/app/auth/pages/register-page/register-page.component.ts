import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  registerForm = this.formBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.firstNameAndLastnamePattern),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidatorService],
      ],
      username: [
        '',
        [Validators.required, this.validatorService.cantBeStrider],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.areFieldsEquals('password', 'passwordConfirm'),
      ],
    }
  );

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly validatorService: ValidatorsService,
    private readonly emailValidatorService: EmailValidatorService
  ) {}

  isValidField(field: keyof typeof this.registerForm.controls): boolean {
    return this.validatorService.isValidField(this.registerForm, field);
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
  }
}
