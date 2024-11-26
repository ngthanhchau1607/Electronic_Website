        const Category = require('../models/Category');

        class CategoryControllers {

            // [POST] /category/create
            create(req, res, next) {
                const { category_id, name, description } = req.body;

                const newCategory = new Category({
                    category_id,
                    name,
                    description
                });

                newCategory.save()
                    .then(savedCategory => {
                        res.status(201).json(savedCategory); // Respond with the created category
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ message: 'Error creating category' });
                    });
            }

            // [DELETE] /category/:id
            delete(req, res, next) {
                const { id } = req.params;

                Category.findByIdAndDelete(id)
                    .then(deletedCategory => {
                        if (!deletedCategory) {
                            return res.status(404).json({ message: 'Category not found' });
                        }
                        res.status(200).json({ message: 'Category deleted successfully' });
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ message: 'Error deleting category' });
                    });
            }

            // [PUT] /category/update/:id
            update(req, res, next) {
                const { id } = req.params;
                const updatedData = req.body;

                Category.findByIdAndUpdate(id, updatedData, { new: true })
                    .then(updatedCategory => {
                        if (!updatedCategory) {
                            return res.status(404).json({ message: 'Category not found' });
                        }
                        res.json(updatedCategory);
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ message: 'Error updating category' });
                    });
            }

            // [GET] /category
            index(req, res, next) {
                Category.find({}).lean()
                    .then(categories => {
                        res.json(categories);
                    })
                    .catch(err => {
                        next(err);
                    });
            }
        }

        module.exports = new CategoryControllers();
