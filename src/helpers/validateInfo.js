export default function validateInfo(values) {
  let errors = {};

  //Validate First name
  if (values.hasOwnProperty("fname")) {
    if (!values.fname.trim()) {
      errors.fname = "Please enter a First name";
    }
  }
  //Validate Last name
  if (values.hasOwnProperty("lname")) {
    if (!values.lname.trim()) {
      errors.lname = "Please enter a Last name";
    }
  }
  //validate Event name
  if (values.hasOwnProperty("ename")) {
    if (!values.ename.trim()) {
      errors.ename = "Please enter an Event name";
    }
  }

  //validate Description
  if (values.hasOwnProperty("description")) {
    if (!values.description.trim()) {
      errors.description = "Please enter a description";
    }
  }
  //validate status
  if (values.hasOwnProperty("status")) {
    if (!values.status.trim()) {
      errors.status = "Please select the status";
    }
  }
  //validate ticket type
  if (values.hasOwnProperty("type")) {
    if (!values.type.trim()) {
      errors.type = "Please select the type";
    }
  }
  //validate price
  if (values.hasOwnProperty("price")) {
    if (!values.price.trim()) {
      errors.price = "Please enter a price";
    }
  }
  //validate status
  if (values.hasOwnProperty("qty")) {
    if (!values.qty.trim()) {
      errors.qty = "Please enter the quantity";
    }
  }
  //Validate email
  if (values.hasOwnProperty("email")) {
    if (!values.email) {
      errors.email = "Please enter an email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
  }
  //Validate Gender
  if (values.hasOwnProperty("gender")) {
    if (!values.gender.trim()) {
      errors.gender = "Please select a gender";
    }
  }
  //Validate Contact Number
  if (values.hasOwnProperty("contact")) {
    if (!values.contact.trim()) {
      errors.contact = "Please enter a Contact Number";
    } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(values.contact)) {
      errors.contact = "Please enter a valid Contact Number";
    }
  }
  //Validate Address
  if (values.hasOwnProperty("address")) {
    if (!values.address.trim()) {
      errors.address = "Please enter your address";
    }
  }
  //Validate Age
  if (values.hasOwnProperty("age")) {
    if (!values.age.trim()) {
      errors.age = "Please enter your age";
    } else if (/[^0-9]/.test(values.age) || values.age <= 0 || values.age > 120) {
      errors.age = "Please enter a valid age";
    }
  }

  //Validate NIC
  if (values.hasOwnProperty("nic")) {
    if (!values.nic.trim()) {
      errors.nic = "Please enter your NIC number";
    } else if (!/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/i.test(values.nic)) {
      errors.nic = "Please enter a valid NIC number";
    }
  }
  //Validate Password
  if (values.hasOwnProperty("password")) {
    if (!values.password) {
      errors.password = "Please enter a password";
    } else if (values.password.length < 8) {
      errors.password = "Password needs to be 8 characters or more";
    }
  }
  //Validate Confirm Password
  if (values.hasOwnProperty("confirmPassword")) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
  }
  //Validate Card holder's name
  if (values.hasOwnProperty("chname")) {
    if (!values.chname.trim()) {
      errors.chname = "Please enter Card holder's name";
    }
  }
  //Validate Card number
  if (values.hasOwnProperty("cnum")) {
    if (!values.cnum.trim()) {
      errors.cnum = "Please enter a Card number";
    } else if (!/^[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*[0-9]{4}\s*$/.test(values.cnum)) {
      errors.cnum = "Please enter a valid Card number";
    }
  }
  //Validate Card Expiry date
  if (values.hasOwnProperty("expiry")) {
    if (!values.expiry.trim()) {
      errors.expiry = "Please enter a expiry date";
    } else if (!/^[0-9]{2}[/][0-9]{2}$/.test(values.expiry)) {
      errors.expiry = "Please enter a valid expiry date in the format mm/yy";
    } else {
      let date = values.expiry.split("/");
      let now = new Date();
      let currentMonth = now.getMonth() + 1;
      let currentYear = parseInt(now.getFullYear().toString().substr(-2));
      const month = parseInt(date[0]);
      const year = parseInt(date[1]);
      // currentYear = parseInt(currentYear);

      if (month === 0 || month > 12 || year === 0 || year > currentYear + 10) {
        errors.expiry = "Please enter a valid expiry date";
      }
      if ((year === currentYear && month <= currentMonth) || year < currentYear) {
        errors.expiry = "Your card has already expired. Please try again with another card";
      }
    }
  }

  //Validate Card cvc code
  if (values.hasOwnProperty("cvc")) {
    if (!values.cvc.trim()) {
      errors.cvc = "Please enter a cvc code";
    } else if (!/^[0-9]{3}$/.test(values.cvc)) {
      errors.cvc = "Please enter a valid cvc code";
    }
  }

  //  //Validate Question No
  //  if (values.hasOwnProperty("no")) {
  //   if (!values.no.trim()) {
  //     errors.no = "Please enter the Question Number";
  //   }
  // }

   //Validate Question
   if (values.hasOwnProperty("question")) {
    if (!values.question.trim()) {
      errors.question = "Please enter a Question";
    }
  }

  //Validate Question No
  if (values.hasOwnProperty("answer")) {
    if (!values.no.trim()) {
      errors.no = "Please enter the Answer";
    }
  }

  return errors;
}
