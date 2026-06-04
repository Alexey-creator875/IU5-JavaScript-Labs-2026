class LaunchVehicleUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getLaunchVehicles(price = null) {
        if (price) {
            return `${this.baseUrl}/launchVehicles?price=${price}`;
        }

        return `${this.baseUrl}/launchVehicles`;
    }

    getLaunchVehicleById(id) {
        return `${this.baseUrl}/launchVehicles/${id}`;
    }

    createLaunchVehicle() {
        return `${this.baseUrl}/launchVehicles`;
    }

    removeLaunchVehicleById(id) {
        return `${this.baseUrl}/launchVehicles/${id}`;
    }

    updateLaunchVehicleById(id) {
        return `${this.baseUrl}/launchVehicles/${id}`;
    }
}

export const launchVehicleUrls = new LaunchVehicleUrls();