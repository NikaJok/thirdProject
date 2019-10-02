const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get(async (req, res) => {
  try {
    const foundExercise = await Exercise.find();
    res.send(foundExercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  try {
    const newExercise = new Exercise({
      username,
      description,
      duration,
      date
    });
    const savedExercise = await newExercise.save();
    res.send(savedExercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const findExercise = await Exercise.findById(req.params.id);
    res.send(findExercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const deleteExercise = await Exercise.findByIdAndDelete(req.params.id);
    res.send(deleteExercise);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/update/:id').post(async (req, res) => {
  try {
    const foundExercise = await Exercise.findById(req.params.id);
    const ex = await exercise.update(req.body);
    res.send(ex);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
