import { Component, OnInit } from "@angular/core";
import * as data from "../../shared/data/todo/todo";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ToDoFilterComponent } from "./to-do-filter/to-do-filter.component";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { UserService } from "../../services/user.service";
import { PatientsService } from "../../services/patients.service";

// const Months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

@Component({
  selector: "app-to-do",
  templateUrl: "./to-do.component.html",
  styleUrls: ["./to-do.component.scss"],
  imports: [
    BreadcrumbComponent,
    ToDoFilterComponent,
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ToDoComponent implements OnInit {
  patientForm: FormGroup;
  users: any[] = [];
  visible = false; // Pour contrôler l'affichage du formulaire
  isSubmitting = false;
  isLoadingUsers = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private patientService: PatientsService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      user: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Charger la liste des utilisateurs
   */
  loadUsers(): void {
    this.isLoadingUsers = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoadingUsers = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        this.isLoadingUsers = false;
      }
    });
  }

  /**
   * Soumettre le formulaire
   */
  onSubmit(): void {
    if (this.patientForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formData = this.patientForm.value;
      
      const patientData = {
        dateNaissance: formData.dateNaissance,
        user: parseInt(formData.user) // Convertir en nombre
      };

      this.patientService.createPatient(patientData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.successMessage = 'Patient créé avec succès!';
          
          // Réinitialiser le formulaire
          this.patientForm.reset();
          
          // Rediriger après 2 secondes
          setTimeout(() => {
            this.router.navigate(['/patients/list']);
          }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erreur lors de la création:', error);
          
          if (error.status === 400) {
            if (error.error?.violations) {
              this.handleValidationErrors(error.error.violations);
            } else if (error.error?.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'Données invalides. Veuillez vérifier les champs.';
            }
          } else if (error.status === 401) {
            this.errorMessage = 'Vous devez être authentifié pour effectuer cette action.';
          } else if (error.status === 409) {
            this.errorMessage = 'Ce patient existe déjà.';
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la création du patient.';
          }
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Annuler et revenir à la liste
   */
  onCancel(): void {
    this.patientForm.reset();
    this.errorMessage = '';
    this.successMessage = '';
    this.router.navigate(['/patients/list']);
  }

  /**
   * Marquer tous les champs comme touchés
   */
  private markFormGroupTouched(): void {
    Object.keys(this.patientForm.controls).forEach(key => {
      const control = this.patientForm.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Gérer les erreurs de validation du backend
   */
  private handleValidationErrors(violations: any[]): void {
    violations.forEach((violation: any) => {
      const control = this.patientForm.get(violation.propertyPath);
      if (control) {
        control.setErrors({ 
          serverError: violation.message 
        });
        control.markAsTouched();
      }
    });
    
    if (violations.length === 0) {
      this.errorMessage = 'Erreur de validation. Veuillez vérifier vos données.';
    }
  }

  /**
   * Sélectionner un utilisateur depuis la liste
   */
  selectUser(user: any): void {
    this.patientForm.patchValue({ user: user.id });
    this.visible = true; // Afficher le formulaire
  }

  /**
   * Obtenir le nom complet d'un utilisateur pour l'affichage
   */
  getUserDisplayName(user: any): string {
    return user.nomComplet || `${user.prenom} ${user.nom}`;
  }

  /**
   * Obtenir la date actuelle au format YYYY-MM-DD pour limiter la sélection
   */
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Getters pour faciliter l'accès aux contrôles
  get user() { return this.patientForm.get('user'); }
  get dateNaissance() { return this.patientForm.get('dateNaissance'); }
}
//   patientForm: FormGroup;
//   users: any[] = [];
//   isSubmitting = false;
//   isLoadingUsers = false;
//   errorMessage = "";
//   successMessage = "";

//   constructor(
//     private fb: FormBuilder,
//     private userService: UserService,
//     private patientService: PatientService,
//     private router: Router
//   ) {
//     this.patientForm = this.fb.group({
//       user: ["", [Validators.required]],
//       dateNaissance: ["", [Validators.required]],
//     });
//   }

//   ngOnInit(): void {
//     this.loadUsers();
//   }

//   /**
//    * Charger la liste des utilisateurs
//    */
//   loadUsers(): void {
//     this.isLoadingUsers = true;
//     this.userService.getAllUsers().subscribe({
//       next: (users) => {
//         this.users = users;
//         this.isLoadingUsers = false;
//       },
//       error: (error) => {
//         console.error("Erreur lors du chargement des utilisateurs:", error);
//         this.errorMessage = "Erreur lors du chargement des utilisateurs";
//         this.isLoadingUsers = false;
//       },
//     });
//   }

//   /**
//    * Soumettre le formulaire
//    */
//   onSubmit(): void {
//     if (this.patientForm.valid) {
//       this.isSubmitting = true;
//       this.errorMessage = "";
//       this.successMessage = "";

//       const formData = this.patientForm.value;

//       const patientData = {
//         dateNaissance: formData.dateNaissance,
//         user: parseInt(formData.user), // Convertir en nombre
//       };

//       this.patientService.createPatient(patientData).subscribe({
//         next: (response) => {
//           this.isSubmitting = false;
//           this.successMessage = "Patient créé avec succès!";

//           // Réinitialiser le formulaire
//           this.patientForm.reset();

//           // Rediriger après 2 secondes
//           setTimeout(() => {
//             this.router.navigate(["/patients/list"]);
//           }, 2000);
//         },
//         error: (error) => {
//           this.isSubmitting = false;
//           console.error("Erreur lors de la création:", error);

//           if (error.status === 400) {
//             if (error.error?.violations) {
//               this.handleValidationErrors(error.error.violations);
//             } else if (error.error?.message) {
//               this.errorMessage = error.error.message;
//             } else {
//               this.errorMessage =
//                 "Données invalides. Veuillez vérifier les champs.";
//             }
//           } else if (error.status === 401) {
//             this.errorMessage =
//               "Vous devez être authentifié pour effectuer cette action.";
//           } else if (error.status === 409) {
//             this.errorMessage = "Ce patient existe déjà.";
//           } else {
//             this.errorMessage =
//               "Une erreur est survenue lors de la création du patient.";
//           }
//         },
//       });
//     } else {
//       this.markFormGroupTouched();
//     }
//   }

//   /**
//    * Annuler et revenir à la liste
//    */
//   onCancel(): void {
//     this.patientForm.reset();
//     this.errorMessage = "";
//     this.successMessage = "";
//     this.router.navigate(["/patients/list"]);
//   }

//   /**
//    * Marquer tous les champs comme touchés
//    */
//   private markFormGroupTouched(): void {
//     Object.keys(this.patientForm.controls).forEach((key) => {
//       const control = this.patientForm.get(key);
//       control?.markAsTouched();
//     });
//   }

//   /**
//    * Gérer les erreurs de validation du backend
//    */
//   private handleValidationErrors(violations: any[]): void {
//     violations.forEach((violation: any) => {
//       const control = this.patientForm.get(violation.propertyPath);
//       if (control) {
//         control.setErrors({
//           serverError: violation.message,
//         });
//         control.markAsTouched();
//       }
//     });

//     if (violations.length === 0) {
//       this.errorMessage =
//         "Erreur de validation. Veuillez vérifier vos données.";
//     }
//   }

//   /**
//    * Obtenir le nom complet d'un utilisateur pour l'affichage
//    */
//   getUserDisplayName(user: any): string {
//     return user.nomComplet || `${user.prenom} ${user.nom}`;
//   }

//   /**
//    * Obtenir la date actuelle au format YYYY-MM-DD pour limiter la sélection
//    */
//   getCurrentDate(): string {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   }

//   // Getters pour faciliter l'accès aux contrôles
//   get user() {
//     return this.patientForm.get("user");
//   }
//   get dateNaissance() {
//     return this.patientForm.get("dateNaissance");
//   }
// }
