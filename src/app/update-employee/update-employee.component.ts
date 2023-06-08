import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]
    });

    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => {
        this.employeeForm.patchValue(data);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      return;
    }

    const updatedEmployee: Employee = {
      id: this.id,
      ...this.employeeForm.value
    };

    this.employeeService.updateEmployee(this.id, updatedEmployee).subscribe(
      (data) => {
        this.goToEmployeeList();
      },
      (error) => console.log(error)
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  isFieldInvalid(fieldName: string) {
    return (
      this.employeeForm.get(fieldName).invalid &&
      (this.employeeForm.get(fieldName).touched || this.employeeForm.get(fieldName).dirty)
    );
  }
}
