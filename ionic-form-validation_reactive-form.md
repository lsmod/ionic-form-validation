# Ionic form validation | get started with Reactive Form

### Intro
Validation can be a boring thing, but it's required in other to get a good application. While creating applications, you will often need form validation. Most-likely the application you are currently developing got some kind of form, and it's a place where users can really start to feel frustrated if not done correctly.\
But don't worry Angular got your back. With Reactive Form, validation becomes a piece of cake, and user experience is great.

### Setting up your Ionic project:
In order to use 'Reactive Forms' you will need to add some import into your page's module.
To do so, add `FormsModule` and `ReactiveFormsModule` like this:
```typescript
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule,
         ReactiveFormsModule // add this import
       } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HomePage } from "./home.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Add this (if not already imported)
    IonicModule,
    ReactiveFormsModule, // And finally add this one
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
```
### Adding validation
Now that it's setup, you can use the `[formGroup]` directive attribute on form element like this:
```html
<form [formGroup]="formGroup">
```
It tells that your form will be using `formGroup` variable as a form validator. To declare this validator go into your page component ts file and declare `fromGroup`:
```typescript
import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms"; // don't forget to import FormGroup

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  formGroup: FormGroup; // declare it here
  ...
```

Before setting up validation let's add some fields to the form:
```html
<ion-content>
  <form [formGroup]="formGroup">
    <ion-list>
      <ion-item>
        <ion-label position="stacked">Username</ion-label>
        <ion-input
          formControlName="userNameControl"
          required="true"
          placeholder="Username"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Email address</ion-label>
        <ion-input
          formControlName="emailControl"
          required="true"
          type="email"
          placeholder="Email address"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Password</ion-label>
        <ion-input
          formControlName="passwordControl"
          required="true"
          type="password"
          placeholder="Password"
        ></ion-input>
      </ion-item>
    </ion-list>
  </form>
</ion-content>
```
Personally, I really like having `ion-label` placed just above the field (position `stacked`). It may seems redundant with the placeholder al-ready describing the field, but the placeholder won't be displayed once user starts typing into the field.
Any way, as you can see each field got a `formControlName` attribute. This is how `formGroup will be able to link validation's rules to a specifics fields.

By now you should read some complaint in your console like:
```
ERROR Error: "Uncaught (in promise): Error: formGroup expects a FormGroup instance. Please pass one in.
```
What's this ? `formGroup` works with a `FromGroup`  instance. Meaning that you have to add this into your page ts file:
```typescript
constructor(public formBuilder: FormBuilder) {
  this.formGroup = formBuilder.group({});
}
```
### Validation rules
Then console is casually yelling at you something like:
```
ERROR Error: "Uncaught (in promise): Error: Cannot find control with name: 'passwordControl'
```
To solve this you need to add the specific validation's rules I was talking about:
```typescript
constructor(public formBuilder: FormBuilder) {
  this.formGroup = formBuilder.group({
    userNameControl: [""],
    emailControl: [""],
    passwordControl: [""]
  });
}
```
Phew! Now your form should be displayed and the console be clear of any error message...

But... Your form is accepting ANYTHING! Let's improve that:
```typescript
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
```
Finally, your form only accepts:
- username with 4 character minimum, 30 maximum and using alphanumeric characters
- email kind of valid (there is better regex out there, but at least we are not accepting special characters)
-  a password with a minimum length of 8 characters using alphanumerical plus some special characters

That's it! Well... No! It's missing something important...

### Submitting the form
Let's create button to submit the form. And add that at the end of the form:
```html
<!-- password button is just above -->
<ion-item>
  <ion-button [disabled]="!formGroup.valid" type="submit">
    <ion-icon name="checkmark"></ion-icon>
      save
    </ion-button>
   </ion-item>
</ion-item>
```
I also love having ion-icon inside "action button". They give life to it.
Here the save button will only be clickable once your form is valid. This is done by using `[disabled]` attribute (`[disabled]="!formGroup.valid"`)

Now that you got a button that submit the form, better handle that submit action! Modify your form like this:
```html
<form [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)">
```
And add the following in you page ts file:
```typescript
onSubmit(formData: any) {
  console.log(formData);
  // todo: do something with our data like:
  // this.service.set(formData);    
}
```
If you submit your form you, should see something like the following in your console:
```
Object { userNameControl: "lsmod", emailControl: "lsmod@moon.io", passwordControl: "UNBREAK@BLE" }
```

### Conclusion
Obviously, there is more to it. Better validator (especially for email). But as you have seen, it's pretty easy to get working validation with `reactive form`

All the code in this example is available at this [github depot](https://github.com/lsmod/ionic-form-validation). Feel free to clone it. Well, I hope you enjoyed this article. Give it a clap if you would like to hear more about this topic
