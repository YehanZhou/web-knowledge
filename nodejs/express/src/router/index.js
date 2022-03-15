const express = require('express')
const router = express.Router()

const { list } = require('../controller')

router.get('/', list)
// 新增
router.post('/', list)
// 覆盖更新
router.put('/', list)
// 打补丁式更新，只发送修改的数据
router.patch('/', list)
// 删除
router.delete('/', list)
// 允许所有method
router.all('/', list)

module.exports = router