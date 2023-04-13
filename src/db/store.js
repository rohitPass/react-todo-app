import { toast } from "react-toastify";

let contacts = JSON.parse(localStorage.getItem('contacts')) || []; // JSON.parse -> string to json conversion 

// update the value in localstorage 
const updateStorage = (data) => {
    localStorage.setItem('contacts', JSON.stringify(data)); // JSON.stringify -> json object to string conversion
}

// store logic 
export const createContact = (contact) => {
    // check if email exists in db or not 
    let extEmail = contacts.find((item) => item.email === contact.email );
    // check if mobile exists in db or not 
    let extMobile = contacts.find((item) => item.mobile === contact.mobile);

      if(extEmail) {
        toast.warning('User Email already registered');
      } else if (extMobile) {
        toast.warning('User mobile number already registered.');
      } else {
        // if mobile and email not exists -> store new contact data in local storage 
        contacts.push(contact);
        updateStorage(contacts);
        toast.success('New contact created successfully');
        window.location.href = "/";
      }
};


// all contacts read logic 
export const readContacts = () => {
   return contacts;
}

// return single contact
export const readContact = (id) => {
  let extContact = contacts.find((item) => item.id == id)
  return extContact;
}

// to update data 
export const updateContact = (id,contact) => {
  let extIndex = contacts.findIndex((item) => item.id == id);
   let data = {
    id: Number(id),
    ...contact 
   };

   contacts.splice(extIndex,1,data)
   updateStorage(contacts)
   toast.success('Successfully Updated');
   window.location.href = "/";
}

// delete

export const deleteContact = (id) => {
  let extIndex = contacts.findIndex((item) => item.id == id)
  contacts.splice(extIndex,1)
  updateStorage(contacts)
  toast.success('Contact deleted successfully');
  window.location.href ="/";
}