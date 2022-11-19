import { useState } from "react"



export default function OtherUserDataComp({address, id, callback : sendChangedDataToParent })
{


    return(
        <div style={{width: "200px", border: "blue 1px solid"}}>
            <label htmlFor={`userStreet${id}`}>Street:</label>
            <input type="text" id={`userStreet${id}`} name="userStreet" value={address.street} onChange={(e) => sendChangedDataToParent({street: e.target.value, city: address.city, zipcode: address.zipcode})} />
            <br/><br/>
            <label htmlFor={`userCity${id}`}>City:</label>
            <input type="text" id={`userCity${id}`} name="userCity" value={address.city} onChange={(e) => sendChangedDataToParent({street: address.street, city: e.target.value, zipcode: address.zipcode})}/>
            <br/><br/>
            <label htmlFor={`userZip${id}`}>Zip-Code:</label>
            <input type="text" id={`userZip${id}`} name="userZip" value={address.zipcode} onChange={(e) => sendChangedDataToParent({street: address.street, city: address.city, zipcode: e.target.value})}/>
            <br/><br/>

        </div>
        


    )
}