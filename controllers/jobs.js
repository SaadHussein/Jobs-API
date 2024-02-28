const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId }).sort(createdBy);
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findOne({ _id: jobId, createdBy: userId });

    if (!job) {
        throw new NotFoundError(`No Job With ID: ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job, create(req.body);
    req.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId } } = req;

    if (company === '' || position === '') {
        throw new BadRequestError('Company and Position Fields Can Not be Empty.');
    }

    const job = await Job.findById({ _id: jobId, createdBy: userId }, req.body, { new: true, runValidators: true });

    if (!job) {
        throw new NotFoundError(`No Job With ID: ${jobId}`);
    }

    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findByIdAndDelete({ _id: jobId, createdBy: userId });

    if (!job) {
        throw new NotFoundError(`No Job With ID: ${jobId}`);
    }

    res.status(StatusCodes.OK).send();
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
};