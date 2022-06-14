const asyncHandler = require('express-async-handler');

// @desc get goals
// @route GET /api/goals
// @access PRIVATE

const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: 'Get goals'
    });
});

// @desc add a goal
// @route POST /api/goals
// @access PRIVATE

const setGoal = asyncHandler(async (req, res) => {

    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add some text');

    }
    res.status(201).json({
        message: 'Add a goal'
    });


});

// @desc update a goal
// @route PUT /api/goals/:id
// @access PRIVATE

const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Update goal ${req.params.id}`
    });
});

// @desc delete a goal
// @route DELETE /api/goals/:id
// @access PRIVATE

const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `Delete goal ${req.params.id}`
    });
});


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
};