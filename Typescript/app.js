/*let nombre:string;

nombre = "Peter";

let numero:number = 123;

let booleano:boolean = true;

let hoy:Date = new Date();

hoy = new Date('2020-10-21');

console.log(hoy);

let cualquiera:any;

cualquiera = 123;
cualquiera = "hola";

cualquiera = hoy;
cualquiera = booleano;


let spiderman = {
    nombre: "Peter",
    edad: 20
}

spiderman = {
    nombre : "Juan",
    edad : 30
}*/
/*
function getNombre(){
    return "Fernando";
}

let nombre = "Juan";
let apellido = "Perez";
let edad = 32;

//let texto = "Hola " + nombre + " " + apellido + "("+edad+")";
let texto = `Hola, ${ nombre } ${apellido} (${ edad })`;

let texto2:string = `${ getNombre() }`;

console.log(texto2);
*/
/*
function activar( quien:string,objeto:string = "batiseñal",momento?:string ){
    let mensaje:string;

    if(momento)
    {
        mensaje = `${ quien } activo la ${ objeto } en la ${ momento }`;
    }
    else
    {
        mensaje = `${ quien } activo la ${ objeto }`;
    }

    //mensaje = `${ quien } activo la ${ objeto }`;
    console.log(mensaje);
}

activar("Gordon", "batiseñal","tarde");
*/
/*
let miFuncion = function ( a )
{
    return a;
}

let miFuncionF = a => a;

let miFuncion2 = function(a:number,b:number)
{
    return a + b;
}

let miFuncion2F = (a:number,b:number) => a+b;

let miFuncion3 = function(nombre:string)
{
    nombre = nombre.toUpperCase();
    return nombre;
}

let miFuncion3F = (nombre:string) =>
{
    nombre = nombre.toUpperCase();
    return nombre;
}

//console.log(miFuncion("Normal"));
//console.log(miFuncionF("Flecha"));


let hulk = {
    nombre:"Hulk",
    smash(){
        setTimeout( () => console.log(this.nombre + " SMASH!!"),1500);
        //console.log(this.nombre + " SMASH!!");
    }
}

hulk.smash();
*/
/*
let avenger = {
    nombre: "Steve",
    clave: "Capitan America",
    poder: "Droga"
}

let { nombre,clave,poder } = avenger;

console.log(nombre, clave, poder);*/
/*
let avengers:string[] = ["Thor","Steve","Tony"];

let [ thor,capitan,ironman ] = avengers;

console.log(thor,capitan,ironman);

*/
/*
let prom1 = new Promise( function(resolve, reject ){

    setTimeout(() => {
        console.log("Promesa terminada");
        //todo bien
        resolve();
        //todo mal
        //reject();
    }
        , 1500);

});

console.log("Paso 1");

prom1.then(function(){
    console.log("Ejecutarme cuando se termine bien");
},
function(){
    console.log("Ejecutarme si termina mal");
});

console.log("Paso 2");
*/
/*
interface Xmen{
    nombre:string,
    poder:string
}

function enviarMision(xmen: Xmen ){
    console.log("Enviando a: " + xmen.nombre);
};

function enviarCuartel(xmen: Xmen ){
    console.log("Enviando al cuartel: " + xmen.nombre);
};

let wolverine:Xmen = {
    nombre: "Wolverine",
    poder: "Regeneracion"
}

enviarMision(wolverine);
enviarCuartel(wolverine);

*/
/*
class Avenger{

    nombre:string = "Antman";
    equipo:string;
    nombreReal:string;

    puedePelear:boolean = false;
    peleasGanadas:number = 0;

    constructor( nombre:string,equipo:string,nombreReal:string ){
        this.nombre = nombre;
        this.equipo = equipo;
        this.nombreReal = nombreReal;
    }

}

let antman:Avenger = new Avenger("Ant-man","Capitan","Scott Lang");

console.log(antman);
*/
