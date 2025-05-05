import { Component, OnInit }                 from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                            from '@angular/router';
import { AuthService }                       from '../../services/auth.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Cria o FormGroup com dois campos obrigatórios
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      // força exibição de erros (caso tenha mensagens)
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.value;

    // Aqui, usamos o stub do AuthService para simular login
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/']), // volta à Home
      error: err => console.error('Falha no login', err)
    });
  }
}
