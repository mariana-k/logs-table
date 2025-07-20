import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Get all logs
 *     responses:
 *       200:
 *         description: List of logs
 */
router.get('/', async (req, res) => {
  const logs = await prisma.log.findMany({ orderBy: { createdAt: 'desc' } })
  res.json(logs)
})

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *               logText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Log created
 */
router.post('/', async (req, res) => {
  const { owner, logText } = req.body
  if (!owner || !logText) return res.status(400).json({ error: 'owner and logText required' })
  const log = await prisma.log.create({ data: { owner, logText } })
  res.status(201).json(log)
})
/**
 * @swagger
 * /logs/{id}:
 *   put:
 *     summary: Update a log
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               owner:
 *                 type: string
 *               logText:
 *                 type: string
 *     responses:
 *       200:
 *         description: Log updated
 */
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const { owner, logText } = req.body
  if (!owner || !logText) return res.status(400).json({ error: 'owner and logText required' })
  const log = await prisma.log.update({ where: { id }, data: { owner, logText } })
  res.json(log)
})

/**
 * @swagger
 * /logs/{id}:
 *   delete:
 *     summary: Delete a log
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Log deleted
 */
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await prisma.log.delete({ where: { id } })
  res.status(204).end()
})

export default router
