import React from "react"
export default function DisplayCode(){
    const [code, SetCode] = React.useState("12345")
    function handler(){
        SetCode(54321);
    }
    return(
        <div className="display-code">
            <h3 onClick={handler}>Code: {code}</h3>
        </div>
    )
}