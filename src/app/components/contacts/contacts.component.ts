import { Component, OnInit } from '@angular/core';
import { PersonalComponent } from './personal/personal.component';
import { ContactsFilterComponent } from './contacts-filter/contacts-filter.component';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FeatherIconComponent } from '../../shared/components/feather-icon/feather-icon.component';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    imports: [BreadcrumbComponent,FeatherIconComponent, ContactsFilterComponent, PersonalComponent, BrowserModule,
    ReactiveFormsModule, // Ajoutez cette ligne
    FormsModule]
})

export class ContactsComponent implements OnInit {

  userForm: FormGroup;
  show = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      tlf: ['', [Validators.required, Validators.pattern(/^\d{8,}$/)]],
      adresse: ['', [Validators.required, Validators.minLength(5)]],
      roles: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Validateur personnalisé pour vérifier que les mots de passe correspondent
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    // if (confirmPassword?.hasError('passwordMismatch')) {
    //   delete confirmPassword.errors['passwordMismatch'];
    //   if (Object.keys(confirmPassword.errors || {}).length === 0) {
    //     confirmPassword.setErrors(null);
    //   }
    // }
    
    return null;
  }

  showPassword(): void {
    this.show = !this.show;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Préparer les données pour l'API
      const formData = { ...this.userForm.value };
      
      // Convertir le rôle en tableau si nécessaire
      if (formData.roles && typeof formData.roles === 'string') {
        formData.roles = [formData.roles];
      }

      // Supprimer confirmPassword car l'API n'en a pas besoin
      delete formData.confirmPassword;

      // Appel à l'API
      this.http.post('/api/users', formData).subscribe({
        next: (response: any) => {
          this.isSubmitting = false;
          this.successMessage = 'Utilisateur créé avec succès!';
          
          // Rediriger après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/users/list']); // Ajustez la route selon votre application
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erreur lors de la création:', error);
          
          if (error.status === 400 && error.error?.violations) {
            // Gérer les erreurs de validation du backend
            this.handleValidationErrors(error.error.violations);
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la création de l\'utilisateur.';
          }
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/users/list']); // Ajustez la route selon votre application
  }

  // Gérer les erreurs de validation du backend
  private handleValidationErrors(violations: any[]): void {
    violations.forEach(violation => {
      const control = this.userForm.get(violation.propertyPath);
      if (control) {
        control.setErrors({ serverError: violation.message });
      }
    });
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get nom() { return this.userForm.get('nom'); }
  get prenom() { return this.userForm.get('prenom'); }
  get email() { return this.userForm.get('email'); }
  get tlf() { return this.userForm.get('tlf'); }
  get adresse() { return this.userForm.get('adresse'); }
  get roles() { return this.userForm.get('roles'); }
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirmPassword'); }
}






  // public show: boolean = false;

  // constructor() { }

  // ngOnInit(): void {
  // }
  // showPassword() {
  //   this.show = !this.show;
  // }


