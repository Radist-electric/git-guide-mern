const { Router } = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

//api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password')
    .isLength({ min: 8 }).withMessage('Минимальная длина пароля 8 символов')
    .matches(/\d/).withMessage('Пароль должен содержать хотя бы одну цифру')
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Некорректные данные при регистрации'
      })
    }

    try {
      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' })
    }
  })

//api/auth/login
router.post('/register', async (req, res) => {

})

module.exports = router