export default function LandingPage(){
    function handle(){
        const input = document.getElementById("code")
        if(input==='12345'){
            window.alert("attendance submitted successfully")
        }
    }
    return(
        <div className='user'>
            <div>
                <label htmlFor="reg-no">Reg No</label>
                <input id='reg-no' type="text" className='reg-no' placeholder="Registration Number"/>
            </div>
            <div>
                <label htmlFor="code">Code</label>
                <input id ='code' type="text" className='code' placeholder="Enter the code above"/>
            </div>
            <div>
                <button className="button" onClick={handle}>Submit</button>
            </div>  
        </div>
    )
}
