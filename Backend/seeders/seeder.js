const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Suggestion = require('../models/suggestionModel');
const Schedule = require('../models/scheduleModel');
const Goal = require('../models/goalModel');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Suggestion.deleteMany();
        await Schedule.deleteMany();
        await Goal.deleteMany();

        // Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@focusflow.com',
            role: 'admin',
            streak: 120,
            level: 'advanced',
            referralCode: 'ADMIN123'
        });

        // Generate 30 Suggestions
        const suggestions = [];
        for (let i = 1; i <= 30; i++) {
            suggestions.push({
                category: i % 2 === 0 ? 'Health' : 'Productivity',
                subcategory: i % 2 === 0 ? 'Physical Health' : 'Focus Tips',
                heading: `Suggestion Title ${i}`,
                subheading: `Subheading for suggestion ${i}`,
                content: `This is a detailed content for suggestion ${i}. It follows the PDF requirement for admin verified content.`,
                isAdminVerified: true
            });
        }
        await Suggestion.insertMany(suggestions);

        // Generate 30 Schedules for Admin
        const schedules = [];
        for (let i = 1; i <= 30; i++) {
            schedules.push({
                user: admin._id,
                name: `Routine ${i}`,
                time: `${(i % 12) + 1}:00 ${i < 12 ? 'AM' : 'PM'}`,
                repeat: ['Monday', 'Wednesday'],
                status: i % 5 === 0 ? 'Completed' : 'Pending',
                sound: true,
                tts: i % 3 === 0
            });
        }
        await Schedule.insertMany(schedules);

        // Generate 30 Goals for Admin
        const goals = [];
        for (let i = 1; i <= 30; i++) {
            goals.push({
                user: admin._id,
                name: `Achievement Goal ${i}`,
                fromDate: new Date(),
                dueDate: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
                priority: (i % 10) + 1,
                status: i % 4 === 0 ? 'Completed' : 'Pending',
                notificationTime: '1 day before'
            });
        }
        await Goal.insertMany(goals);

        console.log('30 Dummy Records Imported for all modules!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // destroy logic already exists
    process.exit();
} else {
    importData();
}
