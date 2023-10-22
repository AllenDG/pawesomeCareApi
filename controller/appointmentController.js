const asyncHandler = require('express-async-handler')
const service = require('../services/appointmentService')


//Get All Appointments
//@access Public
const getAppointments = asyncHandler (async (req, res) => {
    const appointments = await service.getAllAppointments()
    res.status(200).json(appointments)
})

//Get an Appointment
//@access Public
const getAnAppointment = asyncHandler (async (req, res) => {
    const appointments = await service.getAnAppointmentId(req.params.id)
    if (appointments == undefined)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send(appointments)
})

//Get Appointments by TicketNo
//@access Public
const getAppointmentsTicket = asyncHandler (async (req, res) => {
    const appointments = await service.getAppointmentsTicket(req.params.id)
    if (appointments == undefined)
        res.status(404).json('no record with given ticketno : ' + req.params.id)
    else
        res.send(appointments)
})

//Delete Appointments
//@access Public
const deleteAppointments = asyncHandler(async (req, res) => {
    const affectedRows = await service.deleteAppointmentsById(req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('deleted successfully.')
})

//Add Appointments
//@access Public
const addAppointments = asyncHandler(async (req, res) => {
    await service.addOrEditAppointments(req.body)
    res.status(201).send('created successfully.')
})

//Edit Appointments
//@access Public
const editAppointments = asyncHandler(async (req, res) => {
    const affectedRows = await service.addOrEditAppointments(req.body, req.params.id)
    if (affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else
        res.send('updated successfully.')
})

//Update Specific Boolean Fields
//@access Public
const updateBooleanFields = asyncHandler(async (req, res) => {
    const { id } = req.params
    const updatedFields = req.body
    const affectedRows = await service.updateBooleanFields(id, updatedFields)
    
    if (affectedRows === 0) {
        res.status(404).json(`No record with given id: ${id}`);
    } else {
        res.send('Boolean fields updated successfully.');
    }
})

// Update Pending Status
//@access Public
const updatePendingStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const isPending = req.body.isPending
    const affectedRows = await service.updatePendingStatus(id, isPending)

    if (affectedRows === 0) {
        res.status(404).json(`No record with given id: ${id}`)
    } else {
        res.send('Pending status updated successfully.')
    }
})


module.exports = {
    getAppointments,
    getAnAppointment,
    getAppointmentsTicket,
    deleteAppointments,
    addAppointments,
    editAppointments,
    updateBooleanFields,
    updatePendingStatus
}