class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async get(url) {
        try {
            const response = await fetch(url);
            return this._handleResponse(response);
        } catch(error) {
            console.log(`Невозможно получить доступ к серверу: ${error}`);
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return this._handleResponse(response);
        } catch(error) {
            console.log(`Невозможно получить доступ к серверу: ${error}`);
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return this._handleResponse(response);
        } catch(error) {
            console.log(`Невозможно получить доступ к серверу: ${error}`);
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @returns {Promise<any>} - Промис с данными ответа
     */
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            return this._handleResponse(response);
        } catch(error) {
            console.log(`Невозможно получить доступ к серверу: ${error}`);
        }
    }

    /**
     * Обработчик ответа (приватный метод)
     * @param {Response} response - Объект ответа fetch
     * @returns {Promise<any>} - Промис с данными или ошибкой
     */
    async _handleResponse(response) {
        if (!response.ok) {
            const text = await response.text();
            console.log(`HTTP ${response.status}: ${text || response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return response.text();
    }
}

export const ajax = new Ajax();