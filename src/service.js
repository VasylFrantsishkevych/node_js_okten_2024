const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'db', 'users.json');

module.exports = {
   getUsers: async () => {
      const buffer = await fs.readFile(filePath);
      const data = buffer.toString();
   
      const users = data ? JSON.parse(data) : [];
      return users;
   },
   
   saveNewUser:  async (newUser) => {
      await fs.writeFile(filePath , JSON.stringify(newUser));
   }
}