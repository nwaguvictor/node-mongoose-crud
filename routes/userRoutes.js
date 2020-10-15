const router = require('express').Router();
const controller = require('./../controllers/userController');

router.post('/login', controller.login);

router.route('/')
    .get(controller.view)
    .post(controller.create)
router.route('/:id')
    .get(controller.show)
    .patch(controller.edit)
    .delete(controller.delete)

module.exports = router;