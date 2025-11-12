const { Reservation } = require('../models');

class ReservationController {
    async createReservation(req, res) {
        const { fname, lname, email, phone, date, time, guests, message } = req.body;

        try {
            const newReservation = await Reservation.create({
                fname,
                lname,
                email,
                phone,
                date,
                time,
                guests,
                message,
            });
            res.status(201).json(newReservation);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async getAllReservations(req, res) {
        try {
            const reservations = await Reservation.findAll();
            res.status(200).json(reservations);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async getReservationById(req, res) {
        const { id } = req.params;

        try {
            const reservation = await Reservation.findByPk(id);
            if (!reservation) {
                return res.status(404).json({ error: 'Reservation not found.' });
            }
            res.status(200).json(reservation);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async updateReservation(req, res) {
        const { id } = req.params;
        const { fname, lname, email, phone, date, time, guests, message } = req.body;

        try {
            const reservationToUpdate = await Reservation.findByPk(id);

            if (!reservationToUpdate) {
                return res.status(404).json({ error: 'Reservation not found.' });
            }

            await reservationToUpdate.update({ fname, lname, email, phone, date, time, guests, message });
            res.status(200).json(reservationToUpdate);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async deleteReservation(req, res) {
        const { id } = req.params;

        try {
            const reservationToDelete = await Reservation.findByPk(id);

            if (!reservationToDelete) {
                return res.status(404).json({ error: 'Reservation not found.' });
            }

            await reservationToDelete.destroy();
            res.status(200).json({ message: 'Reservation deleted successfully.' });
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    handleErrors(error, res) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
}

module.exports = new ReservationController();