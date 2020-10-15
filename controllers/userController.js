const User = require('./../models/user');
const { asyncWrapper } = require('./../utils/helpers');

const controller = {
    view: asyncWrapper(async (req, res, next) => {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: 'success',
            data: { users }
        });
    }),


    create: asyncWrapper(async (req, res, next) => {
        const { name, email, age, password, passwordConfirm } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(Error('User already exist'));

        user = await User.create({ name, email, password, age, passwordConfirm });

        res.status(201).json({
            status: 'success',
            data: { user }
        })
    }),

    show: asyncWrapper(async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) return next(Error(`user with id: ${req.params.id} not found`));

        res.status(200).json({
            status: 'success',
            data: {user}
        })
    }),

    edit: asyncWrapper(async (req, res, next) => {

    }),

    login: asyncWrapper(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) return next(Error('specify the email and password field'));

        let user = await User.findOne({ email }).select('+password');

        if (!user) return next(Error('email or password is wrong'));

        if (user && ! await user.confirmPassword(password, user.password)) {
            return next(Error('email or password is wrong'));
        }

        //at this point the User is Authenticated, log them in
        // sign jwt 
        res.status(200).json({
            status: 'success',
            message: 'user logged in successfully'
        });
    }),

    delete: asyncWrapper(async (req, res, next) => {

    })
}

module.exports = controller;






