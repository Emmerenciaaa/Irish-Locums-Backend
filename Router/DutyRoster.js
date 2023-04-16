import express from "express";
import DutyRepo from "../controller/DutyRoster.js";
// import AuthRoles from "../middleware/authroles.js";

const router = express.Router();
/**
 * @swagger
 * /duties/:
 *   get:
 *     summary: Retrieve all duties
 *     tags: [DutyRoster]
 *     responses:
 *       200:
 *         description: A list of Duties Rosters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Duty'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server error
 */
router.get("/", DutyRepo.allDuties);

/**
 * @swagger
 * /duties/:
 *   post:
 *     summary: Add a new Duty Roster
 *     tags: [Duties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 60a1e7d8c7894a1d3c1b2c3d
 *               shiftId:
 *                 type: string
 *                 example: 6022e7d8c7894a1d3c1b2c3d
 *               jobId:
 *                 type: string
 *                 example: 6022e7d8c7894a1d3c1b2c3d
 *               clockin:
 *                 type: Date
 *               clockout:
 *                 type: Date
 *               break_time:
 *                 type: Date
 *               break_resume:
 *                 type: Date
 *     responses:
 *       200:
 *         description: The newly created branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Duty'
 *       400:
 *         description: Duty with this name and user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Branch with this name and user already exists
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server Error
 */
router.post("/", DutyRepo.createRoster);

/**
 * @swagger
 * /duities/users/{id}:
 *   get:
 *     summary: Retrieve particular user duty rosters
 *     tags: [DutyRoster]
 *     responses:
 *       200:
 *         description: A list of Duties Rosters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Duty'
 *       400:
 *         description: Problem with the getting user duty informations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Problem with the getting user duty informations
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server Error
 */
router.get("/users/:id", DutyRepo.specificUserDuty);
router.get("/user", DutyRepo.userDuties);

/**
 * @swagger
 * /duties/{id}/{jobId}/{shiftId}:
 *   patch:
 *     summary: Update a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The duty ID to update
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Job ID to update
 *       - in: path
 *         name: shiftId
 *         schema:
 *           type: string
 *         required: true
 *         description: The shift ID for a duty
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clockin:
 *                 type: date
 *               clockout:
 *                 type: date
 *               break_time:
 *                 type: date
 *               break_resume:
 *                 type: date
 *     responses:
 *       200:
 *         description: updated the current duty informations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Duty'
 *       400:
 *         description: Problem with the update query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Problem with the update query
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 msg:
 *                   type: string
 *                   example: Server Error
 */
router.patch("/:id/:jobId/:shiftId", DutyRepo.updateDuty);

export default router;
