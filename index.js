const fs = require('node:fs/promises');
const path = require('node:path');



const app = async () => {

   await fs.mkdir(path.join(__dirname, 'baseFolder', 'folder1'), {recursive: true})
   await fs.mkdir(path.join(__dirname, 'baseFolder', 'folder2'), {recursive: true})
   await fs.mkdir(path.join(__dirname, 'baseFolder', 'folder3'), {recursive: true})
   await fs.mkdir(path.join(__dirname, 'baseFolder', 'folder4'), {recursive: true})
   await fs.mkdir(path.join(__dirname, 'baseFolder', 'folder5'), {recursive: true})

   await fs.writeFile(path.join(__dirname, 'baseFolder', 'folder1', 'text1.txt'), 'Hellow 1');
   const stat1 = await fs.stat(path.join(__dirname, 'baseFolder', 'folder1', 'text1.txt'))
   console.log(path.resolve( 'baseFolder', 'folder1', 'text1.txt'))
   console.log('file:', stat1.isFile(), 'folder:',stat1.isDirectory())

   await fs.writeFile(path.join(__dirname, 'baseFolder', 'folder2', 'text2.txt'), 'Hellow 2');
   const stat2 = await fs.stat(path.join(__dirname, 'baseFolder', 'folder2', 'text2.txt'))
   console.log(path.resolve( 'baseFolder', 'folder2', 'text2.txt'))
   console.log('file:', stat2.isFile(), 'folder:',stat2.isDirectory())

   await fs.writeFile(path.join(__dirname, 'baseFolder', 'folder3', 'text3.txt'), 'Hellow 3');
   const stat3 = await fs.stat(path.join(__dirname, 'baseFolder', 'folder3', 'text3.txt'))
   console.log(path.resolve( 'baseFolder', 'folder3', 'text3.txt'))
   console.log('file:', stat3.isFile(), 'folder:',stat3.isDirectory())

   await fs.writeFile(path.join(__dirname, 'baseFolder', 'folder4', 'text4.txt'), 'Hellow 4');
   const stat4 = await fs.stat(path.join(__dirname, 'baseFolder', 'folder4', 'text4.txt'))
   console.log(path.resolve( 'baseFolder', 'folder4', 'text4.txt'))
   console.log('file:', stat4.isFile(), 'folder:',stat4.isDirectory())

   await fs.writeFile(path.join(__dirname, 'baseFolder', 'folder5', 'text5.txt'), 'Hellow 5');
   const stat5 = await fs.stat(path.join(__dirname, 'baseFolder', 'folder5', 'text5.txt'))
   console.log(path.resolve( 'baseFolder', 'folder5', 'text5.txt'))
   console.log('file:', stat5.isFile(), 'folder:',stat5.isDirectory())

   
   
}

void app()