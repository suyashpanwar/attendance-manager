import React from "react"
export default function DisplayCode(){
    const [code, SetCode] = React.useState("12345")

    return(
        <div className="display-code">
            <h3>Code: {code}</h3>
        </div>
    )
}