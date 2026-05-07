class LaunchVehicleUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getLaunchVehicles() {
        return `${this.baseUrl}/launchVehicles`;
    }

    getLaunchVehicleById(id) {
        return `${this.baseUrl}/launchVehicles/${id}`;
    }

    createLaunchVehicle() {
        return `${this.baseUrl}/launchVehicles`;
    }

    removeLaunchVehicleById() {
        return `${this.baseUrl}/launchVehicles/${id}`;
    }

    updateLaunchVehicleById() {
        return `${this.baseUrl}/launchVehicles/${id}`;
    }
}

export const launchVehicleUrls = new LaunchVehicleUrls();