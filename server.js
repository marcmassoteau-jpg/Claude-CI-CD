const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));

// Health check endpoint for container orchestration
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API endpoint example
app.get('/api/info', (req, res) => {
    res.json({
        name: 'Claude CI/CD Demo',
        version: '1.0.0',
        description: 'Built with Claude Code Web',
        features: [
            'GitHub Actions CI/CD',
            'Docker containerization',
            'Automated testing',
            'Mobile development workflow'
        ]
    });
});

// Main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Export for testing
module.exports = { app, server };
