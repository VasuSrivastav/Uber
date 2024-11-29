const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname,lastname,email,password,color, plate, capacity, vehicleType
}) => {
    
    try {
        if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
            throw new Error('All fields are required');
        }
        // Check if captain already exists
        const captainExists = await captainModel
            .findOne({ email })
            .select('_id');
        if (captainExists) {
            throw new Error('Captain already exists');
            // res.status(400).json({ message: 'Captain already exists' });
        }
        // User.create({ email, password, fullname: { firstname, lastname } });
        // also works as below
        const captain = new captainModel({ 
            fullname: {firstname,lastname},
            email,
            password,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        });
        await captain.save();
        return captain;
    } catch (error) {
        console.log(error.message);
        throw error.message;
    }
}