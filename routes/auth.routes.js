const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

//api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть не менее 8 символов и иметь хотя бы одну цифру')
      .not().isIn(['123', 'password', 'god']).withMessage('Не используйте общие слова в качестве пароля')
      .isLength({ min: 8 }).withMessage('Минимальная длина пароля 8 символов')
      .matches(/\d/).withMessage('Пароль должен содержать хотя бы одну цифру')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const { email, password, nickName, firstName, lastName } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword, nickName, firstName, lastName })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' })
    }
  })

//api/auth/login
router.post(
  '/login',
  [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Некорректные данные при входе в систему' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Некорректные данные при входе в систему' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtsecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id, message: 'Вы успешно вошли в систему' })

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так. Попробуйте снова.' })
    }

  })

module.exports = router