function getInfo(info:string | number){
    if(typeof info==="string"){
        return "The string is : "+info;
    }
    else{
        return "The number is : "+info;
    }
    
}

function ifInfo(info?:string | number){
    if(info){
        return getInfo(info);
    }
    return "No information provided";
}

class Person1{
    name(){
        return "Raju";
    }
}
class Person2{
    name(){
        return "Baburao";
    }
}

function call(person:Person1 | Person2){
    if(person instanceof Person1){
        return person.name();
    }   
    else if(person instanceof Person2){
        return person.name();
    }   
    else{
        return "Unknown person";
    }
}

type student={
    name:string
    age:number
}

function getStudentInfo(std:student | null):std is student{
    if(std){
        return std;
    }
    throw new Error("Invalid student information");
}