import { useState } from "react";


export default function AddUser({callback : closeAddUserTab})
{
    const [name, setName] =  useState("")
    const [email, setEmail] =  useState("")

    const handleAddBtnClicked = () =>{
        const obj = {name, email, address : {city : "", street : "", zipcode: ""}}
        closeAddUserTab(obj)
    }
    return (
        <div className="card">
            <div className="card-header"><strong>Add New User</strong></div>
            <div className="card-body">
                <label htmlFor="newName">Name:</label>
                <input type="text" name="newName" id="newName" onChange={(e) => setName(e.target.value)}/>
                <br/><br/>
                <label htmlFor="newEmail">Email:</label>
                <input type="email" name="newEmail" id="newEmail" onChange={(e) => setEmail(e.target.value)}/>
            </div>   
            <div className="card-footer">
                <input className="btn" type="button" value="Create User" onClick={handleAddBtnClicked}/>
                <input className="btn" type="button" value="Cancel" onClick={() => closeAddUserTab()}/>
            </div>
            
        </div>
    );
}
