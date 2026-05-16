import jwt from 'jsonwebtoken'


export const protect = async (req, res, next) => {
  
   const token = req.cookies.jwt;
   if (!token) {
       return res.status(401).json({ message: "JWT Token is missing" });
   }
   try {
       const verify = jwt.verify(token, process.env.JWT_SECRET || "bfgasdlafdl");
       req.user = verify;
       next();
   } catch (error) {
       console.error(error);
       return res.status(401).json({ message: "Invalid or expired token" });
   }
}
