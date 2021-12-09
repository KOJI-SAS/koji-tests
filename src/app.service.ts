import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import * as pdf from "pdf-creator-node"
import * as fs from "fs"


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
          2: 'Second page', // Any page number is working. 1-based index
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
      }
  }
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  postMarkdown(file): string {
    // Ensure file type is MD
    if(file.mimetype !== 'text/markdown'){
      throw new HttpException(`Type of file ${file.mimetype} is not allowed.`, HttpStatus.FORBIDDEN);
    }
    // Ensure file size not exceeded 1mb
    const fileSizeInMegabytes = file.size / (1024*1024);
    if(fileSizeInMegabytes > 10 ){
      throw new HttpException('The file size cannot exceed 10MB', HttpStatus.FORBIDDEN);
    }

    // Convert buffer to readable string 
    const stringMarkdown = file.buffer.toString("utf-8");
    // Create a json key/value from markdown string 
    const keyvalue = stringMarkdown.split("\n")
    const data = keyvalue.map(el => {
      let x = el.split(":")
        return {key: x[0], value: x[1]}
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
}
