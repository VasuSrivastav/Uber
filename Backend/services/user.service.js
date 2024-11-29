const User = require('../models/user.model');


module.exports.createUser = async ({
    firstname,lastname,email,password
}) => {
    
    try {
        if (!firstname || !email || !password) {
            throw new Error('All fields are required');
        }
        // Check if user already exists
        const userExists = await User
            .findOne({ email })
            .select('_id');
        if (userExists) {
            throw new Error('User already exists');
            // res.status(400).json({ message: 'User already exists' });
        }
        // User.create({ email, password, fullname: { firstname, lastname } });
        // also works as below
        const user = new User({ 
            fullname: {firstname,lastname},
            email,
            password
        });
        await user.save();
        return user;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}