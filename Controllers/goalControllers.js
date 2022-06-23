const asyncHandler = require('express-async-handler');

const Goal = require('../Models/goalModel');
const User = require('../Models/userModel');

// @desc get goals
// @route GET /api/goals
// @access PRIVATE

const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find({
        user: req.user.id
    });
    res.status(200).json(goals);
});

// @desc add a goal
// @route POST /api/goals
// @access PRIVATE

const setGoal = asyncHandler(async (req, res) => {

    if (!req.body.title) {
        res.status(400);
        throw new Error('Please add a title');
    }

    const goal = await Goal.create({
        title: req.body.title,
        user: req.user.id,
        subgoals: []
    });

    res.status(201).json(goal);


});

// @desc update a goal
// @route PUT /api/goals/:id
// @access PRIVATE

const updateGoal = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const goal = await Goal.findById(id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
        new: true
    });

    res.status(200).json(updatedGoal);
});

// @desc delete a goal
// @route DELETE /api/goals/:id
// @access PRIVATE

const deleteGoal = asyncHandler(async (req, res) => {

    const id = req.params.id;

    const goal = await Goal.findById(id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.remove()


    res.status(200).json({
        id
    });
});


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};