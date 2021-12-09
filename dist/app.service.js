"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const pdfOptions = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Nicolas</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last: 'Last Page'
        }
    }
};
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
    postMarkdown(file) {
        if (file.mimetype !== 'text/markdown') {
            throw new common_1.HttpException(`Type of file ${file.mimetype} is not allowed.`, common_1.HttpStatus.FORBIDDEN);
        }
        const fileSizeInMegabytes = file.size / (1024 * 1024);
        if (fileSizeInMegabytes > 10) {
            throw new common_1.HttpException('The file size cannot exceed 10MB', common_1.HttpStatus.FORBIDDEN);
        }
        const stringMarkdown = file.buffer.toString("utf-8");
        const keyvalue = stringMarkdown.split("\n");
        const data = keyvalue.map(el => {
            let x = el.split(":");
            return { key: x[0], value: x[1] };
        });
        let html = fs.readFileSync("./template/template.html", "utf8");
        let document = {
            html: html,
            data: {
                data: data,
            },
            path: "./output.pdf",
            type: "",
        };
        pdf
            .create(document, pdfOptions)
            .then((res) => {
            console.log(res);
        })
            .catch((error) => {
            console.error(error);
        });
        return html;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map