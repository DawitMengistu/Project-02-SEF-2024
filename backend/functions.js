import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getBooksInFolders(dirPath) {
    let result = {};

    fs.readdirSync(dirPath).forEach(item => {
        const itemPath = path.join(dirPath, item);

        if (fs.lstatSync(itemPath).isDirectory()) {
            // Recursively get books or folders in subdirectory
            result[item] = getBooksInFolders(itemPath);
        } else if (item.endsWith('.pdf')) {
            // If it's a PDF file, return it as part of the folder
            if (!result.books) result.books = [];
            result.books.push(item);
        }
    });

    return result;
}
