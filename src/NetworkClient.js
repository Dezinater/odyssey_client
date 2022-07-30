export default class NetworkClient {
    constructor() {
        this.packetPromises = {};
        this.currentPacketId = 0;
        this.eventHandlers = {};
        this.connect("localhost", 42069);

        this.onConnect = [];
        this.onDisconnect = [];
        this.autoReconnect = true;
        this.autoReconnectTime = 5000;
        this.createConnectionPromise();
        return this;
    }

    addOnConnect(eventAction) {
        this.onConnect.push(eventAction);
        if (this.connected) {
            eventAction();
        }
    }

    addOnDisconnect(eventAction) {
        this.onDisconnect.push(eventAction);
        if (!this.connected) {
            eventAction();
        }
    }

    createConnectionPromise() {
        this.connectionPromise = new Promise((promiseResolve, promiseReject) => {
            this.connectionPromiseResolve = promiseResolve;
            this.connectionPromiseReject = promiseReject;
        });
    }

    connect(ip, port) {
        if (process.env.VUE_APP_OFFLINE_MODE == "true")
            return;

        this.ws = new WebSocket(`ws://${ip}:${port}`);

        //let connectionPromise = new Promise((promiseResolve, promiseReject) => {
        this.ws.addEventListener("open", () => {
            console.log(`Connected to server`);
            this.connectionPromiseResolve();
            this.connected = true;
            this.onConnect.forEach(x => x());

            if (this.retryConnectionInterval != undefined) {
                clearInterval(this.retryConnectionInterval);
                this.retryConnectionInterval = undefined;
            }
        });

        this.ws.addEventListener("message", (payloadString) =>
            this.receive(payloadString)
        );


        this.ws.addEventListener("close", () => {
            console.log("Connection closed");
            this.connectionPromiseReject();
            this.connected = false;
            this.onDisconnect.forEach(x => x());

            this.createConnectionPromise();

            if (this.autoReconnect && this.retryConnectionInterval == undefined) {
                this.retryConnectionInterval = setInterval(() => {
                    this.connect("localhost", 42069);
                    console.log("Attempting to reconnect");
                }, this.autoReconnectTime);
            }
        });

        this.ws.addEventListener("error", (error) => {
            console.log(`WebSocket Error`);
            console.log(error);
            this.connectionPromiseReject();
        });
        //});


        //this.connectionPromise = connectionPromise;
        return this.connectionPromise;
    }

    login(username, password) {
        console.log(username);
        this.username = username;
        let loginPacket = {
            type: "login",
            username,
            password,
        };

        if (process.env.NODE_ENV == "development") {
            loginPacket.adminKey = process.env.VUE_APP_API_KEY;
            loginPacket.id = process.env.VUE_APP_USER_ID;
        }

        let sendResult = this.send(loginPacket);

        return sendResult;
    }

    send(payload) {
        payload.packetId = this.currentPacketId++;
        this.ws.send(JSON.stringify(payload));

        if (payload.packetId != undefined) {
            let promiseResolve, promiseReject;
            let packetPromise = new Promise((resolve, reject) => {
                promiseResolve = resolve;
                promiseReject = reject;
            });

            this.packetPromises[payload.packetId] = {
                startTime: Date.now(),
                promiseResolve,
                promiseReject,
            };

            return packetPromise;
        }
    }

    receive(websocketData) {
        let payloadString = websocketData.data;
        let packetData = JSON.parse(payloadString);
        let payload = packetData.payload;

        if (payload) {
            if (payload.type in this.eventHandlers) {
                this.runEvent(payload);
            }
        }
        if (packetData.packetId != undefined) {
            if (packetData.packetId in this.packetPromises) {
                this.packetPromises[packetData.packetId].promiseResolve(payload);
            }
        }
    }

    addEvent(eventName, func) {
        if (!(eventName in this.eventHandlers)) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(func);
    }

    removeEvent(eventName, func) {
        if (!(eventName in this.eventHandlers)) {
            return;
        }
        console.log(this.eventHandlers[eventName].indexOf(func));
        this.eventHandlers[eventName].splice(this.eventHandlers[eventName].indexOf(func), 1);
    }

    disconnect() {
        this.ws.close();
    }

    runEvent(payload) {
        let eventHandler = this.eventHandlers[payload.type];
        for (const eventFunc of eventHandler) {
            eventFunc(payload);
        }
    }
}