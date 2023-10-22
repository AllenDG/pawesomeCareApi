const db = require('../database/db')

module.exports.getAllAppointments = async () => {
    const [records] = await db.query('SELECT * FROM book_appts')
    return records;
}

module.exports.getAnAppointmentId = async (id) => {
    const [{ affectedRows }] = await db.query("SELECT * FROM book_appts WHERE AppointmentID = ?", [id])
    return affectedRows;
}

module.exports.deleteAppointmentsById = async (id) => {
    const [{ affectedRows }] = await db.query("DELETE FROM book_appts WHERE AppointmentID = ?", [id])
    return affectedRows;
}

module.exports.addOrEditAppointments = async (obj, AppointmentID = 0) => {
    const [[[{ affectedRows }]]] = await db.query("CALL usp_book_appts_add_or_edit(?,?,?,?,?,?,?,?,?,?,?,?,?)", [
        AppointmentID,
        obj.isVeterinaryCare,
        obj.isPetGrooming,
        obj.isPetBoarding,
        obj.isPetSpa,
        obj.isPending,
        obj.AppointmentTime,
        obj.AppointmentDate,
        obj.FirstName, 
        obj.LastName,
        obj.Email,
        obj.PhoneNo,
        obj.Message,
    ]);
    return affectedRows;
}


module.exports.updateBooleanFields = async (AppointmentID, updatedFields) => {
    const {
        isVeterinaryCare,
        isPetGrooming,
        isPetBoarding,
        isPetSpa,
        isPending
    } = updatedFields

    const [[[{ affectedRows }]]] = await db.query(
        `CALL usp_book_appts_update_booleans(?,?,?,?,?,?)`,
        [AppointmentID, isVeterinaryCare, isPetGrooming, isPetBoarding, isPetSpa, isPending]
    )

    return affectedRows
}

module.exports.updatePendingStatus = async (AppointmentID, isPending) => {
    const [[[ { affectedRows } ]]] = await db.query(
        'CALL usp_book_appts_update_pending_status(?, ?)', 
        [AppointmentID, isPending]
    )
    return affectedRows;
}