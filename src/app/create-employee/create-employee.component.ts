import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]]
    });
  }

  saveEmployee() {
    if (this.employeeForm.invalid) {
      return;
    }

    const newEmployee: Employee = this.employeeForm.value;

    this.employeeService.createEmployee(newEmployee).subscribe(
      (data) => {
        console.log(data);
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

  isFieldTouched(fieldName: string) {
    return this.employeeForm.get(fieldName).touched;
  }
}
