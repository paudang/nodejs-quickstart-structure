exports.getUsers = (req, res) => {
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' }
    ]);
};

exports.createUser = (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({
        message: 'User created successfully',
        user: { name, email }
    });
};
