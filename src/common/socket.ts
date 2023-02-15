import { Socket, io } from 'socket.io-client';

export class SocketSingleton {
    private static instance: SocketSingleton;
    private socket: Socket;

    private constructor() {
        const token = localStorage.getItem('token');
        this.socket = io('http://localhost:3001', {
            auth: { token },
        });
        
        this.socket.on('connect', () => {
            console.log('Connected to server:', this.socket.id);
        });

        this.socket.on('log', (arg) => {
            console.log('Log from Server', arg);
        });
    }

    public static getInstance() {
        if (!SocketSingleton.instance) {
            SocketSingleton.instance = new SocketSingleton();
        }
        return SocketSingleton.instance;
    }

    public getSocket() {
        return this.socket;
    }
}
