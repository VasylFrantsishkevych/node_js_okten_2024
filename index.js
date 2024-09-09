const fs = require('node:fs/promises');
const path = require('node:path');



const app = async () => {

   const folders = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

   await fs.mkdir(path.join(__dirname, 'baseFolder'));

   const pathBase = path.join(__dirname, 'baseFolder');

   folders.forEach( async (folder) => {
      await fs.mkdir(path.join(pathBase, `${folder}`), {recursive: true});
      await fs.writeFile(path.join(pathBase, `${folder}`, 'text.txt'), 'Hello');

      const stat = await fs.stat(path.join(pathBase, `${folder}`, 'text.txt'))
      console.log(path.resolve( 'baseFolder', `${folder}`, 'text.txt'))
      console.log('file:', stat.isFile(), 'folder:',stat.isDirectory())
   })
   
}

void app()

// const foo = async () => {
//    try {
//        const pathToDir = path.join(__dirname, 'baseFolder');
//        await fs.mkdir(pathToDir, {recursive: true});

//        const folderNames = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];
//        const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];

//        await Promise.all(folderNames.map(async (folder) => {
//            const folderPath = path.join(pathToDir, folder);
//            await fs.mkdir(folderPath, {recursive: true});

//            await Promise.all(fileNames.map(async (file) => {
//                const filePath = path.join(folderPath, file);
//                await fs.writeFile(filePath, 'Hello World!');
//            }));
//        }));

//        const data = await fs.readdir(pathToDir);
//        for (const folder of data) {
//            const folderPath = path.join(pathToDir, folder);
//            const stat = await fs.stat(folderPath);
//            console.log(`Folder: ${folder}, isDirectory: ${stat.isDirectory()}`);

//            const files = await fs.readdir(folderPath);
//            for (const file of files) {
//                const pathToFile = path.join(folderPath, file);
//                const fileStat = await fs.stat(pathToFile);
//                console.log(`File: ${file}, isFile: ${fileStat.isFile()}`);
//            }
//        }
//    } catch (e) {
//        console.error(e.message);
//    }
// }