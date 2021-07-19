# Prueba Jorge Luis Pineda Montagut

Repositorio para presentar prueba de primestone. Se utilizó firebase para backend y npm's para permitir drang and drop de actividades. Dentro del proyecto angular se crearon componentes, servicios, modelos, archivo de rutas, entre otros archivos. Se hicieron cambios progresivamente almacenando los cambios en este repositorio.

# Pasos para probar la aplicación

1. Clonar el proyecto.
2. Indtalar paquetes de node.js si estos no se encuentran en el proyecto. 
3. Puede iniciar sesión con el email jorge.pineda.montagut.111@gmail.com y la contraseña 123456, o puede registrarse como nuevo usuario. Dado que se aplicaron algunos pasos por defecto de la autenticación de firebase, este solicitará la confirmación de la cuenta a través de un correo electrónico que se enviará a la dirección de correo registrada.
4. Una vez haya iniciado sesión puede agregar tareas en el tablero de actividades presionando en el botón 'Agregar tareas'. Las tareas registradas se agregaran en el panel de nuevas tareas.
5. Puede arrastrar y soltar las tareas de un panel a otro. El sistema guardara el cambio de estado automáticamente al realizar el movimiento.
6. Para editar la información de una tarea o eliminarla haga doble clic sobre la tarea que desea seleccionar.
7. Puede cerrar sesión presionando el botón ubicado en la esquina superior derecha.

Debido a problemas que tuve con versiones de node.js y angular cli en el equipo donde realice la prueba, con el tiempo disponible intenté llevar a cabo el objetivo de la prueba, salvo la aplicación de algún estándar que se mencionara en ella.


#  Herramientas usadas


Para la construcción de la aplicación se usó angular en su versión 12.1.2.
Se integraron los paquetes de firebase para el manejo de datos y autenticación de usuarios.
Se integró angular material para facilitar la construcción de algunos elementos visuales y para integrar la acción de arrastrar y soltar elementos.
Se usaron algunas utilidades de bootstrap 5.

# Primestone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

