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