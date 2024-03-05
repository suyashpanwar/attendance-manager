
export default function LandingPage(){
    function handle(){
        console.log("Hello")
    }
    return(
        <div className='user'>
            <div>
                <label htmlFor="reg-no">Reg No</label>
                <input id='reg-no' type="text" className='reg-no'/>
            </div>
            <div>
                <label htmlFor="code">Code</label>
                <input id ='code' type="text" className='code' />
            </div>
            <div>
                <button className="button" onClick={handle}>Submit</button>
            </div>  
        </div>
    )
}
