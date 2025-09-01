import app from './app.js';
import { connectDatabase } from './config/database.js';
import { config } from './config/env.js';

const startServer = async (): Promise<void> => {
    try {
        await connectDatabase();

        app.listen(config.PORT, () => {
            console.log(`Server running on port ${config.PORT}`);
            console.log(`Environment: ${config.NODE_ENV}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

startServer();