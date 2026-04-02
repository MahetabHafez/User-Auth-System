const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); 
const auth = require('./middleware/auth');   
const User = require('./models/User');       


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.static('public')); 

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected ✅"))
    .catch(err => console.log("DB Connection Error ❌:", err));
    const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/api/auth', authRoutes);


app.get('/api/auth/user', auth, async (req, res) => {
    try {
      
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error ❌');
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});