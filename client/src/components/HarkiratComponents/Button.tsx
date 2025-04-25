import { ReactElement } from "react";


interface Buttonprops {
    variant : "primary" | "secondary";
    text:string;
    startIcon? : ReactElement;
}


  
const variantClasses={
    "primary":"bg-green-100 text-black",
    "secondary":"bg-purple-100 text-black"
};

const defaultStyles = "px-4 py-2 rounded-md flex items-center gap-2"

export function Button({variant,text,startIcon}:Buttonprops){
    return <button className={variantClasses[variant] + " " + defaultStyles}>
        
        {startIcon} {text}
        
    </button>
}