const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app/app");
chai.use(chaiHttp);
class RequestSender {

    async authRequest (token, method, url, data) {
        let res = {};
        switch (method) {
            case "get":
                res = await chai.request(server)
                    .get(url)
                    .set("Authorization", `Bearer ${token}`);
                break;
            case "post":
                res = await chai.request(server)
                    .post(url)
                    .set("Authorization", `Bearer ${token}`)
                    .send(data)
                break;
            case "put":
                res = await chai.request(server)
                    .put(url)
                    .set("Authorization", `Bearer ${token}`)
                    .send(data)
                break;
            case "patch":
                res = await chai.request(server)
                    .patch(url)
                    .set("Authorization", `Bearer ${token}`)
                    .send(data)
                break;
            case "delete":
                res = await chai.request(server)
                    .delete(url)
                    .set("Authorization", `Bearer ${token}`);
                break;
        }

        return res;
    }

    async request (method, url, data) {
        let res = {};
        switch (method) {
            case "get":
                res = await chai.request(server)
                    .get(url);
                break;
            case "post":
                res = await chai.request(server)
                    .post(url)
                    .send(data)
                break;
            case "put":
                res = await chai.request(server)
                    .put(url)
                    .send(data)
                break;
            case "patch":
                res = await chai.request(server)
                    .patch(url)
                    .send(data)
                break;
            case "delete":
                res = await chai.request(server)
                    .delete(url);
                break;
        }

        return res;
    }
}

module.exports = new RequestSender();
