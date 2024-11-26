
const User = require('../models/User')
class NewsControllers {

    create(req, res, next) {

        const newUserData = req.body; 
        const newUser = new User(newUserData);

        newUser.save()
            .then(savedUser => {
                res.status(201).json(savedUser); 
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Error saving user' }); 
            });
    }

    delete(req, res, next) {
        const { id } = req.params; 
    
        User.findByIdAndDelete(id)
            .then(deletedUser => {
                if (!deletedUser) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'User deleted successfully' });
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Error deleting user' });
            });
    }
    
    // [PUT]  /user/update/:id
    update(req, res, next) {
        const { id } = req.params; 
        const updatedData = req.body; 

        User.findByIdAndUpdate(id, updatedData, { new: true }) 
            .then(updatedUser => {
                if (!updatedUser) {
                    return res.status(404).json({ message: 'User not found' }); 
                }
                res.json(updatedUser); 
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Error updating user' }); 
            });
    }

    //[GET]  
    index(req, res,next) {
        User.find({}).lean()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            next(err); 
        });
    }
}

module.exports = new NewsControllers(); 
