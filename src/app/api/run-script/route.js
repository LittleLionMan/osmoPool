import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(req, res) {
    try {
        const body = await req.json()
        const process = spawn('python3', ['./cl-pos-graphs-interactive-with-height/graph-interactive.py', body.poolId]);
        let responseData = '';
        let errorData = ''; // Add a variable to store error messages

        // Promisify the process events
        const onData = (data) => {
            responseData += data; // Append data to buffer
            // Send data back to the client if needed
            // For example, you can emit a WebSocket event or send it as part of a response chunk
        };
        const onErr = (data) => {
            errorData += data; // Append error message to buffer
            console.error(`stderr: ${data}`);
            // You can send error messages back to the client as needed
        };

        // Wait for the process to exit
        await new Promise((resolve, reject) => {
            process.stdout.on('data', onData);
            process.stderr.on('data', onErr);
            process.on('close', (code) => {
                process.stdout.off('data', onData);
                process.stderr.off('data', onErr);
                console.log(`child process exited with code ${code}`);
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error('Script execution failed'));
                }
            });
        });

        // Check if there were any error messages captured from stderr
        if (errorData) {
            // If there were errors, handle them accordingly
            console.error('Error executing script:', errorData);
            const response = NextResponse.error('Internal server error', 500);
            return response;
        }

        // Once the process is done, send the response
        const message = 'Script executed successfully!';
        const response = NextResponse.json({ message, data: responseData });
        return response;
    } catch (error) {
        console.error('Error executing script:', error.message);
        const response = NextResponse.error('Internal server error', 500);
        return response;
    }
}
