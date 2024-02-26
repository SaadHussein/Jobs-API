const register = async (req, res) => {
    res.send('Register Route');
};

const login = async (req, res) => {
    res.send('Login Route');
};

module.exports = {
    register,
    login
};