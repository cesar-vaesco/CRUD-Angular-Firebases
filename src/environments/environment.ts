// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/**
 * El archivo environment.prod.ts se enconfigura de la misma forma. El archivo antes mensionado solo se 
 * utiliza cuando se va a mandar nuestra appa producción
 * 
 */
export const environment = {
  production: false, 
  firebase:{
    apiKey: "AIzaSyDRrMqDFBYaBikDZsS0-rQSlxLdmOk26tQ",
    authDomain: "empleados-f3373.firebaseapp.com",
    projectId: "empleados-f3373",
    storageBucket: "empleados-f3373.appspot.com",
    messagingSenderId: "289674294017",
    appId: "1:289674294017:web:32649b54622a1ae438a100"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
