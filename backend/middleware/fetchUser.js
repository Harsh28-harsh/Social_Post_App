// jsonwebtoken package import kar rahe hain.
// Yeh JWT token create aur verify karne ke kaam aata hai.
const jwt = require("jsonwebtoken");



// Secret key define kar rahe hain.
// Yeh key token ko sign aur verify karne ke liye use hoti hai.
//
// IMPORTANT:
// Real projects me secret key .env file me store karte hain.
// Hardcode nahi karna chahiye.
const JWT_SECRET = process.env.JWT_SECRET



// When the user logs in, the backend checks the email and password.
// If they are correct, the backend creates a JWT token that contains the user's ID and sends it to the frontend.

// The frontend stores this token.
// Whenever the user wants to access protected routes like notes,
// the frontend sends the token in the request headers.

// Then the fetchuser middleware gets the token from the headers
// and verifies it using the secret key.
// If the token is valid, it gets the user's ID from the token
// and allows the user to access their notes.



// fetchuser ek middleware function hai.
//
// Middleware kya hota hai?
// Middleware request aur response ke beech me run hota hai.
//
// Yeh protected routes ko secure karne ke liye use ho raha hai.
//
// Example:
// addnote
// deletenote
// fetchallnotes
//
// In sab routes me pehle fetchuser chalega.
const fetchuser = async (req, res, next) => {


  // get the user from jwt token and add id to req object


  // request headers se token nikal rahe hain.
  //
  // frontend request bhejte waqt:
  //
  // headers:{
  //   "auth-token": token
  // }
  //
  // isi token ko yahan access kar rahe hain.
  const token = req.header("auth-token");


  // agar token exist nahi karta.
  if (!token) {


    // 401 Unauthorized response bhejo.
    //
    // matlab:
    // user authenticated nahi hai.
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }


  try {


    // jwt.verify() token verify karta hai.
    //
    // Yeh check karta hai:
    // 1. token original hai ya nahi
    // 2. secret key same hai ya nahi
    //
    // Agar token valid hua toh uska data return karega.
    const data = jwt.verify(token, JWT_SECRET);


    // token ke andar jo user object tha
    // usko req.user me store kar rahe hain.
    //
    // Example:
    // data = {
    //   user:{
    //      id:"123abc"
    //   }
    // }
    //
    // req.user = {id:"123abc"}
    req.user = data.user;


    // next() next middleware ya route function ko call karta hai.
    //
    // Agar next() nahi likhenge toh request wahi ruk jayegi.
    next();

  } catch (error) {


    // agar token invalid hua ya verify fail hua.
    //
    // Example:
    // expired token
    // fake token
    // modified token
    //
    // toh unauthorized response bhejo.
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};



// middleware export kar rahe hain.
// Taki dusri route files me import karke use kar saken.
module.exports = fetctuser;