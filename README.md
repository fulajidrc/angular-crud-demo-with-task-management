## Generate module
ng g m module-name

## Genarate Component
ng g c component-name

# NGRX

## store
    ng add @ngrx/store

## effect
    ng add @ngrx/effects

## store-devtools
    ng add @ngrx/store-devtools

## schematics
    ng add @ngrx/schematics

## generate feature
    ng generate feature User -m app.module.ts
    Ex: ng generate feature auth/store/auth -m auth/auth.module.ts


## for add crud 
    ng g s service/post --skip-tests=true
    ng g m admin/post
    ng g c admin/post
    ng generate feature admin/post/store/post -m admin/post/post.module.ts

# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

