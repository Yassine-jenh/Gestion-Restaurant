const { Reclamation } = require('../models');

class ReclamationController {
    async createReclamation(req, res) {
        const { firstName, lastName, emailAddress, reclamation, userId } = req.body;

        try {
            const newReclamation = await Reclamation.create({
                firstName,
                lastName,
                emailAddress,
                reclamation,
                UserId: userId,
            });
            res.status(201).json(newReclamation);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async getAllReclamations(req, res) {
        try {
            const reclamations = await Reclamation.findAll();
            res.status(200).json(reclamations);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async getReclamationById(req, res) {
        const { id } = req.params;

        try {
            const reclamation = await Reclamation.findByPk(id);
            if (!reclamation) {
                return res.status(404).json({ error: 'Reclamation not found.' });
            }
            res.status(200).json(reclamation);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async updateReclamation(req, res) {
        const { id } = req.params;
        const { firstName, lastName, emailAddress, reclamation, userId } = req.body;

        try {
            const reclamationToUpdate = await Reclamation.findByPk(id);
            if (!reclamationToUpdate) {
                return res.status(404).json({ error: 'Reclamation not found.' });
            }

            await reclamationToUpdate.update({ firstName, lastName, emailAddress, reclamation, UserId: userId });
            res.status(200).json(reclamationToUpdate);
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    async deleteReclamation(req, res) {
        const { id } = req.params;

        try {
            const reclamationToDelete = await Reclamation.findByPk(id);
            if (!reclamationToDelete) {
                return res.status(404).json({ error: 'Reclamation not found.' });
            }

            await reclamationToDelete.destroy();
            res.status(200).json({ message: 'Reclamation deleted successfully.' });
        } catch (error) {
            this.handleErrors(error, res);
        }
    }

    handleErrors(error, res) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred.' });
    }
}

module.exports = new ReclamationController();