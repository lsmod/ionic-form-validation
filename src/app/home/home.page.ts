import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  formGroup: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      userNameControl: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.maxLength(30),
          Validators.pattern("[0-9a-z-A-Z-_]*"),
          Validators.required
        ])
      ],
      emailControl: [
        "",
        Validators.compose([
          Validators.minLength(4),
          Validators.pattern("[0-9a-z-A-Z@.]*"),
          Validators.required
        ])
      ],
      passwordControl: [
        "",
        Validators.compose([
          Validators.minLength(8),
          Validators.pattern("[0-9a-z-A-Z@.#*$!?&+-/]*"),
          Validators.required
        ])
      ]
    });
  }

  onSubmit(formData: any) {
    console.log(formData);
    // todo do something with our data like:
    // this.service.set(formData);
  }
}
