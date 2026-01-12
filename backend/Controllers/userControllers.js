export const test = (req,res)=>{
    res.json({
        message: "User route working"
    })
}

export const getProfile = (req,res)=>{
    res.status(200).json({
        success: true,
        user: req.user
    })
}
