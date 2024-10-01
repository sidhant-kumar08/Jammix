import jwt from 'jsonwebtoken';


export const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(400).json({
                message : 'invalid token',
                success : false
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decodedToken.id;

        next();
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message : 'internal server error',
            success : false
        })
    }
}

export default isAuthenticated;